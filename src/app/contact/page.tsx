import type { Metadata } from "next";
import PageHero from "@/components/ui/PageHero";
import Reveal from "@/components/ui/Reveal";
import Icon from "@/components/ui/Icon";
import ContactForm from "@/components/contact/ContactForm";
import { SITE } from "@/lib/site";

export const metadata: Metadata = {
  title: "Contact Us",
  description:
    "Get in touch with Cardiff International School. Find our address, phone, email and send us a message — we'd love to hear from you.",
};

const INFO = [
  {
    icon: "pin",
    label: "Visit Us",
    value: SITE.address,
    href: "https://www.google.com/maps?q=Cardiff",
  },
  {
    icon: "phone",
    label: "Call Us",
    value: SITE.phone,
    href: `tel:${SITE.phone}`,
  },
  {
    icon: "mail",
    label: "Email Us",
    value: SITE.email,
    href: `mailto:${SITE.email}`,
  },
  {
    icon: "clock",
    label: "Office Hours",
    value: "Mon – Fri · 8:00am – 4:30pm",
  },
];

export default function ContactPage() {
  return (
    <>
      <PageHero
        eyebrow="Contact"
        title={
          <>
            Let&apos;s start a <span className="text-gradient">conversation</span>
          </>
        }
        subtitle="Whether you're exploring admissions or simply have a question, our team is here to help you every step of the way."
      />

      <section className="mx-auto max-w-7xl px-5 py-12 sm:px-8">
        <div className="grid gap-10 lg:grid-cols-[1fr_1.1fr]">
          {/* Info column */}
          <div className="flex flex-col gap-5">
            {INFO.map((item, i) => {
              const inner = (
                <div className="glass glow-on-hover flex items-start gap-4 rounded-2xl p-6">
                  <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br from-burgundy-light to-burgundy-dark text-white shadow-glow">
                    <Icon name={item.icon} className="h-6 w-6" />
                  </span>
                  <div>
                    <p className="text-xs font-semibold uppercase tracking-[0.18em] text-burgundy-glow">
                      {item.label}
                    </p>
                    <p className="mt-1 text-sm text-[var(--foreground)]">
                      {item.value}
                    </p>
                  </div>
                </div>
              );
              return (
                <Reveal key={item.label} delay={i * 0.08} direction="right">
                  {item.href ? (
                    <a href={item.href} className="block">
                      {inner}
                    </a>
                  ) : (
                    inner
                  )}
                </Reveal>
              );
            })}

            <Reveal delay={0.3} direction="right">
              <div className="relative h-64 overflow-hidden rounded-3xl glass-strong shadow-glow">
                <iframe
                  title="Cardiff International School location"
                  src={SITE.mapEmbed}
                  className="h-full w-full"
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                />
              </div>
            </Reveal>
          </div>

          {/* Form column */}
          <Reveal direction="left">
            <ContactForm />
          </Reveal>
        </div>
      </section>
    </>
  );
}
