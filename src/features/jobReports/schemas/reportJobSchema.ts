import { z } from "zod";
import {
  JOB_REPORT_REASON_OPTIONS,
  type JobReportReasonCategory,
} from "@/features/jobReports/constants";

const REASON_VALUES = JOB_REPORT_REASON_OPTIONS.map((option) => option.value) as [
  JobReportReasonCategory,
  ...JobReportReasonCategory[],
];

export const reportJobSchema = z
  .object({
    reasonCategory: z.enum(REASON_VALUES, {
      message: "Vui lòng chọn lý do báo cáo",
    }),
    details: z.string().max(1000, "Tối đa 1000 ký tự").optional(),
  })
  .refine(
    (data) => data.reasonCategory !== "OTHER" || !!data.details?.trim(),
    {
      message: "Vui lòng mô tả chi tiết lý do báo cáo",
      path: ["details"],
    },
  );

export type ReportJobFormValues = z.infer<typeof reportJobSchema>;
