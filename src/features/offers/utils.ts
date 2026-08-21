/** Lời mời cần hiển thị số tiền chính xác (không rút gọn "x triệu" như formatSalaryRange). */
export function formatOfferSalary(salary: number): string {
  return new Intl.NumberFormat("vi-VN", { style: "currency", currency: "VND" }).format(salary);
}

export function formatOfferDate(value: string | null): string {
  if (!value) return "—";
  return new Date(value).toLocaleDateString("vi-VN");
}
