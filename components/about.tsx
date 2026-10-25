"use client";

import Image from "next/image";
import { useState } from "react";
import { ChevronDown, Check } from "lucide-react";
import { about } from "@/lib/data";
import { Button } from "@/components/ui/button";
import { Container } from "@/components/ui/container";
import { Reveal } from "@/components/ui/reveal";

const focusClasses =
  "flex items-center gap-2.5 rounded-xl border border-brand-900/10 bg-brand-50 px-4 py-3 text-sm font-medium text-brand-900 transition-all cursor-pointer";

export function FocusArea({ item }: { item: typeof about.focusAreas[number] }) {
  const [open, setOpen] = useState(false);
  const [pinned, setPinned] = useState(false);

  const show = open || pinned;

  return (
    <li>
      <div
        className={`${focusClasses} ${pinned ? "bg-brand-100 shadow-sm" : ""}`}
        onMouseEnter={() => setOpen(true)}
        onMouseLeave={() => {
          if (!pinned) setOpen(false);
        }}
        onClick={() => {
          setPinned(!pinned);
          setOpen(!pinned);
        }}
      >
        <div className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-brand-900">
          <Check className="h-3 w-3 text-white" />
        </div>
        <span className="flex-1 truncate">{item.title}</span>
        <ChevronDown
          className={`h-4 w-4 shrink-0 transition-transform duration-300 ${show ? "rotate-180" : ""}`}
        />
      </div>
      <div
        className="overflow-hidden transition-[grid-template-rows] duration-300 ease-out"
        style={{ gridTemplateRows: show ? "1fr" : "0fr" }}
      >
        <div className="mt-2 rounded-lg border border-brand-900/5 bg-brand-50/50 p-3 text-sm text-slate-600 leading-relaxed">
          {item.description}
        </div>
      </div>
    </li>
  );
}

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
                priority
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
                  <FocusArea key={area.title} item={area} />
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