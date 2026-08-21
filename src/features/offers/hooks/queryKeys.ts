export const offerQueryKey = (companyId: string, applicationId: string) =>
  ["offer", companyId, applicationId] as const;
