import { z } from "zod";
import { RECRUITER_JOB_STATUSES } from "@/features/jobs/constants";

export const jobSchema = z
  .object({
    title: z
      .string()
      .min(1, "Vui lòng nhập tiêu đề tin tuyển dụng")
      .max(255, "Tối đa 255 ký tự"),
    status: z.enum(RECRUITER_JOB_STATUSES, {
      message: "Vui lòng chọn trạng thái",
    }),
    categoryId: z.string().optional(),
    salaryMin: z
      .string()
      .optional()
      .refine((v) => !v || /^\d+$/.test(v), "Lương tối thiểu không hợp lệ"),
    salaryMax: z
      .string()
      .optional()
      .refine((v) => !v || /^\d+$/.test(v), "Lương tối đa không hợp lệ"),
    province: z.string().optional(),
    address: z.string().optional(),
    description: z.string().optional(),
    requirements: z.string().optional(),
    benefits: z.string().optional(),
    /** yyyy-mm-dd từ input type="date". */
    expiredAt: z.string().optional(),
    skillIds: z.array(z.number()).optional(),
  })
  .refine(
    (data) =>
      !data.salaryMin || !data.salaryMax
        ? true
        : Number(data.salaryMax) >= Number(data.salaryMin),
    {
      message: "Lương tối đa phải lớn hơn hoặc bằng lương tối thiểu",
      path: ["salaryMax"],
    },
  );

export type JobFormValues = z.infer<typeof jobSchema>;
