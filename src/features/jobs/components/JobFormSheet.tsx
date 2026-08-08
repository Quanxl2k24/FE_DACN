"use client";

import { useEffect } from "react";
import { Controller, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Loader2 } from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import { Skeleton } from "@/components/ui/skeleton";
import { Textarea } from "@/components/ui/textarea";
import { JOB_STATUS_LABEL, RECRUITER_JOB_STATUSES } from "@/features/jobs/constants";
import { useCreateJob } from "@/features/jobs/hooks/useCreateJob";
import { useGetJobCategories } from "@/features/jobs/hooks/useGetJobCategories";
import { useGetSkills } from "@/features/jobs/hooks/useGetSkills";
import { useUpdateJob } from "@/features/jobs/hooks/useUpdateJob";
import { jobSchema, type JobFormValues } from "@/features/jobs/schemas/jobSchema";
import type { ICreateJobPayload, IJobListItem } from "@/features/jobs/types";

interface JobFormSheetProps {
  companyId: string;
  open: boolean;
  onOpenChange: (open: boolean) => void;
  /**
   * Truyền vào khi sửa tin có sẵn, để trống khi tạo mới. Chỉ dùng
   * `IJobListItem` (dữ liệu từ danh sách) vì API chưa có GET chi tiết 1 job
   * — mô tả/yêu cầu/quyền lợi/hạn nộp không có sẵn để prefill khi sửa.
   */
  job?: IJobListItem | null;
}

function toJobPayload(values: JobFormValues): Omit<ICreateJobPayload, "companyId"> {
  return {
    title: values.title,
    status: values.status,
    salaryMin: values.salaryMin ? Number(values.salaryMin) : undefined,
    salaryMax: values.salaryMax ? Number(values.salaryMax) : undefined,
    address: values.address || undefined,
    province: values.province || undefined,
    description: values.description || undefined,
    requirements: values.requirements || undefined,
    benefits: values.benefits || undefined,
    expiredAt: values.expiredAt
      ? new Date(values.expiredAt).toISOString()
      : undefined,
    skillIds:
      values.skillIds && values.skillIds.length > 0
        ? values.skillIds
        : undefined,
    categoryId:
      values.categoryId && values.categoryId !== "NONE"
        ? Number(values.categoryId)
        : undefined,
  };
}

