import type { LucideIcon } from "lucide-react";
import {
  BriefcaseBusiness,
  Calculator,
  Code2,
  Headset,
  LineChart,
  Megaphone,
  Palette,
  UsersRound,
} from "lucide-react";

export interface JobCategory {
  name: string;
  icon: LucideIcon;
  jobCount: number;
}

export const jobCategories: JobCategory[] = [
  { name: "Công nghệ thông tin", icon: Code2, jobCount: 1420 },
  { name: "Kinh doanh / Bán hàng", icon: LineChart, jobCount: 986 },
  { name: "Marketing", icon: Megaphone, jobCount: 612 },
  { name: "Kế toán / Kiểm toán", icon: Calculator, jobCount: 458 },
  { name: "Nhân sự", icon: UsersRound, jobCount: 337 },
  { name: "Thiết kế", icon: Palette, jobCount: 291 },
  { name: "Chăm sóc khách hàng", icon: Headset, jobCount: 264 },
  { name: "Vận hành / Sản xuất", icon: BriefcaseBusiness, jobCount: 503 },
];

export interface FeaturedJob {
  id: string;
  title: string;
  company: string;
  companyInitial: string;
  location: string;
  salaryFrom: number;
  salaryTo: number;
  employmentType: string;
  postedAgo: string;
  tags: string[];
}

export const featuredJobs: FeaturedJob[] = [
  {
    id: "1",
    title: "Frontend Developer (ReactJS)",
    company: "Công ty CP Giải pháp Công nghệ Sao Việt",
    companyInitial: "SV",
    location: "Hà Nội",
    salaryFrom: 18000000,
    salaryTo: 28000000,
    employmentType: "Toàn thời gian",
    postedAgo: "2 ngày trước",
    tags: ["ReactJS", "TypeScript", "TailwindCSS"],
  },
  {
    id: "2",
    title: "Chuyên viên Tuyển dụng (HR Recruiter)",
    company: "Tập đoàn Nhân lực Phương Nam",
    companyInitial: "PN",
    location: "TP. Hồ Chí Minh",
    salaryFrom: 12000000,
    salaryTo: 18000000,
    employmentType: "Toàn thời gian",
    postedAgo: "5 giờ trước",
    tags: ["Tuyển dụng", "C&B", "HRIS"],
  },
  {
    id: "3",
    title: "Backend Developer (NodeJS/NestJS)",
    company: "Công ty TNHH Công nghệ Đại Dương Xanh",
    companyInitial: "ĐD",
    location: "Đà Nẵng",
    salaryFrom: 20000000,
    salaryTo: 32000000,
    employmentType: "Toàn thời gian",
    postedAgo: "1 ngày trước",
    tags: ["NestJS", "PostgreSQL", "Docker"],
  },
  {
    id: "4",
    title: "Kế toán tổng hợp",
    company: "Công ty CP Bán lẻ VinaMart",
    companyInitial: "VM",
    location: "Hải Phòng",
    salaryFrom: 10000000,
    salaryTo: 15000000,
    employmentType: "Toàn thời gian",
    postedAgo: "3 ngày trước",
    tags: ["Kế toán", "Excel", "Misa"],
  },
  {
    id: "5",
    title: "Digital Marketing Executive",
    company: "Công ty CP Truyền thông Ánh Dương",
    companyInitial: "AD",
    location: "TP. Hồ Chí Minh",
    salaryFrom: 13000000,
    salaryTo: 20000000,
    employmentType: "Toàn thời gian",
    postedAgo: "6 ngày trước",
    tags: ["SEO", "Facebook Ads", "Content"],
  },
  {
    id: "6",
    title: "UI/UX Designer",
    company: "Công ty TNHH Thiết kế Sáng Tạo Việt",
    companyInitial: "ST",
    location: "Cần Thơ",
    salaryFrom: 15000000,
    salaryTo: 25000000,
    employmentType: "Bán thời gian",
    postedAgo: "12 giờ trước",
    tags: ["Figma", "Design System"],
  },
];

export const featuredCompanies = [
  { name: "Sao Việt Technology", initial: "SV" },
  { name: "Phương Nam Group", initial: "PN" },
  { name: "Đại Dương Xanh", initial: "ĐD" },
  { name: "VinaMart Retail", initial: "VM" },
  { name: "Ánh Dương Media", initial: "AD" },
  { name: "Sáng Tạo Việt", initial: "ST" },
];

export function formatSalary(value: number) {
  return `${(value / 1000000).toLocaleString("vi-VN")} triệu`;
}
