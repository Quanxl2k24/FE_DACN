export const dashboardStatsQueryKey = (companyId: string) =>
  ["dashboard", "stats", companyId] as const;
