import { Compass, Lightbulb, Wrench, Users, BadgeCheck, LucideIcon } from "lucide-react";
import { programs } from "@/lib/data";
import { Container } from "@/components/ui/container";
import { SectionHeading } from "@/components/ui/section-heading";
import { Reveal } from "@/components/ui/reveal";

const icons: Record<string, LucideIcon> = {
  compass: Compass,
  lightbulb: Lightbulb,
  wrench: Wrench,
  users: Users,
  badgeCheck: BadgeCheck,
};

export function Programs() {
  return (
    <section id="programs" className="bg-brand-950 py-20 lg:py-28">
      <Container>
        <Reveal>
          <SectionHeading
            dark
            eyebrow="Programs"
            title="Ways YEP helps young people grow"
            description="Practical, structured programs that build knowledge, skills, and confidence."
          />
        </Reveal>

        <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {programs.map((program, index) => {
            const Icon = icons[program.icon] ?? Compass;
            return (
              <Reveal key={program.title} delay={(index % 3) * 100}>
                <div className="group flex h-full flex-col rounded-2xl border border-white/10 bg-white/5 p-6 transition-all duration-300 hover:-translate-y-1 hover:border-accent-400/40 hover:bg-white/10">
                  <span className="flex h-12 w-12 items-center justify-center rounded-xl bg-accent-500/15 text-accent-400 transition-colors duration-300 group-hover:bg-accent-500 group-hover:text-brand-950">
                    <Icon className="h-6 w-6" />
                  </span>
                  <h3 className="mt-5 font-display text-lg font-bold text-white">
                    {program.title}
                  </h3>
                  <p className="mt-2 text-sm leading-relaxed text-brand-100">
                    {program.description}
                  </p>
                </div>
              </Reveal>
            );
          })}

          <Reveal delay={200}>
            <div className="flex h-full flex-col justify-center rounded-2xl border border-accent-400/30 bg-accent-500/10 p-6">
              <p className="font-display text-lg font-bold text-accent-300">
                Ready to begin?
              </p>
              <p className="mt-2 text-sm leading-relaxed text-brand-100">
                Apply to join YEP and start discovering what you can become.
              </p>
              <a
                href="#apply"
                className="mt-5 inline-flex items-center justify-center rounded-full bg-accent-500 px-5 py-2.5 text-sm font-semibold text-brand-950 transition-colors hover:bg-accent-400"
              >
                Join YEP
              </a>
            </div>
          </Reveal>
        </div>
      </Container>
    </section>
  );
}