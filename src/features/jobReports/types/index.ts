export interface ICreateJobReportPayload {
  jobId: string;
  reason: string;
}

/** Response trả về sau khi tạo báo cáo — luôn ở trạng thái PENDING. */
export interface ICreateJobReportResult {
  id: string;
  jobId: string;
  userId: string;
  reason: string;
  status: "PENDING";
  createdAt: string;
}
