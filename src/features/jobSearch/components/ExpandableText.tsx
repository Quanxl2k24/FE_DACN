"use client";

import { useState } from "react";

import { Button } from "@/components/ui/button";

interface ExpandableTextProps {
  text: string;
  maxLines?: number;
}

/** Tách nội dung theo dòng và hiển thị dạng bullet list, thu gọn nếu quá dài. */
export function ExpandableText({ text, maxLines = 5 }: ExpandableTextProps) {
  const [expanded, setExpanded] = useState(false);
  const lines = text.split(/\r?\n/).filter((line) => line.trim().length > 0);

  if (lines.length <= 1) {
    return <p className="whitespace-pre-line text-sm text-muted-foreground">{text}</p>;
  }

  const isTruncatable = lines.length > maxLines;
  const visibleLines = expanded || !isTruncatable ? lines : lines.slice(0, maxLines);

  return (
    <div className="flex flex-col gap-3">
      <ul className="flex flex-col gap-1.5 text-sm text-muted-foreground">
        {visibleLines.map((line, index) => (
          <li key={index} className="flex gap-2">
            <span className="mt-2 size-1 shrink-0 rounded-full bg-muted-foreground" />
            <span>{line}</span>
          </li>
        ))}
      </ul>
      {isTruncatable && (
        <Button
          variant="outline"
          size="sm"
          className="self-center rounded-full"
          onClick={() => setExpanded((v) => !v)}
        >
          {expanded ? "Thu gọn" : "Xem thêm"}
        </Button>
      )}
    </div>
  );
}
