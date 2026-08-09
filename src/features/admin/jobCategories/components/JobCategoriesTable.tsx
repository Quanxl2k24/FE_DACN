"use client";

import { Pencil, Trash2 } from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import type { IJobCategory } from "@/features/jobs/types";

interface JobCategoriesTableProps {
  categories: IJobCategory[] | undefined;
  isLoading: boolean;
  onEdit: (category: IJobCategory) => void;
  onDelete: (category: IJobCategory) => void;
}

function formatDate(value: string) {
  return new Date(value).toLocaleDateString("vi-VN");
}

export function JobCategoriesTable({
  categories,
  isLoading,
  onEdit,
  onDelete,
}: JobCategoriesTableProps) {
  if (isLoading) {
    return (
      <div className="flex flex-col gap-2">
        <Skeleton className="h-10 w-full" />
        <Skeleton className="h-10 w-full" />
        <Skeleton className="h-10 w-full" />
      </div>
    );
  }

  if (!categories || categories.length === 0) {
    return (
      <p className="py-10 text-center text-sm text-muted-foreground">
        Chưa có danh mục ngành nghề nào.
      </p>
    );
  }

  return (
    <div className="rounded-xl border border-border">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Tên danh mục</TableHead>
            <TableHead>Trạng thái</TableHead>
            <TableHead>Ngày tạo</TableHead>
            <TableHead className="text-right">Hành động</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {categories.map((category) => (
            <TableRow key={category.id}>
              <TableCell className="font-medium text-foreground">
                {category.name}
              </TableCell>
              <TableCell>
                <Badge variant={category.active ? "default" : "outline"}>
                  {category.active ? "Đang hoạt động" : "Đã ẩn"}
                </Badge>
              </TableCell>
              <TableCell className="text-muted-foreground">
                {formatDate(category.createdAt)}
              </TableCell>
              <TableCell className="text-right">
                <div className="flex justify-end gap-1">
                  <Button
                    variant="ghost"
                    size="icon-sm"
                    onClick={() => onEdit(category)}
                  >
                    <Pencil />
                    <span className="sr-only">Sửa</span>
                  </Button>
                  <Button
                    variant="ghost"
                    size="icon-sm"
                    className="text-destructive hover:bg-destructive/10 hover:text-destructive"
                    onClick={() => onDelete(category)}
                  >
                    <Trash2 />
                    <span className="sr-only">Xoá</span>
                  </Button>
                </div>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
