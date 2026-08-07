import { z } from "zod";

export const COMPANY_TYPES = [
  "Công nghệ thông tin",
  "Tài chính - Ngân hàng",
  "Bán lẻ - Thương mại",
  "Sản xuất",
  "Giáo dục",
  "Y tế",
  "Khác",
] as const;

export const COMPANY_SIZES = [
  "Dưới 10 nhân viên",
  "10 - 49 nhân viên",
  "50 - 199 nhân viên",
  "200 - 499 nhân viên",
  "Trên 500 nhân viên",
] as const;

export const companyProfileSchema = z.object({
  companyName: z.string().min(1, "Vui lòng nhập tên công ty"),
  email: z
    .string()
    .min(1, "Vui lòng nhập email công ty")
    .email("Email không hợp lệ"),
  taxCode: z
    .string()
    .min(1, "Vui lòng nhập mã số thuế")
    .regex(/^\d{10}(-\d{3})?$/, "Mã số thuế không hợp lệ"),
  companyType: z.enum(COMPANY_TYPES, {
    message: "Vui lòng chọn ngành nghề",
  }),
  size: z.enum(COMPANY_SIZES, { message: "Vui lòng chọn quy mô công ty" }),
  foundedYear: z
    .string()
    .optional()
    .refine((val) => !val || /^\d{4}$/.test(val), "Năm thành lập không hợp lệ"),
  website: z
    .string()
    .optional()
    .refine(
      (val) => !val || /^https?:\/\/.+\..+/.test(val),
      "Website không hợp lệ, cần bắt đầu bằng http(s)://"
    ),
  phone: z.string().optional(),
  address: z.string().min(1, "Vui lòng nhập địa chỉ"),
  description: z.string().max(2000, "Tối đa 2000 ký tự").optional(),
  logoUrl: z.string().optional(),
});

export type CompanyProfileFormValues = z.infer<typeof companyProfileSchema>;
