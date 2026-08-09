/** Trạng thái tin tuyển dụng. `SUSPENDED` chỉ do Admin gán qua xử lý báo cáo vi phạm. */
export type JobStatus = "DRAFT" | "PUBLISHED" | "CLOSED" | "SUSPENDED";

/** Trạng thái Recruiter được phép tự đặt khi tạo/sửa tin. */
export type RecruiterJobStatus = Exclude<JobStatus, "SUSPENDED">;

export interface IJobCompany {
  id?: string;
  name: string;
  logoUrl: string | null;
  /** Chỉ có trong GET /jobs/jobdetail/:id, danh sách rút gọn không trả. */
  address?: string | null;
  website?: string | null;
  description?: string | null;
  email?: string | null;
  phone?: string | null;
}

/** Item trong danh sách GET /jobs/manage/:companyId. */
export interface IJobListItem {
  id: string;
  title: string;
  salaryMin: number | null;
  salaryMax: number | null;
  address: string | null;
  province: string | null;
  createdAt: string;
  status: JobStatus;
  expiredAt: string | null;
  company: IJobCompany;
  _count: { applications: number };
  /** null nếu job chưa gán danh mục. */
  category?: IJobCategoryRef | null;
}

/** Shape chưa được BE xác nhận chi tiết, `jobSkills` hiện luôn trả rỗng trong ví dụ mẫu. */
export interface IJobSkill {
  skillId: number;
  skill?: { id: number; name: string };
}

/** Item trong danh mục GET /skills/list-skill. */
export interface ISkill {
  id: number;
  name: string;
  createdAt: string;
  updatedAt: string;
}

/** Response đầy đủ của tạo/sửa tin (POST /jobs, PATCH /jobs/:id) và GET /jobs/jobdetail/:id. */
export interface IJob {
  id: string;
  companyId: string;
  createdBy: string;
  jobCategoryId: number | null;
  title: string;
  status: JobStatus;
  salaryMin: number | null;
  salaryMax: number | null;
  description: string | null;
  requirements: string | null;
  benefits: string | null;
  expiredAt: string | null;
  address: string | null;
  province: string | null;
  createdAt: string;
  updatedAt: string;
  deletedAt: string | null;
  company: IJobCompany;
  jobSkills: IJobSkill[];
  /** Chỉ có trong GET /jobs/jobdetail/:id — null nếu job chưa gán danh mục. */
  category?: IJobCategoryRef | null;
}

export interface ICursorPagination {
  nextCursor: string | null;
  hasMore: boolean;
}

export interface IPaginatedResponse<T> {
  data: T[];
  pagination: ICursorPagination;
}

export interface IJobFilters {
  keyword?: string;
  status?: JobStatus;
  salaryFrom?: number;
  salaryTo?: number;
  province?: string;
  skillIds?: number[];
  sort?: "salary_asc" | "salary_desc";
  take?: number;
  categoryId?: number;
}

export interface ICreateJobPayload {
  title: string;
  companyId: string;
  status?: RecruiterJobStatus;
  salaryMin?: number;
  salaryMax?: number;
  address?: string;
  province?: string;
  description?: string;
  requirements?: string;
  benefits?: string;
  /** ISO date string. */
  expiredAt?: string;
  skillIds?: number[];
  categoryId?: number;
}

export type IUpdateJobPayload = Partial<Omit<ICreateJobPayload, "companyId">>;

/** Item trong danh mục GET /job-categories — chỉ trả category active, sắp theo name asc. */
export interface IJobCategory {
  id: number;
  name: string;
  active: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface ICreateJobCategoryPayload {
  name: string;
}

export interface IUpdateJobCategoryPayload {
  name?: string;
  active?: boolean;
}

/** Category rút gọn gắn kèm trong job (list/detail) — null nếu job chưa gán danh mục. */
export interface IJobCategoryRef {
  id: number;
  name: string;
}

/** Item trong danh sách GET /jobs (public, không cần đăng nhập). */
export interface IPublicJobListItem {
  id: string;
  title: string;
  salaryMin: number | null;
  salaryMax: number | null;
  address: string | null;
  province: string | null;
  createdAt: string;
  company: { name: string; logoUrl: string | null };
  category: IJobCategoryRef | null;
}

export interface IPublicJobFilters {
  keyword?: string;
  skillIds?: number[];
  salaryFrom?: number;
  salaryTo?: number;
  province?: string;
  sort?: "salary_asc" | "salary_desc";
  take?: number;
  categoryId?: number;
}
