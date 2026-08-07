"use client";

import { useEffect, useRef, useState, type ChangeEvent } from "react";
import { Controller, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Building2, Loader2, Plus } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { MOCK_COMPANY_LOGO_URL } from "@/features/company/data/mock";
import { useCreateCompany } from "@/features/company/hooks/useCreateCompany";
import { useUpdateCompany } from "@/features/company/hooks/useUpdateCompany";
import { useUploadCompanyLogo } from "@/features/company/hooks/useUploadCompanyLogo";
import {
  COMPANY_TYPES,
  COMPANY_SIZES,
  companyProfileSchema,
  type CompanyProfileFormValues,
} from "@/features/company/schemas/companyProfileSchema";
import type { ICreateCompanyPayload } from "@/features/company/types";
import { useGetCompany } from "../hooks/useGetCompanyProfile";
import { CompanyHero } from "./CompanyHero";

function toCompanyPayload(
  values: CompanyProfileFormValues,
): ICreateCompanyPayload {
  return {
    name: values.companyName,
    email: values.email,
    taxCode: values.taxCode,
    phone: values.phone,
    address: values.address,
    website: values.website,
    logoUrl: values.logoUrl,
    companyType: values.companyType,
    youndedYear: values.foundedYear ? Number(values.foundedYear) : undefined,
    workforceSize: values.size,
    description: values.description,
  };
}

