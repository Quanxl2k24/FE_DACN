"use client";

import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import type { IWeekDay } from "@/features/interviews/utils";
import { formatWeekRangeLabel, isSameDay } from "@/features/interviews/utils";
import { cn } from "@/lib/utils";

interface WeeklyCalendarStripProps {
  days: IWeekDay[];
  interviewCountByDay: Map<string, number>;
  selectedDate: Date | null;
  onSelectDate: (date: Date | null) => void;
}

export function WeeklyCalendarStrip({
  days,
  interviewCountByDay,
  selectedDate,
  onSelectDate,
}: WeeklyCalendarStripProps) {
  return (
    <Card className="rounded-2xl p-5">
      <p className="text-sm font-medium text-muted-foreground">
        {formatWeekRangeLabel(days)}
      </p>
      <div className="mt-3 grid grid-cols-7 gap-2 sm:gap-3">
        {days.map((day) => {
          const count = interviewCountByDay.get(day.date.toDateString()) ?? 0;
          const hasInterviews = count > 0;
          const isSelected = selectedDate ? isSameDay(selectedDate, day.date) : false;

          return (
            <button
              key={day.date.toDateString()}
              type="button"
              onClick={() => onSelectDate(isSelected ? null : day.date)}
              className={cn(
                "flex flex-col items-center gap-1.5 rounded-2xl border px-1 py-3 transition-colors",
                hasInterviews
                  ? "border-primary bg-primary/5"
                  : "border-border bg-background hover:bg-muted",
                isSelected && "ring-2 ring-primary ring-offset-1",
              )}
            >
              <span className="text-xs text-muted-foreground">{day.dayLabel}</span>
              <span className="text-xl font-bold text-foreground">{day.date.getDate()}</span>
              {hasInterviews ? (
                <Badge className="px-1.5 text-[10px]">{count} PV</Badge>
              ) : (
                <span className="h-5" />
              )}
            </button>
          );
        })}
      </div>
    </Card>
  );
}
