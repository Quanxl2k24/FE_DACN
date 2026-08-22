"use client";

import { useCallback, useRef, useState } from "react";
import { FileText, Loader2, Upload, X, ArrowRight } from "lucide-react";
import Link from "next/link";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { useApplyJob } from "@/features/jobSearch/hooks/useApplyJob";

const MAX_FILE_SIZE_MB = 5;
const MAX_FILE_SIZE_BYTES = MAX_FILE_SIZE_MB * 1024 * 1024;
const ACCEPTED_TYPES = [
  "application/pdf",
  "application/msword", // .doc
  "application/vnd.openxmlformats-officedocument.wordprocessingml.document", // .docx
];
const ACCEPTED_EXTENSIONS = ".pdf,.doc,.docx";

interface ApplyJobDialogProps {
  jobId: string;
  jobTitle: string;
  open: boolean;
  onOpenChange: (open: boolean) => void;
  /** Callback khi ứng tuyển thành công — dùng để chuyển sang link trạng thái */
  onSuccess?: () => void;
}

export function ApplyJobDialog({
  jobId,
  jobTitle,
  open,
  onOpenChange,
  onSuccess,
}: ApplyJobDialogProps) {
  const inputRef = useRef<HTMLInputElement>(null);
  const [cvFile, setCvFile] = useState<File | null>(null);
  const [fileError, setFileError] = useState<string | null>(null);
  const [isDragging, setIsDragging] = useState(false);
  const [applied, setApplied] = useState(false);

  const { mutate: applyJob, isPending } = useApplyJob();

  const validateAndSet = (file: File) => {
    setFileError(null);
    if (!ACCEPTED_TYPES.includes(file.type)) {
      setFileError("Chỉ chấp nhận file PDF, DOC hoặc DOCX.");
      return;
    }
    if (file.size > MAX_FILE_SIZE_BYTES) {
      setFileError(`File vượt quá ${MAX_FILE_SIZE_MB}MB. Vui lòng chọn file nhỏ hơn.`);
      return;
    }
    setCvFile(file);
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) validateAndSet(file);
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = () => setIsDragging(false);

  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    const file = e.dataTransfer.files?.[0];
    if (file) validateAndSet(file);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleRemoveFile = () => {
    setCvFile(null);
    setFileError(null);
    if (inputRef.current) inputRef.current.value = "";
  };

  const handleSubmit = () => {
    if (!cvFile) {
      setFileError("Vui lòng chọn file CV trước khi ứng tuyển.");
      return;
    }
    applyJob(
      { jobId, cvFile },
      {
        onSuccess: () => {
          setApplied(true);
          onSuccess?.();
        },
      },
    );
  };

  const handleClose = (isOpen: boolean) => {
    if (!isOpen) {
      // Reset state khi đóng dialog
      setCvFile(null);
      setFileError(null);
      setApplied(false);
      if (inputRef.current) inputRef.current.value = "";
    }
    onOpenChange(isOpen);
  };

  const formatFileSize = (bytes: number) => {
    if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`;
    return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
  };

  return (
    <Dialog open={open} onOpenChange={handleClose}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Ứng tuyển ngay</DialogTitle>
          <DialogDescription className="line-clamp-2">
            Vị trí: <span className="font-medium text-foreground">{jobTitle}</span>
          </DialogDescription>
        </DialogHeader>

        {applied ? (
          /* ── Trạng thái đã ứng tuyển thành công ── */
          <div className="flex flex-col items-center gap-4 py-6 text-center">
            <div className="flex size-16 items-center justify-center rounded-full bg-success/10">
              <svg
                className="size-8 text-success"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={2}
              >
                <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
              </svg>
            </div>
            <div>
              <p className="text-lg font-semibold text-foreground">
                Ứng tuyển thành công! 🎉
              </p>
              <p className="mt-1 text-sm text-muted-foreground">
                Hồ sơ của bạn đã được gửi. Chúc bạn may mắn!
              </p>
            </div>
            <div className="flex flex-col gap-2 w-full">
              <Button
                variant="outline"
                render={<Link href={`/application-status/${jobId}`} />}
                onClick={() => handleClose(false)}
                className="gap-1.5"
              >
                Xem trạng thái ứng tuyển
                <ArrowRight className="size-3.5" />
              </Button>
              <Button variant="ghost" onClick={() => handleClose(false)}>
                Đóng
              </Button>
            </div>
          </div>
        ) : (
          /* ── Form upload CV ── */
          <>
            <div className="space-y-4 py-2">
              <p className="text-sm text-muted-foreground">
                Tải lên CV của bạn (PDF, DOC hoặc DOCX · tối đa {MAX_FILE_SIZE_MB}MB).
              </p>

              {/* Drop Zone */}
              <div
                role="button"
                tabIndex={0}
                aria-label="Khu vực tải lên CV"
                className={[
                  "relative flex min-h-[140px] cursor-pointer flex-col items-center justify-center gap-3 rounded-xl border-2 border-dashed p-6 text-center transition-colors",
                  isDragging
                    ? "border-primary bg-primary/5"
                    : "border-border hover:border-primary/50 hover:bg-muted/50",
                  fileError ? "border-destructive/50" : "",
                ]
                  .filter(Boolean)
                  .join(" ")}
                onClick={() => inputRef.current?.click()}
                onKeyDown={(e) => e.key === "Enter" && inputRef.current?.click()}
                onDragOver={handleDragOver}
                onDragLeave={handleDragLeave}
                onDrop={handleDrop}
              >
                <input
                  ref={inputRef}
                  id="cv-file-input"
                  type="file"
                  accept={ACCEPTED_EXTENSIONS}
                  className="sr-only"
                  onChange={handleFileChange}
                />

                {cvFile ? (
                  /* Preview file đã chọn */
                  <div className="flex w-full items-center gap-3 rounded-lg bg-muted/60 p-3">
                    <div className="flex size-10 shrink-0 items-center justify-center rounded-lg bg-destructive/10">
                      <FileText className="size-5 text-destructive" />
                    </div>
                    <div className="min-w-0 flex-1 text-left">
                      <p className="truncate text-sm font-medium text-foreground">
                        {cvFile.name}
                      </p>
                      <p className="text-xs text-muted-foreground">
                        {formatFileSize(cvFile.size)}
                      </p>
                    </div>
                    <button
                      type="button"
                      aria-label="Xóa file"
                      className="rounded-full p-1 text-muted-foreground hover:bg-muted hover:text-foreground transition-colors"
                      onClick={(e) => {
                        e.stopPropagation();
                        handleRemoveFile();
                      }}
                    >
                      <X className="size-4" />
                    </button>
                  </div>
                ) : (
                  <>
                    <div className="flex size-12 items-center justify-center rounded-full bg-primary/10">
                      <Upload className="size-5 text-primary" />
                    </div>
                    <div>
                      <p className="text-sm font-medium text-foreground">
                        Kéo thả hoặc nhấn để chọn file
                      </p>
                      <p className="mt-0.5 text-xs text-muted-foreground">PDF / DOC / DOCX · tối đa {MAX_FILE_SIZE_MB}MB</p>
                    </div>
                  </>
                )}
              </div>

              {/* Error message */}
              {fileError && (
                <p className="text-xs text-destructive">{fileError}</p>
              )}
            </div>

            <DialogFooter className="gap-2 sm:gap-0">
              <Button
                variant="outline"
                onClick={() => handleClose(false)}
                disabled={isPending}
              >
                Hủy
              </Button>
              <Button
                id="apply-job-submit-btn"
                onClick={handleSubmit}
                disabled={!cvFile || isPending}
                className="gap-2"
              >
                {isPending ? (
                  <>
                    <Loader2 className="size-4 animate-spin" />
                    Đang gửi...
                  </>
                ) : (
                  "Nộp hồ sơ"
                )}
              </Button>
            </DialogFooter>
          </>
        )}
      </DialogContent>
    </Dialog>
  );
}
