"use client";

import { useState } from "react";
import { Search } from "lucide-react";

import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { useGetCandidates } from "@/features/applications/hooks/useGetCandidates";
import type { ICandidate } from "@/features/applications/types";
import { getInitials } from "@/features/applications/utils";

interface CandidateSearchDialogProps {
  companyId: string;
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSelect: (candidate: ICandidate) => void;
}

/**
 * Bước chọn ứng viên trước khi mở form đặt lịch phỏng vấn thật — trang Phỏng
 * vấn không có sẵn ứng viên trong ngữ cảnh (khác trang Ứng viên, nơi đã có
 * candidate object từ danh sách), nên cần tìm & chọn trước để lấy userId/jobId.
 */
export function CandidateSearchDialog({
  companyId,
  open,
  onOpenChange,
  onSelect,
}: CandidateSearchDialogProps) {
  const [nameDraft, setNameDraft] = useState("");
  const [name, setName] = useState("");

  const { data, isLoading } = useGetCandidates(companyId, {
    name: name || undefined,
    take: 10,
  });
  const candidates = data?.pages[0]?.data ?? [];

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Chọn ứng viên</DialogTitle>
          <DialogDescription>
            Tìm ứng viên đã ứng tuyển để đặt lịch phỏng vấn.
          </DialogDescription>
        </DialogHeader>

        <form
          className="relative"
          onSubmit={(e) => {
            e.preventDefault();
            setName(nameDraft.trim());
          }}
        >
          <Search className="pointer-events-none absolute top-1/2 left-3 size-4 -translate-y-1/2 text-muted-foreground" />
          <Input
            autoFocus
            placeholder="Tìm theo tên ứng viên..."
            value={nameDraft}
            onChange={(e) => setNameDraft(e.target.value)}
            className="pl-9"
          />
        </form>

        <div className="flex max-h-72 flex-col gap-1 overflow-y-auto">
          {isLoading && (
            <p className="py-6 text-center text-sm text-muted-foreground">Đang tải...</p>
          )}
          {!isLoading && candidates.length === 0 && (
            <p className="py-6 text-center text-sm text-muted-foreground">
              Không tìm thấy ứng viên phù hợp.
            </p>
          )}
          {candidates.map((candidate) => (
            <button
              key={candidate.applicationId}
              type="button"
              onClick={() => onSelect(candidate)}
              className="flex items-center gap-2.5 rounded-lg px-2 py-2 text-left hover:bg-muted"
            >
              <Avatar size="sm">
                <AvatarFallback>{getInitials(candidate.name)}</AvatarFallback>
              </Avatar>
              <div className="min-w-0">
                <p className="truncate text-sm font-medium text-foreground">
                  {candidate.name}
                </p>
                <p className="truncate text-xs text-muted-foreground">
                  {candidate.jobTitle}
                </p>
              </div>
            </button>
          ))}
        </div>
      </DialogContent>
    </Dialog>
  );
}
