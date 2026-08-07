import { z } from "zod";

export const roleSchema = z.object({
  name: z.string().min(1, "Vui lòng nhập tên chức danh"),
  permissionIds: z
    .array(z.number())
    .min(1, "Vui lòng chọn ít nhất một quyền"),
});

export type RoleFormValues = z.infer<typeof roleSchema>;
