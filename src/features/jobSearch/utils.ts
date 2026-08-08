const COMPANY_GRADIENTS = [
  "from-blue-500 to-indigo-500",
  "from-emerald-500 to-teal-500",
  "from-amber-500 to-orange-500",
  "from-violet-500 to-purple-500",
  "from-rose-500 to-pink-500",
  "from-cyan-500 to-sky-500",
] as const;

function hashString(value: string): number {
  return value.split("").reduce((acc, char) => acc + char.charCodeAt(0), 0);
}

/** Gradient nền cho logo công ty khi không có `logoUrl` — chọn theo hash tên để ổn định. */
export function getCompanyGradientClass(name: string): string {
  return COMPANY_GRADIENTS[hashString(name) % COMPANY_GRADIENTS.length];
}

export function getCompanyInitial(name: string): string {
  return name.trim().charAt(0).toUpperCase() || "?";
}

/** Tin được coi là "Mới" nếu đăng trong vòng `days` ngày gần đây. */
export function isRecentlyPosted(iso: string, days = 3): boolean {
  const diffDays = (Date.now() - new Date(iso).getTime()) / (1000 * 60 * 60 * 24);
  return diffDays <= days;
}

export function formatPostedAgo(iso: string): string {
  const diffDays = Math.floor((Date.now() - new Date(iso).getTime()) / (1000 * 60 * 60 * 24));

  if (diffDays <= 0) return "Đăng hôm nay";
  if (diffDays === 1) return "Đăng 1 ngày trước";
  if (diffDays < 7) return `Đăng ${diffDays} ngày trước`;

  const diffWeeks = Math.floor(diffDays / 7);
  if (diffWeeks === 1) return "Đăng 1 tuần trước";
  if (diffWeeks < 5) return `Đăng ${diffWeeks} tuần trước`;

  const diffMonths = Math.floor(diffDays / 30);
  return diffMonths <= 1 ? "Đăng 1 tháng trước" : `Đăng ${diffMonths} tháng trước`;
}
