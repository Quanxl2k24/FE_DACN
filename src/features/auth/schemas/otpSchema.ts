import { z } from "zod";

export const otpSchema = z.object({
  otp: z
    .string()
    .min(1, "Vui lòng nhập mã OTP")
    .regex(/^\d{6}$/, "Mã OTP gồm 6 chữ số"),
});

export type OtpFormValues = z.infer<typeof otpSchema>;
