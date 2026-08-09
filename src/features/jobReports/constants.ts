export const JOB_REPORT_REASON_OPTIONS = [
  { value: "MLM_SCAM", label: "Lừa đảo đa cấp" },
  { value: "ILLEGAL_FEE", label: "Thu phí trái phép" },
  { value: "OFFENSIVE_CONTENT", label: "Nội dung phản cảm" },
  { value: "FAKE_INFO", label: "Thông tin sai sự thật" },
  { value: "OTHER", label: "Khác" },
] as const;

export type JobReportReasonCategory = (typeof JOB_REPORT_REASON_OPTIONS)[number]["value"];

/** BE chỉ nhận 1 field `reason` dạng chuỗi tự do — ghép nhãn lý do + mô tả chi tiết. */
export function buildJobReportReason(
  category: JobReportReasonCategory,
  details: string | undefined,
) {
  const label =
    JOB_REPORT_REASON_OPTIONS.find((option) => option.value === category)?.label ??
    category;
  const trimmedDetails = details?.trim();

  if (category === "OTHER") return trimmedDetails || label;
  return trimmedDetails ? `${label} - ${trimmedDetails}` : label;
}
