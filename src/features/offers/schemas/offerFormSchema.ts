import { z } from "zod";

export const offerFormSchema = z.object({
  salary: z
    .string()
    .min(1, "Vui lòng nhập mức lương đề nghị")
    .refine((value) => Number.isInteger(Number(value)) && Number(value) > 0, {
      message: "Mức lương phải là số nguyên dương",
    }),
  /** Giá trị input type="date", vd "2026-09-01". */
  startDate: z
    .string()
    .optional()
    .refine((value) => !value || new Date(value).getTime() > Date.now(), {
      message: "Ngày bắt đầu phải ở tương lai",
    }),
  responseDeadline: z
    .string()
    .optional()
    .refine((value) => !value || new Date(value).getTime() > Date.now(), {
      message: "Hạn phản hồi phải ở tương lai",
    }),
  note: z.string().optional(),
});

export type OfferFormValues = z.infer<typeof offerFormSchema>;
