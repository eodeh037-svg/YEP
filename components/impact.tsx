import { impactStats } from "@/lib/data";
import { Container } from "@/components/ui/container";
import { SectionHeading } from "@/components/ui/section-heading";
import { Reveal } from "@/components/ui/reveal";

export function Impact() {
  return (
    <section id="impact" className="relative overflow-hidden bg-brand-900 py-20 lg:py-28">
      <div className="bg-grid absolute inset-0" aria-hidden="true" />
      <Container className="relative">
        <Reveal>
          <SectionHeading
            dark
            eyebrow="Impact"
            title="The future we are working toward"
            description="YEP is getting started in Nigeria with ambitious targets for the young people we will serve."
          />
        </Reveal>

        <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {impactStats.map((stat, index) => (
            <Reveal key={stat.label} delay={index * 100}>
              <div className="flex h-full flex-col items-center rounded-2xl border border-white/10 bg-white/5 px-6 py-8 text-center transition-colors hover:bg-white/10">
                <p className="font-display text-4xl font-bold text-accent-400">
                  {stat.value}
                </p>
                <p className="mt-3 text-sm leading-relaxed text-brand-100">
                  {stat.label}
                </p>
              </div>
            </Reveal>
          ))}
        </div>

        <Reveal delay={200}>
          <p className="mx-auto mt-10 max-w-xl text-center text-xs leading-relaxed text-brand-300">
            These are editable placeholder targets — they will be updated with
            verified results as YEP programs are delivered.
          </p>
        </Reveal>
      </Container>
    </section>
  );
}