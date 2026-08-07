import { z } from "zod";

export const inviteMemberSchema = z.object({
  email: z
    .string()
    .min(1, "Vui lòng nhập email")
    .email("Email không hợp lệ"),
  roleId: z.string().min(1, "Vui lòng chọn chức danh"),
});

export type InviteMemberFormValues = z.infer<typeof inviteMemberSchema>;
