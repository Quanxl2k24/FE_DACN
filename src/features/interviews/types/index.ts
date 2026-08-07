/**
 * `status` ở GET .../interviews đã được BE ánh xạ sẵn từ trạng thái đơn ứng
 * tuyển (toInterviewResult): OFFERED/HIRED → "Đạt", REJECTED → "Trượt",
 * còn lại → "Chưa có kết quả".
 */
export type InterviewResultStatus = "Đạt" | "Trượt" | "Chưa có kết quả";

/** Item trong danh sách GET /candidates/manage/:companyId/interviews. */
export interface IInterviewListItem {
  interviewId: string;
  userId: string;
  candidateName: string;
  jobId: string;
  jobTitle: string;
  /** ISO datetime. */
  scheduledAt: string;
  interviewer: string;
  status: InterviewResultStatus;
  cvUrl: string;
}

export interface ICursorPagination {
  nextCursor: string | null;
  hasMore: boolean;
}

export interface IPaginatedResponse<T> {
  data: T[];
  pagination: ICursorPagination;
}

export interface IInterviewFilters {
  take?: number;
}
