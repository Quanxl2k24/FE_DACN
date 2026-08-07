import type { CompanyProfileFormValues } from "@/features/company/schemas/companyProfileSchema";

// Hồ sơ công ty mẫu — thay bằng dữ liệu thật khi có endpoint GET /company/profile.
export const MOCK_COMPANY_PROFILE: CompanyProfileFormValues = {
  companyName: "Công ty TNHH Công nghệ ABC",
  email: "info@abc-tech.vn",
  taxCode: "0312345678",
  companyType: "Công nghệ thông tin",
  size: "50 - 199 nhân viên",
  foundedYear: "2015",
  website: "https://abc-tech.vn",
  phone: "024 3800 1234",
  address: "Tòa nhà Innovation, 123 Đường Láng, Đống Đa, Hà Nội",
  description:
    "ABC Tech là công ty chuyên cung cấp giải pháp phần mềm doanh nghiệp, tập trung vào các sản phẩm ATS, ERP và nền tảng tuyển dụng trực tuyến.",
};

export const MOCK_COMPANY_LOGO_URL: string | null = null;
