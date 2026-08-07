export interface ICompany {
    id: string;
    name: string;
    taxCode?: string | null;
    email?: string | null;
    phone?: string | null;
    address?: string | null;
    website?: string | null;
    logoUrl?: string | null;
    companyType?: string | null;
    youndedYear?: number | null;
    workforceSize?: string | null;
    description?: string | null;
    status: string;
}

export interface ICreateCompanyPayload {
    name: string;
    taxCode: string;
    email: string;
    phone?: string;
    address: string;
    website?: string;
    logoUrl?: string;
    companyType: string;
    youndedYear?: number;
    workforceSize?: string;
    description?: string;
}

export type IUpdateCompanyPayload = Partial<ICreateCompanyPayload>;

export interface ICompanyMember {
    id: string;
    fullName: string;
    email: string;
    role: string;
    status: "ACTIVE" | "PENDING";
    avatarUrl?: string | null;
}

