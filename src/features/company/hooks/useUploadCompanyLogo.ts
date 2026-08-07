"use client";

import { useMutation } from "@tanstack/react-query";
import { toast } from "sonner";
import axiosClient from "@/core/api/axiosClient";

interface IUploadImagesResult {
  resumeId: string;
  imageUrls: string[];
}

async function uploadLogo(file: File) {
  const formData = new FormData();
  formData.append("images", file);
  const res = await axiosClient.post<IUploadImagesResult>(
    "/upload/images",
    formData,
    { headers: { "Content-Type": "multipart/form-data" } },
  );
  return res.data.imageUrls[0];
}

export function useUploadCompanyLogo() {
  return useMutation({
    mutationFn: uploadLogo,
    onError: () => {
      toast.error("Tải logo lên thất bại, vui lòng thử lại.");
    },
  });
}
