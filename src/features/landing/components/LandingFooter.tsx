import Link from "next/link";
import {
  BriefcaseBusiness,
  Globe,
  Mail,
  MessageCircle,
  Phone,
  Share2,
} from "lucide-react";

const FOOTER_COLUMNS = [
  {
    title: "Dành cho ứng viên",
    links: ["Tìm việc làm", "Tạo hồ sơ CV", "Cẩm nang nghề nghiệp", "Đánh giá công ty"],
  },
  {
    title: "Dành cho nhà tuyển dụng",
    links: ["Đăng tin tuyển dụng", "Tìm kiếm hồ sơ", "Giải pháp ATS", "Bảng giá dịch vụ"],
  },
  {
    title: "Về chúng tôi",
    links: ["Giới thiệu", "Tuyển dụng nội bộ", "Điều khoản dịch vụ", "Chính sách bảo mật"],
  },
];

export function LandingFooter() {
  return (
    <footer id="footer" className="border-t border-border bg-secondary">
      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="grid gap-10 lg:grid-cols-[1.4fr_1fr_1fr_1fr]">
          <div>
            <div className="flex items-center gap-2">
              <span className="flex size-9 items-center justify-center rounded-lg bg-primary text-primary-foreground">
                <BriefcaseBusiness className="size-5" />
              </span>
              <span className="text-lg font-semibold">ATS Platform</span>
            </div>
            <p className="mt-4 max-w-xs text-sm text-muted-foreground">
              Nền tảng quản lý tuyển dụng doanh nghiệp, kết nối ứng viên và nhà
              tuyển dụng trên khắp Việt Nam.
            </p>
            <div className="mt-4 flex flex-col gap-2 text-sm text-muted-foreground">
              <span className="flex items-center gap-2">
                <Mail className="size-4" /> lienhe@atsplatform.vn
              </span>
              <span className="flex items-center gap-2">
                <Phone className="size-4" /> 1900 6868
              </span>
            </div>
            <div className="mt-4 flex items-center gap-3">
              {[Globe, MessageCircle, Share2].map((Icon, index) => (
                <span
                  key={index}
                  className="flex size-9 items-center justify-center rounded-lg bg-background text-muted-foreground ring-1 ring-border transition-colors hover:text-primary"
                >
                  <Icon className="size-4" />
                </span>
              ))}
            </div>
          </div>

          {FOOTER_COLUMNS.map((column) => (
            <div key={column.title}>
              <p className="text-sm font-semibold text-foreground">
                {column.title}
              </p>
              <ul className="mt-4 flex flex-col gap-3">
                {column.links.map((link) => (
                  <li key={link}>
                    <Link
                      href="#"
                      className="text-sm text-muted-foreground transition-colors hover:text-foreground"
                    >
                      {link}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="mt-10 border-t border-border pt-6 text-center text-sm text-muted-foreground">
          © {new Date().getFullYear()} ATS Platform. Bảo lưu mọi quyền.
        </div>
      </div>
    </footer>
  );
}
