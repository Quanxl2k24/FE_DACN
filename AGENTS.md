# AI Agent Instructions: Enterprise Recruitment Management System (ATS)

## 1. Project Overview

You are working on an Enterprise-grade Recruitment Management System (Job Portal / ATS). This is a Multi-Tenant platform with Fine-Grained Role-Based Access Control (RBAC) combined with Attribute-Based Access Control (ABAC) for data isolation.

**Key Domains:**

- **Auth & Security:** Strict Cookie-based Authentication (httpOnly). Refresh Token Rotation, Device/Session Management.
- **Tenant Management:** Company creation, Custom Roles, Permissions, Invitations. User types include `APPLICANT` and `RECRUITER`.
- **Job Pipeline:** Post-moderation, ElasticSearch sync via Message Queue.
- **ATS Pipeline:** CV Upload, CV Parsing (JSONB), Application Status tracking (Audit logs).

---

## 2. Tech Stack

| Layer                | Technology                   | Key Usage                                            |
| :------------------- | :--------------------------- | :--------------------------------------------------- |
| **Frontend**         | Next.js (App Router), React  | SEO optimization, Server-Side Rendering (SSR).       |
| **State & Fetching** | Zustand, TanStack Query      | Global state for User data (NO TOKENS), API caching. |
| **UI & Styling**     | Tailwind CSS, Shadcn UI      | Modern, responsive, accessible components.           |
| **Backend**          | NestJS (Node.js)             | Modular architecture, Guards for RBAC/ABAC.          |
| **Database & ORM**   | PostgreSQL, Prisma           | ACID compliance, JSONB for CV parsing, Soft deletes. |
| **Search & Queue**   | Elasticsearch, Redis, BullMQ | Full-text search, async tasks (email, sync).         |

---

## 3. Backend (NestJS) Coding Guidelines

### 3.1. Architecture & Structure

- Strictly follow the **Domain-Driven Design (Modular)** approach.
- **Config Management:** Never use `process.env` directly in modules. Always use `@nestjs/config` with strict **Joi** validation (Fail-fast principle).

### 3.2. Security & Cookie-Based Auth (CRITICAL)

- **Cookies over Headers:** Tokens (`accessToken`, `refreshToken`, `deviceId`) MUST be set via HTTP-only, secure cookies using `@Res({ passthrough: true })`. **NEVER return tokens in the JSON response body.**
- **Guards:** Use `AccessTokenGuard` for protected routes and `RefreshTokenGuard` strictly for the `/refresh` and `/logout` endpoints.
- **RBAC + ABAC:** User roles are defined by the `type` enum (`APPLICANT` | `RECRUITER` | `ADMIN`). When a `RECRUITER` accesses company resources, ALWAYS enforce ABAC: `User.CompanyId == Resource.CompanyId`.

---

## 4. Frontend (Next.js) Coding Guidelines

### 4.1. Axios & Interceptors (CRITICAL)

- **Configuration:** The Axios instance MUST be configured with `withCredentials: true`.
- **NO Headers:** DO NOT manually attach `Authorization: Bearer <token>` in the Request Interceptor. The browser handles cookies automatically.
- **Refresh Token Rotation:** On a `401 Unauthorized` response:
  1. Pause subsequent requests and add them to a Queue.
  2. Silently call `POST /api/v1/auth/refresh` (browser will send the refresh token cookie).
  3. If successful, replay the queued requests.
  4. If failed, call `clearAuth()`, clear React Query cache, and redirect to `/login`.

### 4.2. State Management (Zustand)

- **Zustand Auth Store:** Only store user details (`id, email, fullName, type`). **DO NOT store any tokens** in Zustand or LocalStorage.

### 4.3. UI/UX Rules

- Group files by Feature-Sliced Design (`src/features/...`).
- Text must be in Vietnamese. Currency is VNĐ.
- Provide clear visual feedback (Toast notifications, loading spinners) for all mutations.

---

## 5. Database (Prisma + PostgreSQL) Guidelines

- **Naming Conventions:** Use `@map` for columns (snake_case in DB) and `@@map` for tables. Example: `createdAt DateTime @map("created_at")`.
- **Primary Keys:** Always use `UUIDv4` for primary keys.
- **Soft Delete:** NEVER hard delete records. Use `deletedAt DateTime? @map("deleted_at")` and filter out deleted records in queries.
- **JSONB:** Use Prisma's `Json` type for unstructured data (e.g., `parsedData` in resumes).
- **Transactions:** Use Prisma `$transaction` for any multi-step write operations to ensure ACID compliance.

> **AI Instruction:** Read this entire document before generating code. Prioritize security (Cookie-based auth), data isolation, and performance. Do not hallucinate APIs; strictly follow the defined endpoints.
