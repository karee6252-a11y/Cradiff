import type { Metadata } from "next";
import PageHero from "@/components/ui/PageHero";
import SectionHeading from "@/components/ui/SectionHeading";
import { StaggerGroup, StaggerItem } from "@/components/ui/Reveal";
import Icon from "@/components/ui/Icon";
import AcademicCard, { type Academic } from "@/components/academics/AcademicCard";

export const metadata: Metadata = {
  title: "Academics",
  description:
    "Explore the Primary, Preparatory and Secondary programmes at Cardiff International School — a Cambridge-accredited pathway from age 4 to 18.",
};

const STAGES: Academic[] = [
  {
    title: "Primary School",
    age: "Ages 4 – 11",
    icon: "sprout",
    image:
      "https://images.unsplash.com/photo-1503454537195-1dcabb73ffb9?auto=format&fit=crop&w=1000&q=80",
    description:
      "Our Primary years spark a lifelong love of learning. Through play, inquiry and exploration, children build strong foundations in literacy, numeracy and creativity — all within a warm, nurturing environment.",
    subjects: [
      "English & Literacy",
      "Mathematics",
      "Science Discovery",
      "Creative Arts",
      "Bilingual Immersion",
      "Physical Education",
    ],
  },
  {
    title: "Preparatory School",
    age: "Ages 11 – 14",
    icon: "compass",
    image:
      "https://images.unsplash.com/photo-1571260899304-425eee4c7efc?auto=format&fit=crop&w=1000&q=80",
    description:
      "The Preparatory years build independence and academic confidence. Students dive deeper into specialist subjects, develop critical-thinking skills and begin to discover their unique strengths and passions.",
    subjects: [
      "Advanced Mathematics",
      "STEM Laboratories",
      "Humanities",
      "Modern Languages",
      "Design & Technology",
      "Leadership Clubs",
    ],
    reverse: true,
  },
  {
    title: "Secondary School",
    age: "Ages 14 – 18",
    icon: "graduation",
    image:
      "https://images.unsplash.com/photo-1523240795612-9a054b0db644?auto=format&fit=crop&w=1000&q=80",
    description:
      "Our Secondary programme delivers rigorous IGCSE and A-Level pathways. With dedicated university guidance and research opportunities, students graduate ready to thrive at the world's leading institutions.",
    subjects: [
      "IGCSE Curriculum",
      "A-Level Pathways",
      "University Counselling",
      "Research Projects",
      "Robotics & AI",
      "Global Citizenship",
    ],
  },
];

const FEATURES = [
  {
    icon: "trophy",
    title: "Cambridge Accredited",
    text: "A globally recognised curriculum benchmarked to the highest standards.",
  },
  {
    icon: "globe",
    title: "Global Perspective",
    text: "Multilingual, multicultural learning that prepares true world citizens.",
  },
  {
    icon: "spark",
    title: "Future Skills",
    text: "AI, robotics and sustainability woven through every year group.",
  },
  {
    icon: "book",
    title: "Personalised Learning",
    text: "Small classes and tailored support so every learner can flourish.",
  },
];

export default function AcademicsPage() {
  return (
    <>
      <PageHero
        eyebrow="Academics"
        title={
          <>
            A pathway to <span className="text-gradient">lifelong success</span>
          </>
        }
        subtitle="From the first day of Primary to the final A-Level exam, every stage is purposefully designed to challenge, inspire and prepare students for a global future."
      />

      <section className="mx-auto flex max-w-7xl flex-col gap-6 px-5 py-12 sm:gap-8 sm:px-8 sm:py-16">
        {STAGES.map((stage) => (
          <AcademicCard key={stage.title} data={stage} />
        ))}
      </section>

      <section className="mx-auto max-w-7xl px-5 py-12 sm:px-8 sm:py-16">
        <SectionHeading
          eyebrow="The CIS Advantage"
          title={
            <>
              Why families choose{" "}
              <span className="text-gradient">our academics</span>
            </>
          }
        />
        <StaggerGroup className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {FEATURES.map((f) => (
            <StaggerItem key={f.title}>
              <div className="glass glow-on-hover flex h-full flex-col gap-4 rounded-3xl p-7">
                <span className="flex h-12 w-12 items-center justify-center rounded-xl bg-burgundy/20 text-burgundy-glow">
                  <Icon name={f.icon} className="h-6 w-6" />
                </span>
                <h3 className="text-lg font-bold">{f.title}</h3>
                <p className="text-sm leading-relaxed text-[var(--muted)]">
                  {f.text}
                </p>
              </div>
            </StaggerItem>
          ))}
        </StaggerGroup>
      </section>
    </>
  );
}
