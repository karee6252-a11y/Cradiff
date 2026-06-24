import type { Metadata } from "next";
import PageHero from "@/components/ui/PageHero";
import CareersSection from "@/components/careers/CareersSection";

export const metadata: Metadata = {
  title: "Careers",
  description:
    "Join Cardiff International School. Explore open teaching and staff positions and apply online to become part of our world-class team.",
};

export default function CareersPage() {
  return (
    <>
      <PageHero
        eyebrow="Careers"
        title={
          <>
            Inspire minds. <span className="text-gradient">Shape futures.</span>
          </>
        }
        subtitle="Be part of a forward-thinking school where your passion for education is valued, nurtured and empowered to thrive."
      />
      <CareersSection />
    </>
  );
}
