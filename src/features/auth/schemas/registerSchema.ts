import { z } from "zod";

export const registerSchema = z
  .object({
    role: z.enum(["APPLICANT", "RECRUITER"]),
    fullName: z
      .string()
      .min(1, "Vui lòng nhập họ và tên")
      .min(2, "Họ và tên quá ngắn"),
    email: z.string().min(1, "Vui lòng nhập email").email("Email không hợp lệ"),
    username: z
      .string()
      .min(1, "Vui lòng nhập tên đăng nhập")
      .min(4, "Tên đăng nhập phải có ít nhất 4 ký tự")
      .regex(/^[a-zA-Z0-9_]+$/, "Chỉ gồm chữ, số và dấu gạch dưới"),
    password: z
      .string()
      .min(8, "Mật khẩu phải có ít nhất 8 ký tự")
      .regex(/[A-Z]/, "Mật khẩu cần ít nhất 1 chữ hoa")
      .regex(/[a-z]/, "Mật khẩu cần ít nhất 1 chữ thường")
      .regex(/[0-9]/, "Mật khẩu cần ít nhất 1 chữ số")
      .regex(/[^A-Za-z0-9]/, "Mật khẩu cần ít nhất 1 ký tự đặc biệt"),
    confirmPassword: z.string().min(1, "Vui lòng xác nhận mật khẩu"),
    companyName: z.string().optional(),
  })
  .superRefine((data, ctx) => {
    if (data.password !== data.confirmPassword) {
      ctx.addIssue({
        code: "custom",
        path: ["confirmPassword"],
        message: "Mật khẩu xác nhận không khớp",
      });
    }
    if (data.role === "RECRUITER" && !data.companyName?.trim()) {
      ctx.addIssue({
        code: "custom",
        path: ["companyName"],
        message: "Vui lòng nhập tên công ty",
      });
    }
  });

export type RegisterFormValues = z.infer<typeof registerSchema>;
