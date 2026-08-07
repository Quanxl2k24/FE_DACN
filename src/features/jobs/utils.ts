function formatMillions(value: number) {
  return `${(value / 1_000_000).toLocaleString("vi-VN")} triệu`;
}

export function formatSalaryRange(
  min: number | null,
  max: number | null,
): string {
  if (min == null && max == null) return "Thỏa thuận";
  if (min != null && max != null) {
    return `${formatMillions(min)} - ${formatMillions(max)}`;
  }
  if (min != null) return `Từ ${formatMillions(min)}`;
  return `Đến ${formatMillions(max as number)}`;
}

export function getApplicationCount(job: { _count: { applications: number } }): number {
  return job._count.applications;
}

export function formatExpiredAt(expiredAt: string | null): string {
  if (!expiredAt) return "Không thời hạn";
  return new Date(expiredAt).toLocaleDateString("vi-VN");
}

export function isJobExpired(expiredAt: string | null): boolean {
  if (!expiredAt) return false;
  return new Date(expiredAt).getTime() < Date.now();
}

export function formatDate(value: string): string {
  return new Date(value).toLocaleDateString("vi-VN");
}