export function CompanyProfileForm() {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [logoPreview, setLogoPreview] = useState<string | null>(
    MOCK_COMPANY_LOGO_URL,
  );
  const [isCreating, setIsCreating] = useState(false);

  //mount cái là gọi để lấy thông tin trong của côgn ty
  const { data, isLoading } = useGetCompany();
  console.log(data);
  const company = data?.[0];
  const showForm = Boolean(company) || isCreating;
  const { mutate: createCompany, isPending: isCreatingCompany } =
    useCreateCompany();
  const { mutate: updateCompany, isPending: isUpdatingCompany } =
    useUpdateCompany();
  const isPending = isCreatingCompany || isUpdatingCompany;
  const { mutate: uploadLogo, isPending: isUploadingLogo } =
    useUploadCompanyLogo();

  const {
    register,
    control,
    handleSubmit,
    reset,
    watch,
    setValue,
    formState: { errors },
  } = useForm<CompanyProfileFormValues>({
    resolver: zodResolver(companyProfileSchema),
  });

  const companyName = watch("companyName");
  const companyType = watch("companyType");
  const size = watch("size");
  const website = watch("website");
  const address = watch("address");

  useEffect(() => {
    if (!company) return;
    reset({
      companyName: company.name,
      email: company.email ?? "",
      taxCode: company.taxCode ?? "",
      website: company.website ?? "",
      phone: company.phone ?? "",
      address: company.address ?? "",
      description: company.description ?? "",
      logoUrl: company.logoUrl ?? "",
      foundedYear: company.youndedYear ? String(company.youndedYear) : "",
      companyType: company.companyType as
        | CompanyProfileFormValues["companyType"]
        | undefined,
      size: company.workforceSize as
        | CompanyProfileFormValues["size"]
        | undefined,
    });
    if (company.logoUrl) setLogoPreview(company.logoUrl);
  }, [company, reset]);

  const handleLogoChange = (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;
    setLogoPreview((prev) => {
      if (prev) URL.revokeObjectURL(prev);
      return URL.createObjectURL(file);
    });
    uploadLogo(file, {
      onSuccess: (url) => {
        setValue("logoUrl", url);
      },
    });
    // Cho phép chọn lại đúng file vừa upload lỗi mà không bị bỏ qua do value không đổi.
    event.target.value = "";
  };

  return (
    <form
      noValidate
      onSubmit={handleSubmit((values) => {
        if (isUploadingLogo) return;
        const payload = toCompanyPayload(values);
        if (company) {
          updateCompany({ id: company.id, payload });
        } else {
          createCompany(payload, {
            onSuccess: () => setIsCreating(false),
          });
        }
      })}
    >
      {!isLoading && !showForm && (
        <Card className="items-center border-dashed py-12 text-center">
          <CardContent className="flex flex-col items-center gap-3">
            <div className="flex size-12 items-center justify-center rounded-full bg-muted">
              <Building2 className="size-6 text-muted-foreground" />
            </div>
            <div>
              <p className="font-medium">Bạn chưa có công ty nào</p>
              <p className="text-sm text-muted-foreground">
                Tạo hồ sơ công ty để bắt đầu đăng tin tuyển dụng.
              </p>
            </div>
            <Button type="button" onClick={() => setIsCreating(true)}>
              <Plus /> Thêm công ty của bạn
            </Button>
          </CardContent>
        </Card>
      )}

      {!isLoading && showForm && (
        <div className="flex flex-col gap-6">
          <CompanyHero
            company={{
              id: company?.id ?? "",
              name: companyName || company?.name || "",
              logoUrl: logoPreview ?? "",
              bannerUrl: "",
              companyType: companyType ?? "",
              employeeCount: size ?? "",
              location: address ?? company?.address ?? "",
              website: website ?? company?.website ?? "",
              badges: [],
            }}
            editable
            isUploadingLogo={isUploadingLogo}
            onEditLogo={() => fileInputRef.current?.click()}
          />
          <span className="-mt-4 text-xs text-muted-foreground">
            {isUploadingLogo
              ? "Đang tải logo lên..."
              : "PNG hoặc JPG, tối đa 2MB. Bấm vào logo để thay đổi."}
          </span>
          <input
            ref={fileInputRef}
            type="file"
            accept="image/png,image/jpeg"
            className="hidden"
            onChange={handleLogoChange}
          />
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle>Thông tin công ty</CardTitle>
                <div className="flex items-center gap-2">
                  {!company && (
                    <Button
                      type="button"
                      variant="outline"
                      disabled={isPending || isUploadingLogo}
                      onClick={() => {
                        setIsCreating(false);
                        reset();
                      }}
                    >
                      Hủy
                    </Button>
                  )}
                  <Button type="submit" disabled={isPending || isUploadingLogo}>
                    {isPending ? (
                      <>
                        <Loader2 className="size-4 animate-spin" />
                        Đang lưu...
                      </>
                    ) : isUploadingLogo ? (
                      <>
                        <Loader2 className="size-4 animate-spin" />
                        Đang tải logo...
                      </>
                    ) : company ? (
                      "Lưu thay đổi"
                    ) : (
                      "Tạo công ty"
                    )}
                  </Button>
                </div>
              </div>

              <CardDescription>
                Thông tin này sẽ hiển thị công khai với ứng viên.
              </CardDescription>
            </CardHeader>
            <CardContent className="flex flex-col gap-4">
              <div className="grid gap-4 sm:grid-cols-2">
                <div className="flex flex-col gap-1.5">
                  <Label htmlFor="companyName">Tên công ty</Label>
                  <Input
                    id="companyName"
                    aria-invalid={!!errors.companyName}
                    {...register("companyName")}
                  />
                  {errors.companyName && (
                    <p className="text-sm text-destructive">
                      {errors.companyName.message}
                    </p>
                  )}
                </div>

                <div className="flex flex-col gap-1.5">
                  <Label htmlFor="taxCode">Mã số thuế</Label>
                  <Input
                    id="taxCode"
                    aria-invalid={!!errors.taxCode}
                    {...register("taxCode")}
                  />
                  {errors.taxCode && (
                    <p className="text-sm text-destructive">
                      {errors.taxCode.message}
                    </p>
                  )}
                </div>
              </div>

              <div className="grid gap-4 sm:grid-cols-2">
                <div className="flex flex-col gap-1.5">
                  <Label htmlFor="email">Email công ty</Label>
                  <Input
                    id="email"
                    type="email"
                    aria-invalid={!!errors.email}
                    {...register("email")}
                  />
                  {errors.email && (
                    <p className="text-sm text-destructive">
                      {errors.email.message}
                    </p>
                  )}
                </div>

                <div className="flex flex-col gap-1.5">
                  <Label htmlFor="phone">Số điện thoại</Label>
                  <Input id="phone" {...register("phone")} />
                </div>
              </div>

              <div className="grid gap-4 sm:grid-cols-2">
                <div className="flex flex-col gap-1.5">
                  <Label htmlFor="companyType">Ngành nghề</Label>
                  <Controller
                    name="companyType"
                    control={control}
                    render={({ field }) => (
                      <Select
                        value={field.value}
                        onValueChange={field.onChange}
                      >
                        <SelectTrigger
                          id="companyType"
                          className="w-full"
                          aria-invalid={!!errors.companyType}
                        >
                          <SelectValue placeholder="Chọn ngành nghề" />
                        </SelectTrigger>
                        <SelectContent>
                          {COMPANY_TYPES.map((companyType) => (
                            <SelectItem key={companyType} value={companyType}>
                              {companyType}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    )}
                  />
                  {errors.companyType && (
                    <p className="text-sm text-destructive">
                      {errors.companyType.message}
                    </p>
                  )}
                </div>

                <div className="flex flex-col gap-1.5">
                  <Label htmlFor="size">Quy mô công ty</Label>
                  <Controller
                    name="size"
                    control={control}
                    render={({ field }) => (
                      <Select
                        value={field.value}
                        onValueChange={field.onChange}
                      >
                        <SelectTrigger
                          id="size"
                          className="w-full"
                          aria-invalid={!!errors.size}
                        >
                          <SelectValue placeholder="Chọn quy mô" />
                        </SelectTrigger>
                        <SelectContent>
                          {COMPANY_SIZES.map((size) => (
                            <SelectItem key={size} value={size}>
                              {size}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    )}
                  />
                  {errors.size && (
                    <p className="text-sm text-destructive">
                      {errors.size.message}
                    </p>
                  )}
                </div>
              </div>

              <div className="grid gap-4 sm:grid-cols-2">
                <div className="flex flex-col gap-1.5">
                  <Label htmlFor="foundedYear">Năm thành lập</Label>
                  <Input
                    id="foundedYear"
                    inputMode="numeric"
                    placeholder="2015"
                    aria-invalid={!!errors.foundedYear}
                    {...register("foundedYear")}
                  />
                  {errors.foundedYear && (
                    <p className="text-sm text-destructive">
                      {errors.foundedYear.message}
                    </p>
                  )}
                </div>

                <div className="flex flex-col gap-1.5">
                  <Label htmlFor="website">Website</Label>
                  <Input
                    id="website"
                    placeholder="https://congty.vn"
                    aria-invalid={!!errors.website}
                    {...register("website")}
                  />
                  {errors.website && (
                    <p className="text-sm text-destructive">
                      {errors.website.message}
                    </p>
                  )}
                </div>
              </div>

              <div className="flex flex-col gap-1.5">
                <Label htmlFor="address">Địa chỉ</Label>
                <Input
                  id="address"
                  aria-invalid={!!errors.address}
                  {...register("address")}
                />
                {errors.address && (
                  <p className="text-sm text-destructive">
                    {errors.address.message}
                  </p>
                )}
              </div>

              <div className="flex flex-col gap-1.5">
                <Label htmlFor="description">Giới thiệu công ty</Label>
                <Textarea
                  id="description"
                  rows={5}
                  placeholder="Giới thiệu ngắn gọn về công ty, lĩnh vực hoạt động, văn hóa doanh nghiệp..."
                  aria-invalid={!!errors.description}
                  {...register("description")}
                />
                {errors.description && (
                  <p className="text-sm text-destructive">
                    {errors.description.message}
                  </p>
                )}
              </div>
            </CardContent>
          </Card>
        </div>
      )}
    </form>
  );
}
