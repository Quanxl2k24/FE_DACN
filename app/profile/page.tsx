import type { Metadata } from "next";
import ProfilePageContent from "@/features/user/components/ProfilePageContent";

export const metadata: Metadata = {
  title: "Thông tin cá nhân | ATS Platform",
};

export default function ProfilePage() {
  return <ProfilePageContent />;
}
