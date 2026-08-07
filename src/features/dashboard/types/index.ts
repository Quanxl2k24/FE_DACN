/** Item trong `passedCandidates` — ứng viên có đơn ở trạng thái OFFERED/HIRED. */
export interface IPassedCandidate {
  userId: string;
  name: string;
  jobId: string;
  jobTitle: string;
}

/** Response GET /candidates/manage/:companyId/dashboard. */
export interface IRecruitmentDashboardStats {
  activeJobsCount: number;
  applicationsForActiveJobsCount: number;
  interviewsThisWeekCount: number;
  successRate: number;
  passedCandidates: IPassedCandidate[];
}
