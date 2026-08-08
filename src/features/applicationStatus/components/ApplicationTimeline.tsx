import { Fragment } from "react";

import { APPLICATION_STEP_ICON } from "@/features/applicationStatus/constants";
import type { IApplicationStatusStep } from "@/features/applicationStatus/types";
import { formatStepDate } from "@/features/applicationStatus/utils";
import { cn } from "@/lib/utils";

interface ApplicationTimelineProps {
  steps: IApplicationStatusStep[];
  currentStatus: string;
}

export function ApplicationTimeline({ steps, currentStatus }: ApplicationTimelineProps) {
  return (
    <div className="overflow-x-auto">
      <div className="flex min-w-max items-start px-2 py-2">
        {steps.map((step, index) => {
          const Icon = APPLICATION_STEP_ICON[step.key];
          const isCurrent = step.key === currentStatus;

          return (
            <Fragment key={step.key}>
              {index !== 0 && (
                <div
                  className={cn(
                    "mt-5 h-0.5 w-12 shrink-0 sm:w-20",
                    steps[index - 1].reached ? "bg-primary" : "bg-muted",
                  )}
                />
              )}
              <div className="flex w-24 shrink-0 flex-col items-center gap-2 text-center sm:w-32">
                <span
                  className={cn(
                    "flex size-10 shrink-0 items-center justify-center rounded-full",
                    isCurrent
                      ? "bg-success text-success-foreground"
                      : step.reached
                        ? "bg-primary text-primary-foreground"
                        : "bg-muted text-muted-foreground",
                  )}
                >
                  <Icon className="size-5" />
                </span>
                <span className="text-sm font-bold text-foreground">{step.label}</span>
                <span className="text-xs text-muted-foreground">
                  {formatStepDate(step.at)}
                </span>
              </div>
            </Fragment>
          );
        })}
      </div>
    </div>
  );
}
