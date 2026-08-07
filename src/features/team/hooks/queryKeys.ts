export const PERMISSIONS_QUERY_KEY = ["team", "permissions"] as const;

/**
 * Chưa có API GET list-roles/list-members trong phạm vi hiện tại, nhưng
 * mutation vẫn invalidate 2 key này để tương thích ngay khi hook fetch
 * tương ứng được bổ sung sau này.
 */
export const teamRolesQueryKey = (companyId: string) =>
  ["team", "roles", companyId] as const;

export const teamMembersQueryKey = (companyId: string) =>
  ["team", "members", companyId] as const;
