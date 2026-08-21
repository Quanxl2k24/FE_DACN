"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Eye, EyeOff, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useLogin } from "@/features/auth/hooks/useLogin";
import { useAuthStore } from "@/store/useAuthStore";
import type { IOtpChallenge } from "@/features/auth/types";
import {
  loginSchema,
  type LoginFormValues,
} from "@/features/auth/schemas/loginSchema";

interface LoginFormProps {
  onOtpRequired: (challenge: IOtpChallenge) => void;
}

export function LoginForm({ onOtpRequired }: LoginFormProps) {
  const router = useRouter();
  const [showPassword, setShowPassword] = useState(false);
  const { mutate, isPending } = useLogin({ onOtpRequired });

  const isInitialized = useAuthStore((state) => state.isInitialized);
  const isAuthenticated = useAuthStore((state) => state.isAuthenticated);

  // Đã có phiên hợp lệ (khôi phục qua bootstrap /auth/me) -> khỏi cần thấy form login.
  useEffect(() => {
    if (isInitialized && isAuthenticated) {
      router.replace("/");
    }
  }, [isInitialized, isAuthenticated, router]);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormValues>({
    resolver: zodResolver(loginSchema),
  });

  return (
    <form
      noValidate
      onSubmit={handleSubmit((values) => mutate(values))}
      className="flex flex-col gap-4"
    >
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
        <div className="flex items-center justify-between">
          <Label htmlFor="password">Mật khẩu</Label>
          <Link
            href="/forgot-password"
            className="text-sm font-medium text-primary hover:underline"
          >
            Quên mật khẩu?
          </Link>
        </div>
        <div className="relative">
          <Input
            id="password"
            type={showPassword ? "text" : "password"}
            autoComplete="current-password"
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
        {errors.password && (
          <p className="text-sm text-destructive">{errors.password.message}</p>
        )}
      </div>

      <Button type="submit" disabled={isPending} className="mt-2 w-full">
        {isPending ? (
          <>
            <Loader2 className="size-4 animate-spin" />
            Đang đăng nhập...
          </>
        ) : (
          "Đăng nhập"
        )}
      </Button>
    </form>
  );
}
