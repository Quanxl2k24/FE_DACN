import { z } from "zod";

// Khớp validator @IsPhoneNumber('VN') phía BE: số di động VN 10 số, có thể
// nhập kèm +84. Để trống thì bỏ qua (BE giữ nguyên phone cũ).
const VN_PHONE_REGEX = /^(0|\+84)(3|5|7|8|9)[0-9]{8}$/;

export const updateProfileSchema = z.object({
  fullName: z
    .string()
    .trim()
    .min(1, "Vui lòng nhập họ và tên")
    .max(100, "Họ và tên tối đa 100 ký tự"),
  phone: z
    .string()
    .trim()
    .regex(VN_PHONE_REGEX, "Số điện thoại không hợp lệ")
    .optional()
    .or(z.literal("")),
});

export type UpdateProfileFormValues = z.infer<typeof updateProfileSchema>;
