import { z } from "zod";
import { INTERVIEW_MODES } from "@/features/applications/constants";

export const scheduleInterviewSchema = z.object({
  mode: z.enum(INTERVIEW_MODES as [string, ...string[]], {
    message: "Vui lòng chọn hình thức phỏng vấn",
  }),
  location: z.string().min(1, "Vui lòng nhập địa điểm hoặc link phỏng vấn"),
  interviewerId: z.string().min(1, "Vui lòng chọn người phỏng vấn"),
  /** Giá trị input type="datetime-local", vd "2026-08-15T09:00". */
  scheduledAt: z
    .string()
    .min(1, "Vui lòng chọn thời gian phỏng vấn")
    .refine((value) => new Date(value).getTime() > Date.now(), {
      message: "Thời gian phỏng vấn phải ở tương lai",
    }),
  note: z.string().optional(),
});

export type ScheduleInterviewFormValues = z.infer<typeof scheduleInterviewSchema>;
