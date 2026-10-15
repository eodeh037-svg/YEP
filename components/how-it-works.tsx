import { Search, BookOpen, Handshake, TrendingUp, LucideIcon } from "lucide-react";
import { steps } from "@/lib/data";
import { Container } from "@/components/ui/container";
import { SectionHeading } from "@/components/ui/section-heading";
import { Reveal } from "@/components/ui/reveal";

const icons: Record<string, LucideIcon> = {
  search: Search,
  bookOpen: BookOpen,
  handshake: Handshake,
  trendingUp: TrendingUp,
};

export function HowItWorks() {
  return (
    <section id="how-it-works" className="bg-white py-20 lg:py-28">
      <Container>
        <Reveal>
          <SectionHeading
            eyebrow="How YEP Works"
            title="A clear path from discovery to growth"
          />
        </Reveal>

        <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {steps.map((step, index) => {
            const Icon = icons[step.icon] ?? Search;
            return (
              <Reveal key={step.number} delay={index * 100}>
                <div className="relative h-full rounded-2xl border border-brand-900/10 bg-brand-50 p-6 transition-all duration-300 hover:border-brand-900/20 hover:shadow-md">
                  <span className="font-display text-4xl font-bold text-brand-900/15">
                    {step.number}
                  </span>
                  <span className="mt-4 flex h-11 w-11 items-center justify-center rounded-xl bg-brand-900 text-white">
                    <Icon className="h-5 w-5" />
                  </span>
                  <h3 className="mt-4 font-display text-lg font-bold text-brand-950">
                    {step.title}
                  </h3>
                  <p className="mt-2 text-sm leading-relaxed text-slate-600">
                    {step.description}
                  </p>
                </div>
              </Reveal>
            );
          })}
        </div>
      </Container>
    </section>
  );
}