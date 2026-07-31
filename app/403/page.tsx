import Link from "next/link";

export default function ForbiddenPage() {
  return (
    <div className="flex flex-1 flex-col items-center justify-center gap-4 py-32 text-center">
      <h1 className="text-3xl font-semibold">403 - Không có quyền truy cập</h1>
      <p className="text-zinc-600 dark:text-zinc-400">
        Tài khoản của bạn không có quyền truy cập vào trang này.
      </p>
      <Link href="/" className="font-medium underline underline-offset-4">
        Quay về trang chủ
      </Link>
    </div>
  );
}
