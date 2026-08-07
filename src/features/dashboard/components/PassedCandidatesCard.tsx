import Link from "next/link";

import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardAction,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { getInitials } from "@/features/applications/utils";
import type { IPassedCandidate } from "@/features/dashboard/types";

interface PassedCandidatesCardProps {
  candidates: IPassedCandidate[];
  isLoading: boolean;
}

export function PassedCandidatesCard({ candidates, isLoading }: PassedCandidatesCardProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Ứng viên đạt tuyển dụng</CardTitle>
        <CardAction>
          <Button
            variant="ghost"
            size="sm"
            nativeButton={false}
            render={<Link href="/dashboard/applications">Xem tất cả</Link>}
          />
        </CardAction>
      </CardHeader>
      <CardContent className="flex flex-col divide-y divide-border">
        {isLoading && (
          <div className="flex flex-col gap-2 py-1">
            <Skeleton className="h-12 rounded-lg" />
            <Skeleton className="h-12 rounded-lg" />
          </div>
        )}
        {!isLoading && candidates.length === 0 && (
          <p className="py-6 text-center text-sm text-muted-foreground">
            Chưa có ứng viên nào đạt yêu cầu hoặc trúng tuyển.
          </p>
        )}
        {!isLoading &&
          candidates.map((candidate) => (
            <div
              key={`${candidate.userId}-${candidate.jobId}`}
              className="flex items-center gap-3 py-3 first:pt-0 last:pb-0"
            >
              <Avatar size="sm">
                <AvatarFallback>{getInitials(candidate.name)}</AvatarFallback>
              </Avatar>
              <div className="flex flex-col">
                <span className="text-sm font-medium">{candidate.name}</span>
                <span className="text-xs text-muted-foreground">{candidate.jobTitle}</span>
              </div>
            </div>
          ))}
      </CardContent>
    </Card>
  );
}
