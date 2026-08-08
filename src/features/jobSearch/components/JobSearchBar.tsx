"use client";

import { MapPin, Search } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { VN_PROVINCES } from "@/features/jobSearch/data/provinces";

interface JobSearchBarProps {
  keyword: string;
  onKeywordChange: (value: string) => void;
  province: string;
  onProvinceChange: (value: string) => void;
  onSubmit: () => void;
}

export function JobSearchBar({
  keyword,
  onKeywordChange,
  province,
  onProvinceChange,
  onSubmit,
}: JobSearchBarProps) {
  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        onSubmit();
      }}
      className="flex flex-col gap-3 rounded-2xl border border-border bg-card p-3 shadow-sm sm:flex-row sm:items-center sm:gap-0"
    >
      <div className="flex flex-1 items-center gap-2 px-3 py-1.5">
        <Search className="size-4.5 shrink-0 text-muted-foreground" />
        <Input
          placeholder="Chức danh, kỹ năng, công ty..."
          value={keyword}
          onChange={(e) => onKeywordChange(e.target.value)}
          className="h-9 border-none px-0 shadow-none focus-visible:ring-0"
        />
      </div>

      <div className="hidden h-8 w-px bg-border sm:block" />

      <div className="px-1 py-1 sm:w-56">
        <Select
          value={province || "ALL"}
          onValueChange={(value) => onProvinceChange(value === "ALL" ? "" : (value ?? ""))}
        >
          <SelectTrigger className="h-9 w-full border-none bg-transparent px-2 shadow-none">
            <MapPin className="size-4 shrink-0 text-muted-foreground" />
            <SelectValue placeholder="Tất cả địa điểm" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="ALL">Tất cả địa điểm</SelectItem>
            {VN_PROVINCES.map((p) => (
              <SelectItem key={p} value={p}>
                {p}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      <Button type="submit" size="lg" className="h-11 gap-2 rounded-xl sm:ml-2">
        <Search className="size-4" />
        Tìm kiếm
      </Button>
    </form>
  );
}
