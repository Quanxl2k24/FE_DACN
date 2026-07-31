"use client";

import { useState } from "react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

/**
 * BE chưa có endpoint khôi phục mật khẩu (không nằm trong danh sách API đã
 * xác nhận ở AGENTS.md), nên form này CHƯA gọi API thật — chỉ validate email
 * phía client rồi báo cho user biết tính năng sắp ra mắt, tránh giả vờ có
 * một luồng hoạt động mà thực chất không làm gì.
 */
export function ForgotPasswordForm() {
  const [email, setEmail] = useState("");

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    if (!email.includes("@")) {
      toast.error("Email không hợp lệ");
      return;
    }
    toast.info("Tính năng khôi phục mật khẩu sẽ sớm ra mắt");
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-4">
      <div className="flex flex-col gap-1.5">
        <Label htmlFor="email">Email</Label>
        <Input
          id="email"
          type="email"
          autoComplete="email"
          placeholder="ban@congty.com"
          value={email}
          onChange={(event) => setEmail(event.target.value)}
          required
        />
      </div>
      <Button type="submit" className="w-full">
        Gửi yêu cầu khôi phục
      </Button>
    </form>
  );
}