export function JobFormSheet({
  companyId,
  open,
  onOpenChange,
  job,
}: JobFormSheetProps) {
  const isEditing = Boolean(job);
  const { mutate: createJob, isPending: isCreating } = useCreateJob();
  const { mutate: updateJob, isPending: isUpdating } = useUpdateJob();
  const isPending = isCreating || isUpdating;
  const { data: skills, isLoading: isLoadingSkills } = useGetSkills();
  const { data: categories, isLoading: isLoadingCategories } = useGetJobCategories();

  const {
    register,
    control,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<JobFormValues>({
    resolver: zodResolver(jobSchema),
    defaultValues: { title: "", status: "PUBLISHED", categoryId: "NONE" },
  });

  useEffect(() => {
    if (!open) return;
    reset({
      title: job?.title ?? "",
      status: (job?.status as JobFormValues["status"]) ?? "PUBLISHED",
      categoryId: job?.category?.id != null ? String(job.category.id) : "NONE",
      salaryMin: job?.salaryMin != null ? String(job.salaryMin) : "",
      salaryMax: job?.salaryMax != null ? String(job.salaryMax) : "",
      province: job?.province ?? "",
      address: job?.address ?? "",
      // Danh sách job không kèm mô tả/yêu cầu/quyền lợi/hạn nộp (chưa có API
      // chi tiết) nên luôn để trống — để trống khi sửa nghĩa là giữ nguyên
      // giá trị cũ (PATCH không gửi field rỗng).
      description: "",
      requirements: "",
      benefits: "",
      expiredAt: "",
      // Danh sách job không kèm sẵn jobSkills nên luôn để trống khi sửa —
      // không chọn kỹ năng nào nghĩa là giữ nguyên danh sách hiện tại.
      skillIds: [],
    });
  }, [open, job, reset]);

  const onSubmit = (values: JobFormValues) => {
    const payload = toJobPayload(values);
    if (job) {
      updateJob({ id: job.id, payload }, { onSuccess: () => onOpenChange(false) });
    } else {
      createJob(
        { ...payload, companyId },
        { onSuccess: () => onOpenChange(false) },
      );
    }
  };

  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetContent className="w-full gap-0 sm:max-w-xl">
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="flex h-full flex-col"
        >
          <SheetHeader>
            <SheetTitle>
              {isEditing ? "Cập nhật tin tuyển dụng" : "Tạo tin tuyển dụng"}
            </SheetTitle>
            <SheetDescription>
              Điền thông tin chi tiết để đăng tin tuyển dụng tới ứng viên.
            </SheetDescription>
          </SheetHeader>

          <div className="flex flex-1 flex-col gap-4 overflow-y-auto px-4 pb-4">
            <div className="flex flex-col gap-1.5">
              <Label htmlFor="jobTitle">Tiêu đề</Label>
              <Input
                id="jobTitle"
                placeholder="VD: Senior Node.js Developer"
                aria-invalid={!!errors.title}
                {...register("title")}
              />
              {errors.title && (
                <p className="text-sm text-destructive">
                  {errors.title.message}
                </p>
              )}
            </div>

            <div className="flex flex-col gap-1.5">
              <Label htmlFor="jobCategory">Danh mục ngành nghề</Label>
              <Controller
                name="categoryId"
                control={control}
                render={({ field }) => (
                  <Select value={field.value} onValueChange={field.onChange}>
                    <SelectTrigger id="jobCategory" className="w-full">
                      <SelectValue
                        placeholder={isLoadingCategories ? "Đang tải..." : "Chưa chọn danh mục"}
                      />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="NONE">Chưa chọn danh mục</SelectItem>
                      {categories?.map((category) => (
                        <SelectItem key={category.id} value={String(category.id)}>
                          {category.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                )}
              />
            </div>

            <div className="grid gap-4 sm:grid-cols-2">
              <div className="flex flex-col gap-1.5">
                <Label htmlFor="jobStatus">Trạng thái</Label>
                <Controller
                  name="status"
                  control={control}
                  render={({ field }) => (
                    <Select value={field.value} onValueChange={field.onChange}>
                      <SelectTrigger id="jobStatus" className="w-full">
                        <SelectValue placeholder="Chọn trạng thái" />
                      </SelectTrigger>
                      <SelectContent>
                        {RECRUITER_JOB_STATUSES.map((status) => (
                          <SelectItem key={status} value={status}>
                            {JOB_STATUS_LABEL[status]}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  )}
                />
                {errors.status && (
                  <p className="text-sm text-destructive">
                    {errors.status.message}
                  </p>
                )}
              </div>

              <div className="flex flex-col gap-1.5">
                <Label htmlFor="jobExpiredAt">Hạn nộp hồ sơ</Label>
                <Input
                  id="jobExpiredAt"
                  type="date"
                  {...register("expiredAt")}
                />
                {isEditing && (
                  <p className="text-xs text-muted-foreground">
                    Để trống để giữ nguyên hạn nộp hiện tại.
                  </p>
                )}
              </div>
            </div>

            <div className="grid gap-4 sm:grid-cols-2">
              <div className="flex flex-col gap-1.5">
                <Label htmlFor="jobSalaryMin">Lương tối thiểu (VNĐ)</Label>
                <Input
                  id="jobSalaryMin"
                  inputMode="numeric"
                  placeholder="10000000"
                  aria-invalid={!!errors.salaryMin}
                  {...register("salaryMin")}
                />
                {errors.salaryMin && (
                  <p className="text-sm text-destructive">
                    {errors.salaryMin.message}
                  </p>
                )}
              </div>

              <div className="flex flex-col gap-1.5">
                <Label htmlFor="jobSalaryMax">Lương tối đa (VNĐ)</Label>
                <Input
                  id="jobSalaryMax"
                  inputMode="numeric"
                  placeholder="30000000"
                  aria-invalid={!!errors.salaryMax}
                  {...register("salaryMax")}
                />
                {errors.salaryMax && (
                  <p className="text-sm text-destructive">
                    {errors.salaryMax.message}
                  </p>
                )}
              </div>
            </div>

            <div className="grid gap-4 sm:grid-cols-2">
              <div className="flex flex-col gap-1.5">
                <Label htmlFor="jobProvince">Tỉnh/Thành phố</Label>
                <Input
                  id="jobProvince"
                  placeholder="Hồ Chí Minh"
                  {...register("province")}
                />
              </div>

              <div className="flex flex-col gap-1.5">
                <Label htmlFor="jobAddress">Địa chỉ</Label>
                <Input
                  id="jobAddress"
                  placeholder="123 Nguyễn Huệ"
                  {...register("address")}
                />
              </div>
            </div>

            <div className="flex flex-col gap-1.5">
              <Label>Kỹ năng yêu cầu</Label>
              <Controller
                name="skillIds"
                control={control}
                render={({ field }) => (
                  <div className="flex flex-wrap gap-2">
                    {isLoadingSkills && (
                      <>
                        <Skeleton className="h-6 w-16 rounded-full" />
                        <Skeleton className="h-6 w-20 rounded-full" />
                        <Skeleton className="h-6 w-14 rounded-full" />
                      </>
                    )}
                    {!isLoadingSkills && skills?.length === 0 && (
                      <p className="text-sm text-muted-foreground">
                        Chưa có kỹ năng nào trong hệ thống.
                      </p>
                    )}
                    {skills?.map((skill) => {
                      const selected = (field.value ?? []).includes(skill.id);
                      return (
                        <Badge
                          key={skill.id}
                          variant={selected ? "default" : "outline"}
                          className="cursor-pointer select-none px-3 py-1"
                          onClick={() => {
                            const current = field.value ?? [];
                            field.onChange(
                              selected
                                ? current.filter((id) => id !== skill.id)
                                : [...current, skill.id],
                            );
                          }}
                        >
                          {skill.name}
                        </Badge>
                      );
                    })}
                  </div>
                )}
              />
              {isEditing && (
                <p className="text-xs text-muted-foreground">
                  Không chọn kỹ năng nào nghĩa là giữ nguyên danh sách kỹ
                  năng hiện tại.
                </p>
              )}
            </div>

            {isEditing && (
              <p className="text-xs text-muted-foreground">
                Danh sách tin không kèm sẵn mô tả/yêu cầu/quyền lợi hiện tại
                — để trống các mục dưới đây nếu không muốn thay đổi.
              </p>
            )}

            <div className="flex flex-col gap-1.5">
              <Label htmlFor="jobDescription">Mô tả công việc</Label>
              <Textarea
                id="jobDescription"
                rows={4}
                {...register("description")}
              />
            </div>

            <div className="flex flex-col gap-1.5">
              <Label htmlFor="jobRequirements">Yêu cầu ứng viên</Label>
              <Textarea
                id="jobRequirements"
                rows={4}
                {...register("requirements")}
              />
            </div>

            <div className="flex flex-col gap-1.5">
              <Label htmlFor="jobBenefits">Quyền lợi</Label>
              <Textarea id="jobBenefits" rows={4} {...register("benefits")} />
            </div>
          </div>

          <SheetFooter className="flex-row justify-end">
            <Button
              type="button"
              variant="outline"
              onClick={() => onOpenChange(false)}
              disabled={isPending}
            >
              Hủy
            </Button>
            <Button type="submit" disabled={isPending}>
              {isPending ? (
                <>
                  <Loader2 className="size-4 animate-spin" />
                  Đang lưu...
                </>
              ) : isEditing ? (
                "Lưu thay đổi"
              ) : (
                "Đăng tin"
              )}
            </Button>
          </SheetFooter>
        </form>
      </SheetContent>
    </Sheet>
  );
}
