"use client";

import { SlidersHorizontal } from "lucide-react";

import { Card } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Slider } from "@/components/ui/slider";
import { useGetJobCategories } from "@/features/jobs/hooks/useGetJobCategories";
import { useAuthStore } from "@/store/useAuthStore";

const MAX_SALARY_MILLION = 50;

interface JobFiltersSidebarProps {
  categoryId: string;
  onCategoryIdChange: (value: string) => void;
  salaryFromMillion: number;
  onSalaryFromMillionChange: (value: number) => void;
}

export function JobFiltersSidebar({
  categoryId,
  onCategoryIdChange,
  salaryFromMillion,
  onSalaryFromMillionChange,
}: JobFiltersSidebarProps) {
  const isAuthenticated = useAuthStore((state) => state.isAuthenticated);
  const { data: categories, isLoading: isLoadingCategories } =
    useGetJobCategories(isAuthenticated);

  return (
    <Card className="h-fit rounded-2xl p-6">
      <div className="flex items-center gap-2 text-base font-bold text-foreground">
        <SlidersHorizontal className="size-4.5" />
        Bộ lọc
      </div>

      <div className="mt-6 flex flex-col gap-6">
        <div className="flex flex-col gap-2">
          <Label className="text-sm text-foreground">Ngành nghề</Label>
          <Select
            value={categoryId || "ALL"}
            onValueChange={(value) => onCategoryIdChange(value === "ALL" ? "" : (value ?? ""))}
            disabled={!isAuthenticated}
          >
            <SelectTrigger className="w-full">
              <SelectValue
                placeholder={
                  isAuthenticated
                    ? isLoadingCategories
                      ? "Đang tải..."
                      : "Tất cả ngành"
                    : "Đăng nhập để lọc theo ngành"
                }
              />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="ALL">Tất cả ngành</SelectItem>
              {categories?.map((category) => (
                <SelectItem key={category.id} value={String(category.id)}>
                  {category.name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <div className="flex flex-col gap-3">
          <Label className="text-sm text-foreground">
            Mức lương tối thiểu: {salaryFromMillion} triệu VNĐ
          </Label>
          <Slider
            min={0}
            max={MAX_SALARY_MILLION}
            step={5}
            value={salaryFromMillion}
            onValueChange={(value) =>
              onSalaryFromMillionChange(Array.isArray(value) ? value[0] : value)
            }
          />
        </div>
      </div>
    </Card>
  );
}
