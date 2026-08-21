import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Cho phép Next dev server nhận HMR / dev resources tới từ origin ngrok.
  // Thiếu cái này browser sẽ bị "Blocked cross-origin request" và giữ code cũ.
  allowedDevOrigins: ["covetable-unthreateningly-nia.ngrok-free.dev"],
  // Reverse proxy: browser chỉ gọi về FE (same-origin), Next.js chuyển tiếp
  // /api/v1/* tới backend. Giúp ngrok tunnel duy nhất hoạt động mà không
  // gặp Mixed Content / CORS / cookie cross-site.
  async rewrites() {
    const backendUrl = process.env.BACKEND_URL ?? "http://localhost:3000";
    return [
      {
        source: "/api/v1/:path*",
        destination: `${backendUrl}/api/v1/:path*`,
      },
    ];
  },
};

export default nextConfig;
