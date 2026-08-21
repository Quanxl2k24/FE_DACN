"use client";

import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Loader2, ShieldCheck, ShieldOff } from "lucide-react";

import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
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
import { Skeleton } from "@/components/ui/skeleton";
import { Separator } from "@/components/ui/separator";
import { useGetProfile } from "@/features/user/hooks/useGetProfile";
import { useUpdateProfile } from "@/features/user/hooks/useUpdateProfile";
import {
  updateProfileSchema,
  type UpdateProfileFormValues,
} from "@/features/user/schemas/updateProfileSchema";
import type { UserType } from "@/features/auth/types";

const USER_TYPE_LABEL: Record<UserType, string> = {
  APPLICANT: "Ứng viên",
  RECRUITER: "Nhà tuyển dụng",
  ADMIN: "Quản trị viên",
};

function getInitials(fullName: string) {
  return fullName
    .trim()
    .split(/\s+/)
    .slice(-2)
    .map((part) => part[0]?.toUpperCase())
    .join("");
}

export function ProfileInfoCard() {
  const { data: profile, isLoading } = useGetProfile();
  const { mutate: updateProfile, isPending } = useUpdateProfile();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<UpdateProfileFormValues>({
    resolver: zodResolver(updateProfileSchema),
  });

  useEffect(() => {
    if (!profile) return;
    reset({ fullName: profile.fullName ?? "", phone: "" });
  }, [profile, reset]);

  if (isLoading || !profile) {
    return (
      <Card>
        <CardHeader>
          <Skeleton className="h-6 w-40" />
        </CardHeader>
        <CardContent className="flex flex-col gap-4">
          <Skeleton className="h-10 w-full" />
          <Skeleton className="h-10 w-full" />
        </CardContent>
      </Card>
    );
  }

  return (
    <div className="flex flex-col gap-6">
      <Card>
        <CardHeader>
          <div className="flex items-center gap-4">
            <Avatar size="lg">
              <AvatarFallback>
                {getInitials(profile.fullName || profile.email)}
              </AvatarFallback>
            </Avatar>
            <div className="flex flex-col gap-1">
              <CardTitle className="text-lg">
                {profile.fullName || "Chưa cập nhật họ tên"}
              </CardTitle>
              <CardDescription>{profile.email}</CardDescription>
            </div>
          </div>
        </CardHeader>
        <CardContent className="flex flex-col gap-3">
          <div className="flex flex-wrap items-center gap-2">
            <Badge variant="secondary">{USER_TYPE_LABEL[profile.type]}</Badge>
            <Badge variant={profile.mfaEnabled ? "default" : "outline"}>
              {profile.mfaEnabled ? (
                <ShieldCheck />
              ) : (
                <ShieldOff />
              )}
              {profile.mfaEnabled ? "Đã bật xác thực 2 lớp" : "Chưa bật xác thực 2 lớp"}
            </Badge>
          </div>
          <Separator />
          <p className="text-sm text-muted-foreground">
            Thành viên từ{" "}
            {new Date(profile.createdAt).toLocaleDateString("vi-VN")}
          </p>
        </CardContent>
      </Card>

      <Card>
        <form
          noValidate
          onSubmit={handleSubmit((values) => {
            updateProfile({
              fullName: values.fullName,
              phone: values.phone ? values.phone : undefined,
            });
          })}
        >
          <CardHeader>
            <CardTitle>Chỉnh sửa thông tin</CardTitle>
            <CardDescription>
              Cập nhật họ tên và số điện thoại liên hệ của bạn.
            </CardDescription>
          </CardHeader>
          <CardContent className="flex flex-col gap-4">
            <div className="flex flex-col gap-1.5">
              <Label htmlFor="fullName">Họ và tên</Label>
              <Input
                id="fullName"
                aria-invalid={!!errors.fullName}
                {...register("fullName")}
              />
              {errors.fullName && (
                <p className="text-sm text-destructive">
                  {errors.fullName.message}
                </p>
              )}
            </div>

            <div className="flex flex-col gap-1.5">
              <Label htmlFor="phone">Số điện thoại</Label>
              <Input
                id="phone"
                type="tel"
                placeholder="0987654321"
                aria-invalid={!!errors.phone}
                {...register("phone")}
              />
              {errors.phone && (
                <p className="text-sm text-destructive">
                  {errors.phone.message}
                </p>
              )}
            </div>

            <div className="flex flex-col gap-1.5">
              <Label htmlFor="email">Email</Label>
              <Input id="email" value={profile.email} disabled readOnly />
              <p className="text-xs text-muted-foreground">
                Email đăng nhập không thể thay đổi.
              </p>
            </div>

            <Button type="submit" disabled={isPending} className="w-fit">
              {isPending ? (
                <>
                  <Loader2 className="size-4 animate-spin" />
                  Đang lưu...
                </>
              ) : (
                "Lưu thay đổi"
              )}
            </Button>
          </CardContent>
        </form>
      </Card>
    </div>
  );
}
