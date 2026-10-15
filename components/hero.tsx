import Image from "next/image";
import { MapPin } from "lucide-react";
import { hero, siteConfig } from "@/lib/data";
import { Button } from "@/components/ui/button";
import { Container } from "@/components/ui/container";
import { Reveal } from "@/components/ui/reveal";

const highlights = ["Career Guidance", "Mentorship", "Skills & Leadership"];

export function Hero() {
  return (
    <section id="home" className="relative overflow-hidden bg-brand-50">
      <div className="bg-dots-light absolute inset-0" aria-hidden="true" />
      <Container className="relative">
        <div className="grid items-center gap-12 py-16 lg:grid-cols-2 lg:gap-16 lg:py-24">
          <div>
            <Reveal>
              <p className="inline-flex items-center gap-2 rounded-full border border-brand-900/10 bg-white px-4 py-1.5 text-xs font-semibold uppercase tracking-widest text-brand-800">
                <MapPin className="h-3.5 w-3.5 text-accent-600" />
                {siteConfig.location}
              </p>
            </Reveal>

            <Reveal delay={100}>
              <h1 className="mt-6 font-display text-4xl font-bold leading-tight tracking-tight text-brand-950 sm:text-5xl lg:text-6xl">
                {hero.headlineTop}{" "}
                <span className="text-brand-600">{hero.headlineBottom}</span>
              </h1>
            </Reveal>

            <Reveal delay={200}>
              <p className="mt-6 max-w-xl text-base leading-relaxed text-slate-600 sm:text-lg">
                {hero.description}
              </p>
            </Reveal>

            <Reveal delay={300}>
              <div className="mt-8 flex flex-col gap-3 sm:flex-row">
                <Button href={hero.primaryCta.href} variant="accent">
                  {hero.primaryCta.label}
                </Button>
                <Button href={hero.secondaryCta.href} variant="outline">
                  {hero.secondaryCta.label}
                </Button>
              </div>
            </Reveal>

            <Reveal delay={400}>
              <ul className="mt-10 flex flex-wrap gap-x-6 gap-y-2">
                {highlights.map((item) => (
                  <li
                    key={item}
                    className="flex items-center gap-2 text-sm font-medium text-slate-600"
                  >
                    <span className="h-1.5 w-1.5 rounded-full bg-accent-500" />
                    {item}
                  </li>
                ))}
              </ul>
            </Reveal>
          </div>

          <Reveal delay={200} className="relative">
            <div className="relative overflow-hidden rounded-3xl border border-brand-900/10 shadow-xl">
              <Image
                src="/images/hero-placeholder.svg"
                alt="Group of motivated young people taking part in a YEP session"
                width={800}
                height={900}
                className="h-auto w-full object-cover"
                priority
              />
            </div>
          </Reveal>
        </div>
      </Container>
    </section>
  );
}