/** Một quyền hạn (permission) có sẵn trong hệ thống, dùng để build Role tùy chỉnh. */
export interface IPermission {
  id: number;
  code: string;
  module: string;
  description: string;
}

export interface IRolePermission {
  roleId: string;
  permissionId: number;
  permission: IPermission;
}

/** Chức danh (Role) tùy chỉnh của một công ty. */
export interface IRole {
  id: string;
  companyId: string;
  name: string;
  isCustom: boolean;
  rolePermissions: IRolePermission[];
}

export interface ICreateRolePayload {
  name: string;
  permissionIds: number[];
}

export type IUpdateRolePayload = ICreateRolePayload;

export interface IInviteMemberPayload {
  email: string;
  roleId: string;
}

/**
 * BE chưa mô tả chính xác shape trả về của API mời thành viên, suy ra dựa
 * trên payload đầu vào + field chuẩn (status) tương tự API mời thành viên
 * ở các hệ thống tương tự.
 */
export interface IInvitationResult {
  id: string;
  companyId: string;
  email: string;
  roleId: string;
  status: "PENDING" | "ACCEPTED";
}

export interface ITeamMemberRole {
  id: string;
  name: string;
}

export interface ITeamMemberUser {
  id: string;
  fullName: string;
  email: string;
  role: ITeamMemberRole;
}

/** Response thật của GET /company/:companyId/get-member. */
export interface ITeamMember {
  companyId: string;
  user: ITeamMemberUser;
}
