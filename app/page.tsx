import { CategorySection } from "@/features/landing/components/CategorySection";
import { EmployerCta } from "@/features/landing/components/EmployerCta";
import { FeaturedCompanies } from "@/features/landing/components/FeaturedCompanies";
import { FeaturedJobs } from "@/features/landing/components/FeaturedJobs";
import { HeroSection } from "@/features/landing/components/HeroSection";
import { LandingFooter } from "@/features/landing/components/LandingFooter";
import { LandingNavbar } from "@/features/landing/components/LandingNavbar";

export default function Home() {
  return (
    <>
      <LandingNavbar />
      <main className="flex-1">
        <HeroSection />
        <CategorySection />
        <FeaturedJobs />
        <FeaturedCompanies />
        <EmployerCta />
      </main>
      <LandingFooter />
    </>
  );
}
