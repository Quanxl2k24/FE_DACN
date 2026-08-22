"use client";

import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import axiosClient from "@/core/api/axiosClient";
import { myApplicationsQueryKey } from "@/features/myApplications/hooks/queryKeys";

// ── Bước 1: Upload CV ─────────────────────────────────────────────────────
// POST /upload/cv
// Field: cv (file PDF/DOC/DOCX ≤ 5MB)
// Response: { resumeId: string; fileUrl: string }

interface IUploadCvResult {
  resumeId: string;
  fileUrl: string;
}

async function uploadCv(file: File): Promise<IUploadCvResult> {
  const formData = new FormData();
  formData.append("cv", file); // field name phải là "cv"

  const res = await axiosClient.post<IUploadCvResult>("/upload/cv", formData, {
    headers: { "Content-Type": "multipart/form-data" },
  });
  return res.data;
}

// ── Bước 2: Nộp đơn ứng tuyển ────────────────────────────────────────────
// POST /jobs/:jobId/apply
// Body (JSON): { resumeId: string }

interface IApplyJobPayload {
  jobId: string;
  resumeId: string;
}

interface IApplyJobResult {
  applicationId: string;
  jobId: string;
  status: string;
}

async function applyJob(payload: IApplyJobPayload): Promise<IApplyJobResult> {
  const res = await axiosClient.post<IApplyJobResult>(
    `/jobs/${payload.jobId}/apply`,
    { resumeId: payload.resumeId },
  );
  return res.data;
}

// ── Hook tổng hợp: upload CV rồi apply ────────────────────────────────────
export interface IApplyJobWithFilePayload {
  jobId: string;
  cvFile: File;
}

export function useApplyJob() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({ jobId, cvFile }: IApplyJobWithFilePayload) => {
      // Bước 1: upload file lấy resumeId
      const { resumeId } = await uploadCv(cvFile);
      // Bước 2: nộp đơn với resumeId vừa nhận
      return applyJob({ jobId, resumeId });
    },
    onSuccess: (_, variables) => {
      toast.success("Ứng tuyển thành công! Chúc bạn may mắn 🎉");
      // Invalidate danh sách việc đã ứng tuyển để UI cập nhật tức thì
      queryClient.invalidateQueries({ queryKey: myApplicationsQueryKey() });
      // Invalidate trạng thái ứng tuyển trên trang chi tiết job
      queryClient.invalidateQueries({ queryKey: ["application-status", variables.jobId] });
    },
    onError: (error: unknown) => {
      const axiosError = error as {
        response?: { data?: { message?: string }; status?: number };
      };
      const status = axiosError?.response?.status;
      const message = axiosError?.response?.data?.message;

      if (status === 400) {
        // Bao gồm: tin không ở trạng thái mở tuyển, đã hết hạn, đã nộp rồi
        toast.error(message ?? "Không thể ứng tuyển vào tin này.");
      } else if (status === 403) {
        toast.error("Bạn không thể ứng tuyển vào công ty của mình.");
      } else if (status === 404) {
        toast.error(message ?? "Tin tuyển dụng hoặc CV không tồn tại.");
      } else if (status === 500) {
        toast.error("Upload CV thất bại. Vui lòng thử lại sau.");
      } else {
        toast.error(message ?? "Ứng tuyển thất bại. Vui lòng thử lại sau.");
      }
    },
  });
}
