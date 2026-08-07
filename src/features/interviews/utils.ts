const DAY_LABELS = ["CN", "Thứ 2", "Thứ 3", "Thứ 4", "Thứ 5", "Thứ 6", "Thứ 7"];

export interface IWeekDay {
  date: Date;
  dayLabel: string;
  isToday: boolean;
}

/** Tuần bắt đầu từ Chủ nhật, theo đúng thứ tự nhãn CN → Thứ 7 trong thiết kế. */
export function getCurrentWeekDays(reference: Date = new Date()): IWeekDay[] {
  const start = new Date(reference);
  start.setHours(0, 0, 0, 0);
  start.setDate(start.getDate() - start.getDay());

  const today = new Date();
  today.setHours(0, 0, 0, 0);

  return Array.from({ length: 7 }, (_, i) => {
    const date = new Date(start);
    date.setDate(start.getDate() + i);
    return {
      date,
      dayLabel: DAY_LABELS[i],
      isToday: date.getTime() === today.getTime(),
    };
  });
}

function formatDayMonth(date: Date): string {
  return `${String(date.getDate()).padStart(2, "0")}/${String(date.getMonth() + 1).padStart(2, "0")}`;
}

export function formatWeekRangeLabel(days: IWeekDay[]): string {
  const first = days[0].date;
  const last = days[6].date;
  return `Tuần này (${formatDayMonth(first)} - ${formatDayMonth(last)}/${last.getFullYear()})`;
}

export function isSameDay(a: Date, b: Date): boolean {
  return (
    a.getFullYear() === b.getFullYear() &&
    a.getMonth() === b.getMonth() &&
    a.getDate() === b.getDate()
  );
}

export function formatInterviewDateTime(iso: string): string {
  const date = new Date(iso);
  const dateLabel = date.toLocaleDateString("vi-VN", { day: "2-digit", month: "2-digit" });
  const timeLabel = date.toLocaleTimeString("vi-VN", { hour: "2-digit", minute: "2-digit" });
  return `${dateLabel} • ${timeLabel}`;
}
