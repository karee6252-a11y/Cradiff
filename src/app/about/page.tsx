import type { Metadata } from "next";
import Image from "next/image";
import PageHero from "@/components/ui/PageHero";
import SectionHeading from "@/components/ui/SectionHeading";
import Reveal, { StaggerGroup, StaggerItem } from "@/components/ui/Reveal";
import Icon from "@/components/ui/Icon";
import Timeline from "@/components/about/Timeline";
import Leadership from "@/components/about/Leadership";
import { VALUES } from "@/lib/site";

export const metadata: Metadata = {
  title: "About Us",
  description:
    "Discover the story, vision and people behind Cardiff International School — two decades of academic excellence and global character education.",
};

export default function AboutPage() {
  return (
    <>
      <PageHero
        eyebrow="Our Identity"
        title={
          <>
            Two decades of <span className="text-gradient">excellence</span>
          </>
        }
        subtitle="Cardiff International School is more than a place of learning — it is a community built on ambition, integrity and genuine care for every student."
      />

      {/* Intro split */}
      <section className="mx-auto max-w-7xl px-5 py-12 sm:px-8 sm:py-16">
        <div className="grid items-center gap-10 sm:gap-12 lg:grid-cols-2">
          <Reveal direction="right">
            <div className="relative aspect-[4/3] overflow-hidden rounded-3xl glass-strong shadow-glow">
              <Image
                src="https://images.unsplash.com/photo-1562774053-701939374585?auto=format&fit=crop&w=1000&q=80"
                alt="Cardiff International School campus"
                fill
                className="object-cover"
                sizes="(max-width: 1024px) 100vw, 50vw"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
            </div>
          </Reveal>
          <div className="flex flex-col gap-5">
            <Reveal>
              <h2 className="text-3xl font-bold sm:text-4xl">
                Where ambition meets{" "}
                <span className="text-gradient">belonging</span>
              </h2>
            </Reveal>
            <Reveal delay={0.1}>
              <p className="leading-relaxed text-[var(--muted)]">
                Founded in 2004, Cardiff International School set out to
                reimagine what an international education could be. Today, we
                welcome students from over 35 nationalities into a vibrant
                campus where rigorous academics meet rich cultural exchange.
              </p>
            </Reveal>
            <Reveal delay={0.15}>
              <p className="leading-relaxed text-[var(--muted)]">
                Our educators are mentors and changemakers, committed to drawing
                out the unique brilliance in every child — whether their passion
                lies in the sciences, the arts, sport or service.
              </p>
            </Reveal>
          </div>
        </div>
      </section>

      {/* Vision / Mission / Values */}
      <section className="mx-auto max-w-7xl px-5 py-12 sm:px-8 sm:py-16">
        <SectionHeading
          eyebrow="What drives us"
          title={
            <>
              Our vision, mission &{" "}
              <span className="text-gradient">values</span>
            </>
          }
        />
        <StaggerGroup className="mt-14 grid gap-6 md:grid-cols-3">
          {VALUES.map((v) => (
            <StaggerItem key={v.title}>
              <article className="glass glow-on-hover group relative h-full overflow-hidden rounded-3xl p-8">
                <div className="absolute -right-8 -top-8 h-28 w-28 rounded-full bg-burgundy/20 blur-3xl opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
                <span className="flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br from-burgundy-light to-burgundy-dark text-white shadow-glow">
                  <Icon name={v.icon} className="h-7 w-7" />
                </span>
                <h3 className="mt-6 text-xl font-bold">{v.title}</h3>
                <p className="mt-3 text-sm leading-relaxed text-[var(--muted)]">
                  {v.text}
                </p>
              </article>
            </StaggerItem>
          ))}
        </StaggerGroup>
      </section>

      {/* Timeline */}
      <section className="mx-auto max-w-7xl px-5 py-14 sm:px-8 sm:py-20">
        <SectionHeading
          eyebrow="Our Journey"
          title={
            <>
              A story written <span className="text-gradient">year by year</span>
            </>
          }
          className="mb-16"
        />
        <Timeline />
      </section>

      {/* Leadership */}
      <section className="mx-auto max-w-7xl px-5 py-12 sm:px-8 sm:py-16">
        <SectionHeading
          eyebrow="Meet the Team"
          title={
            <>
              The leaders behind{" "}
              <span className="text-gradient">the vision</span>
            </>
          }
          subtitle="A passionate leadership team dedicated to nurturing excellence and belonging."
          className="mb-14"
        />
        <Leadership />
      </section>
    </>
  );
}
