export function formatStepDate(at: string | null): string {
  if (!at) return "—";
  const d = new Date(at);
  return `${String(d.getDate()).padStart(2, "0")}/${String(d.getMonth() + 1).padStart(2, "0")}/${d.getFullYear()}`;
}
