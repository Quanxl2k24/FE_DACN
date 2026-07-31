# UI/UX Design Specification: Enterprise Recruitment Management System (ATS)

Design a modern, responsive Recruitment Management System (Job Portal) UI with a clean, professional, minimal style similar to LinkedIn Jobs, TopCV, and VietnamWorks.

## Theme & UI Guidelines

- Primary color: #2563EB (Blue)
- Secondary: White, Gray (#F8FAFC)
- Accent: Green (#22C55E)
- Danger/Warning: Red (#EF4444), Yellow (#F59E0B)
- Rounded corners (12px)
- Soft shadows
- Modern typography (Inter)
- Responsive Desktop + Mobile
- Use cards instead of heavy tables whenever appropriate.

## System Roles

1. Candidate (Ứng viên)
2. Employer (Nhà tuyển dụng / Doanh nghiệp)
3. System Admin (Quản trị viên hệ thống)

---

## ====================================================

## AUTHENTICATION & ONBOARDING

## ====================================================

### Landing Page

- Logo
- Navigation bar
- Hero Banner
- Search Job (Quick search)
- Login button
- Register button

### Register Page

When clicking Register, user MUST choose account type first.
Display two large cards:

**Card 1: 👨‍💼 Ứng viên (Candidate)**
Description: Tìm việc và ứng tuyển online.
Button: Tiếp tục với tư cách Ứng viên

**Card 2: 🏢 Nhà tuyển dụng (Employer)**
Description: Đăng tin tuyển dụng và quản lý hồ sơ.
Button: Tiếp tục với tư cách Nhà tuyển dụng

**Register Form Fields:**

- Full Name \*
- Email \*
- Username \*
- Password \*
- Confirm Password \*
- Role: (Read only according to selected card)
- Company Name (Chỉ hiển thị nếu chọn Nhà tuyển dụng) \*

**Validation:**

- Email format, Username unique
- Password minimum 8 characters (Uppercase, Lowercase, Number, Special character)
- Confirm password must match

**Buttons:** Register | Back

### Login Page

Beautiful login page with modern split layout.
**Fields:**

- Email
- Password
- Remember me checkbox
- Forgot Password link
- Login button
- Social Login (Google optional)

_(Logic ngầm: Sau khi login, giải mã JWT Token để tự động redirect về Dashboard tương ứng với Role)._

---

## ====================================================

## CANDIDATE PORTAL (ỨNG VIÊN)

## ====================================================

### Sidebar

- Dashboard
- Profile (Hồ sơ)
- Find Jobs (Tìm việc)
- Applied Jobs (Việc đã ứng tuyển)
- Application Status (Trạng thái đơn)
- Settings & Security (Cài đặt & Bảo mật)
- Logout

### Candidate Dashboard

**Cards:** Applications Submitted | Interview Invitations | Saved Jobs | New Job Recommendations
**Recent Applications:** Timeline of application status (Applied -> Reviewing -> Interview...)

### Profile Management

**Sections:**

- Personal Information
- Education
- Experience
- Skills (Select from predefined tags)
- Certificates
- Upload CV (PDF only)
- Profile Completion Progress Bar
  **Buttons:** Save | Preview Resume

### Job Search & Job Detail

**Top Search Bar & Filters:** Keyword, Location, Industry, Salary Range, Experience, Employment Type.
**Job Card:** Company Logo, Job Title, Company Name, Salary, Location, Posted Date, Apply Button, Favorite Button.

**Job Detail Page:**

- Large header banner
- Company information & Logo
- Job Description, Requirements, Benefits
- Salary & Working Location
- **Apply Button** (Nổi bật)
- **Report Button (Báo cáo vi phạm):** Icon cờ. Khi click mở Modal chọn lý do (Lừa đảo đa cấp, Thu phí trái phép, Nội dung phản cảm...) và Textarea chi tiết.

### Apply Job (Modal)

- Personal Information Review
- Select uploaded CV or Upload new CV
- Cover Letter (Textarea)
- Submit Button

---

## ====================================================

## EMPLOYER PORTAL (NHÀ TUYỂN DỤNG)

## ====================================================

### Sidebar

- Dashboard
- Job Posts (Quản lý tin đăng)
- Candidates (Quản lý ứng viên / ATS)
- Interviews (Lịch phỏng vấn)
- Reports (Báo cáo tuyển dụng)
- Company Profile (Hồ sơ doanh nghiệp)
- Team & Roles (Quản lý Nhân sự & Phân quyền)
- Settings & Security
- Logout

### Employer Dashboard

**Cards:** Active Jobs | Applications | Interviews | Hiring Success Rate | Recent Activities

### Job Management

**List of Jobs:** Hiển thị dạng Card hoặc Bảng tối ưu.
**Actions:** Create Job | Edit | Close Recruitment | View Applicants
**Job Form (Tạo/Sửa tin):** Title, Category, Salary (Min-Max), Location, Job Description, Requirements, Benefits, Deadline, Employment Type, Status (Draft/Published).

### Candidate Management (ATS Pipeline)

**Candidate List:** Avatar, Name, Applied Position, Experience, Education, CV link, Current Status.
**Actions:** View Profile | Download CV | Update Status
**Statuses:** Applied (Mới nộp) -> Screening (Đang lọc) -> Interview (Phỏng vấn) -> Offered (Đề nghị) -> Hired/Rejected.

### Team & Role Management (Fine-Grained RBAC)

**Tab 1: Members (Nhân sự)**

- Table: Avatar | Name | Email | Role | Status | Actions
- Button "Invite Member": Modal nhập Email, chọn Role từ Dropdown, gửi lời mời.

**Tab 2: Roles (Vai trò tùy chỉnh)**

- List of Custom Roles (e.g., Intern HR, Tech Lead).
- Button "Create New Role": Form nhập Role Name, Checkbox list các Permissions (View CV, Post Job, Edit Status...), Nút Save.

---

## ====================================================

## SYSTEM ADMIN PORTAL (QUẢN TRỊ VIÊN HỆ THỐNG)

## ====================================================

### Sidebar

- Dashboard (Thống kê hệ thống)
- Job Reports (Kiểm duyệt Báo cáo vi phạm)
- Tenant Management (Quản lý Doanh nghiệp)
- Master Data (Quản lý dữ liệu nền tảng)
- Logout

### Dashboard & Analytics

**Cards:** Total Users (Seekers vs Employers) | Total Active Jobs | System Revenue | Pending Reports.

### Job Reports (Hậu kiểm)

- Table of reported jobs: Job Title | Company | Reported By | Reason | Date | Actions.
- **Actions:** View Job Detail | Suspend/Takedown (Gỡ bài vi phạm) | Reject Report (Bỏ qua báo cáo sai).

### Tenant Management (Quản lý Doanh nghiệp)

- List of all companies registered on the platform.
- Table: Logo | Company Name | Owner | Active Jobs | Status (Active/Suspended).
- **Actions:** Suspend Company (Đình chỉ), View Details.

### Master Data

- Manage Skills Dictionary: Thêm/Sửa/Xóa các kỹ năng chuẩn (React, Java, Node.js...) để đồng bộ bộ lọc toàn hệ thống.

---

## ====================================================

## COMMON MODULES (DÙNG CHUNG)

## ====================================================

### Settings & Security (Dành cho cả Ứng viên & Nhà tuyển dụng)

- Cập nhật mật khẩu.
- Multi-Factor Authentication (MFA) Toggle.
- **Active Sessions (Quản lý thiết bị):**
  - Danh sách thiết bị đang đăng nhập (VD: Chrome on Windows, Safari on iPhone).
  - Thông tin IP Address, Location, Last Active.
  - Button "Logout from this device" (Đăng xuất từ xa / Thu hồi token).
  - Button "Logout from all other devices".

## ====================================================

## GENERAL DESIGN RULES

## ====================================================

- Use modern dashboard layout (Sidebar fixed, Topbar for user menu/notifications).
- Use Hero sections for landing page.
- Use empty state illustrations for tables without data.
- Use realistic avatars and professional icons (Lucide or Heroicons).
- Interactive elements: Animations on hover, Toast notifications for success/error messages.
- Consistent spacing and clean UX.
- Generate every page connected together.
- Do NOT use placeholder lorem ipsum. Use realistic recruitment data.
- All UI text MUST be in Vietnamese.
- Currency MUST be Vietnamese Dong (VNĐ).
- Locations MUST be real Vietnamese cities/provinces (Hà Nội, TP.HCM, Đà Nẵng...).
