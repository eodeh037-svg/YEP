import Image from "next/image";
import { Check } from "lucide-react";
import { about } from "@/lib/data";
import { Button } from "@/components/ui/button";
import { Container } from "@/components/ui/container";
import { Reveal } from "@/components/ui/reveal";

export function About() {
  return (
    <section id="about" className="bg-white py-20 lg:py-28">
      <Container>
        <div className="grid items-center gap-12 lg:grid-cols-2 lg:gap-16">
          <Reveal className="order-2 lg:order-1">
            <div className="relative overflow-hidden rounded-3xl border border-brand-900/10 shadow-lg">
              <Image
                src="/images/about-placeholder.svg"
                alt="Young people collaborating during a YEP workshop"
                width={800}
                height={600}
                className="h-auto w-full object-cover"
              />
            </div>
          </Reveal>

          <div className="order-1 lg:order-2">
            <Reveal>
              <p className="mb-3 text-xs font-semibold uppercase tracking-widest text-accent-600">
                {about.eyebrow}
              </p>
              <h2 className="font-display text-3xl font-bold tracking-tight text-brand-950 sm:text-4xl text-balance">
                {about.title}
              </h2>
              <p className="mt-4 text-base leading-relaxed text-slate-600 sm:text-lg text-pretty">
                {about.description}
              </p>
            </Reveal>

            <Reveal delay={150}>
              <ul className="mt-8 grid gap-3 sm:grid-cols-2">
                {about.focusAreas.map((area) => (
                  <li
                    key={area}
                    className="flex items-center gap-2.5 rounded-xl border border-brand-900/10 bg-brand-50 px-4 py-3 text-sm font-medium text-brand-900"
                  >
                    <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-brand-900">
                      <Check className="h-3 w-3 text-white" />
                    </span>
                    {area}
                  </li>
                ))}
              </ul>
            </Reveal>

            <Reveal delay={250}>
              <div className="mt-8 flex flex-col gap-3 sm:flex-row">
                <Button href="#how-it-works">Learn More</Button>
                <Button href="#apply" variant="outline">
                  Join YEP
                </Button>
              </div>
            </Reveal>
          </div>
        </div>
      </Container>
    </section>
  );
}