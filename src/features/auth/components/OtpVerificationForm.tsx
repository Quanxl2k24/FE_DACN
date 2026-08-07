"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Loader2 } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useResendOtp } from "@/features/auth/hooks/useResendOtp";
import { useVerifyOtp } from "@/features/auth/hooks/useVerifyOtp";
import { otpSchema, type OtpFormValues } from "@/features/auth/schemas/otpSchema";
import type { IOtpChallenge } from "@/features/auth/types";

interface OtpVerificationFormProps {
  challenge: IOtpChallenge;
  onBack: () => void;
}

export function OtpVerificationForm({
  challenge,
  onBack,
}: OtpVerificationFormProps) {
  const { mutate, isPending } = useVerifyOtp({ onVerifyFailed: onBack });
  const { mutate: resendOtp, isPending: isResending } = useResendOtp();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<OtpFormValues>({
    resolver: zodResolver(otpSchema),
  });

  const onSubmit = (values: OtpFormValues) => {
    mutate({
      pendingVerificationId: challenge.pendingVerificationId,
      otp: values.otp,
    });
  };

  return (
    <form
      noValidate
      onSubmit={handleSubmit(onSubmit)}
      className="flex flex-col gap-4"
    >
      <div className="flex flex-col gap-1.5">
        <div className="flex items-center justify-between">
          <Label htmlFor="otp">Mã xác thực (OTP)</Label>
          <button
            type="button"
            disabled={isResending}
            onClick={() =>
              resendOtp({
                pendingVerificationId: challenge.pendingVerificationId,
              })
            }
            className="text-sm font-medium text-primary hover:underline disabled:pointer-events-none disabled:opacity-50"
          >
            {isResending ? "Đang gửi..." : "Gửi lại mã"}
          </button>
        </div>
        <Input
          id="otp"
          inputMode="numeric"
          autoComplete="one-time-code"
          maxLength={6}
          placeholder="••••••"
          aria-invalid={!!errors.otp}
          {...register("otp")}
        />
        {errors.otp && (
          <p className="text-sm text-destructive">{errors.otp.message}</p>
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
              Đang xác thực...
            </>
          ) : (
            "Xác nhận"
          )}
        </Button>
      </div>
    </form>
  );
}
