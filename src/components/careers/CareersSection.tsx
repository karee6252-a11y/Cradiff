"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { JOBS } from "@/lib/site";
import { StaggerGroup, StaggerItem } from "@/components/ui/Reveal";
import SectionHeading from "@/components/ui/SectionHeading";
import Icon from "@/components/ui/Icon";
import CareersForm from "./CareersForm";

export default function CareersSection() {
  const [role, setRole] = useState<string>("");

  function apply(title: string) {
    setRole(title);
    document
      .getElementById("apply")
      ?.scrollIntoView({ behavior: "smooth", block: "start" });
  }

  return (
    <>
      <section className="mx-auto max-w-7xl px-5 py-12 sm:px-8 sm:py-16">
        <SectionHeading
          eyebrow="Open Positions"
          title={
            <>
              Build your career with{" "}
              <span className="text-gradient">purpose</span>
            </>
          }
          subtitle="Join a community of passionate educators and staff dedicated to shaping the next generation of global leaders."
        />

        <StaggerGroup className="mt-14 grid gap-6 md:grid-cols-2">
          {JOBS.map((job) => (
            <StaggerItem key={job.title}>
              <motion.article
                whileHover={{ y: -6 }}
                transition={{ type: "spring", stiffness: 300, damping: 20 }}
                className="glass glow-on-hover group flex h-full flex-col gap-4 rounded-3xl p-7"
              >
                <div className="flex flex-wrap items-center gap-2">
                  <span className="rounded-full bg-burgundy/20 px-3 py-1 text-xs font-semibold text-burgundy-glow">
                    {job.department}
                  </span>
                  <span className="glass rounded-full px-3 py-1 text-xs text-[var(--muted)]">
                    {job.type}
                  </span>
                  <span className="glass inline-flex items-center gap-1 rounded-full px-3 py-1 text-xs text-[var(--muted)]">
                    <Icon name="pin" className="h-3 w-3" />
                    {job.location}
                  </span>
                </div>
                <h3 className="text-xl font-bold">{job.title}</h3>
                <p className="flex-1 text-sm leading-relaxed text-[var(--muted)]">
                  {job.description}
                </p>
                <button
                  onClick={() => apply(job.title)}
                  className="nav-underline inline-flex w-fit items-center gap-2 text-sm font-semibold text-burgundy-glow"
                >
                  Apply for this role
                  <Icon name="arrow" className="h-4 w-4" />
                </button>
              </motion.article>
            </StaggerItem>
          ))}
        </StaggerGroup>
      </section>

      <section id="apply" className="mx-auto max-w-3xl scroll-mt-28 px-5 py-12 sm:px-8 sm:py-16">
        <SectionHeading
          eyebrow="Apply Now"
          title={
            <>
              Submit your <span className="text-gradient">application</span>
            </>
          }
          subtitle="Complete the form below and attach your CV. We review every application personally."
          className="mb-12"
        />
        <CareersForm presetRole={role} key={role} />
      </section>
    </>
  );
}
