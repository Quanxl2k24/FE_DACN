import { z } from "zod";

export const jobCategorySchema = z.object({
  name: z
    .string()
    .min(1, "Vui lòng nhập tên danh mục")
    .max(255, "Tối đa 255 ký tự"),
});

export type JobCategoryFormValues = z.infer<typeof jobCategorySchema>;
