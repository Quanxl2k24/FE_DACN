"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Building2, Eye, EyeOff, Loader2, UserRound } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useRegister } from "@/features/auth/hooks/useRegister";
import type { RegisterRole } from "@/features/auth/types";
import {
  registerSchema,
  type RegisterFormValues,
} from "@/features/auth/schemas/registerSchema";

interface RegisterFormProps {
  role: RegisterRole;
  onBack: () => void;
}

const ROLE_LABEL: Record<RegisterRole, string> = {
  APPLICANT: "Ứng viên",
  RECRUITER: "Nhà tuyển dụng",
};

const RoleIcon = { APPLICANT: UserRound, RECRUITER: Building2 } as const;

export function RegisterForm({ role, onBack }: RegisterFormProps) {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const { mutate, isPending } = useRegister();
  const Icon = RoleIcon[role];

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<RegisterFormValues>({
    resolver: zodResolver(registerSchema),
    defaultValues: { role, fullName: "", email: "", username: "", password: "", confirmPassword: "", companyName: "" },
  });

  const onSubmit = (values: RegisterFormValues) => {
    mutate({
      fullName: values.fullName,
      email: values.email,
      username: values.username,
      password: values.password,
      type: values.role,
      companyName: values.role === "RECRUITER" ? values.companyName : undefined,
    });
  };

  return (
    <form
      noValidate
      onSubmit={handleSubmit(onSubmit)}
      className="flex flex-col gap-4"
    >
      <div className="flex items-center justify-between rounded-lg bg-muted px-3 py-2">
        <span className="flex items-center gap-2 text-sm font-medium text-foreground">
          <Icon className="size-4 text-primary" />
          Đăng ký với vai trò: {ROLE_LABEL[role]}
        </span>
        <button
          type="button"
          onClick={onBack}
          className="text-sm font-medium text-primary hover:underline"
        >
          Đổi vai trò
        </button>
      </div>

      <div className="flex flex-col gap-1.5">
        <Label htmlFor="fullName">Họ và tên</Label>
        <Input
          id="fullName"
          autoComplete="name"
          placeholder="Nguyễn Văn A"
          aria-invalid={!!errors.fullName}
          {...register("fullName")}
        />
        {errors.fullName && (
          <p className="text-sm text-destructive">{errors.fullName.message}</p>
        )}
      </div>

      <div className="flex flex-col gap-1.5">
        <Label htmlFor="email">Email</Label>
        <Input
          id="email"
          type="email"
          autoComplete="email"
          placeholder="ban@congty.com"
          aria-invalid={!!errors.email}
          {...register("email")}
        />
        {errors.email && (
          <p className="text-sm text-destructive">{errors.email.message}</p>
        )}
      </div>

      <div className="flex flex-col gap-1.5">
        <Label htmlFor="username">Tên đăng nhập</Label>
        <Input
          id="username"
          autoComplete="username"
          placeholder="nguyenvana"
          aria-invalid={!!errors.username}
          {...register("username")}
        />
        {errors.username && (
          <p className="text-sm text-destructive">{errors.username.message}</p>
        )}
      </div>

      {role === "RECRUITER" && (
        <div className="flex flex-col gap-1.5">
          <Label htmlFor="companyName">Tên công ty</Label>
          <Input
            id="companyName"
            autoComplete="organization"
            placeholder="Công ty TNHH ABC"
            aria-invalid={!!errors.companyName}
            {...register("companyName")}
          />
          {errors.companyName && (
            <p className="text-sm text-destructive">
              {errors.companyName.message}
            </p>
          )}
        </div>
      )}

      <div className="flex flex-col gap-1.5">
        <Label htmlFor="password">Mật khẩu</Label>
        <div className="relative">
          <Input
            id="password"
            type={showPassword ? "text" : "password"}
            autoComplete="new-password"
            placeholder="••••••••"
            aria-invalid={!!errors.password}
            className="pr-9"
            {...register("password")}
          />
          <button
            type="button"
            onClick={() => setShowPassword((prev) => !prev)}
            aria-label={showPassword ? "Ẩn mật khẩu" : "Hiện mật khẩu"}
            className="absolute inset-y-0 right-0 flex items-center px-2.5 text-muted-foreground hover:text-foreground"
          >
            {showPassword ? (
              <EyeOff className="size-4" />
            ) : (
              <Eye className="size-4" />
            )}
          </button>
        </div>
        {errors.password ? (
          <p className="text-sm text-destructive">{errors.password.message}</p>
        ) : (
          <p className="text-xs text-muted-foreground">
            Tối thiểu 8 ký tự, gồm chữ hoa, chữ thường, số và ký tự đặc biệt.
          </p>
        )}
      </div>

      <div className="flex flex-col gap-1.5">
        <Label htmlFor="confirmPassword">Xác nhận mật khẩu</Label>
        <div className="relative">
          <Input
            id="confirmPassword"
            type={showConfirmPassword ? "text" : "password"}
            autoComplete="new-password"
            placeholder="••••••••"
            aria-invalid={!!errors.confirmPassword}
            className="pr-9"
            {...register("confirmPassword")}
          />
          <button
            type="button"
            onClick={() => setShowConfirmPassword((prev) => !prev)}
            aria-label={showConfirmPassword ? "Ẩn mật khẩu" : "Hiện mật khẩu"}
            className="absolute inset-y-0 right-0 flex items-center px-2.5 text-muted-foreground hover:text-foreground"
          >
            {showConfirmPassword ? (
              <EyeOff className="size-4" />
            ) : (
              <Eye className="size-4" />
            )}
          </button>
        </div>
        {errors.confirmPassword && (
          <p className="text-sm text-destructive">
            {errors.confirmPassword.message}
          </p>
        )}
      </div>

      <div className="mt-2 flex gap-3">
        <Button
          type="button"
          variant="outline"
          className="flex-1"
          onClick={onBack}
        >
          Quay lại
        </Button>
        <Button type="submit" disabled={isPending} className="flex-1">
          {isPending ? (
            <>
              <Loader2 className="size-4 animate-spin" />
              Đang đăng ký...
            </>
          ) : (
            "Đăng ký"
          )}
        </Button>
      </div>
    </form>
  );
}
