import type { Metadata } from "next";
import PageHero from "@/components/ui/PageHero";
import GalleryGrid from "@/components/gallery/GalleryGrid";

export const metadata: Metadata = {
  title: "Gallery",
  description:
    "Step inside Cardiff International School — a visual tour of our campus, classrooms, events and the vibrant life of our community.",
};

export default function GalleryPage() {
  return (
    <>
      <PageHero
        eyebrow="Life at CIS"
        title={
          <>
            Moments that <span className="text-gradient">define us</span>
          </>
        }
        subtitle="From the laboratory to the stage, the field to the graduation hall — explore the vibrant spirit of Cardiff International School."
      />
      <section className="mx-auto max-w-7xl px-5 py-12 sm:px-8">
        <GalleryGrid />
      </section>
    </>
  );
}
