import {
  Award,
  CalendarClock,
  CheckCircle2,
  Eye,
  PartyPopper,
  Send,
  type LucideIcon,
} from "lucide-react";
import type { ApplicationStepKey } from "@/features/applicationStatus/types";

export const APPLICATION_STEP_ICON: Record<ApplicationStepKey, LucideIcon> = {
  APPLIED: Send,
  SCREENING: Eye,
  INTERVIEW: CalendarClock,
  INTERVIEW_PASSED: CheckCircle2,
  OFFERED: Award,
  HIRED: PartyPopper,
};
