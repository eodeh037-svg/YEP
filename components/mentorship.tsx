import { GraduationCap, MessageSquareQuote } from "lucide-react";
import { mentorship } from "@/lib/data";
import { Button } from "@/components/ui/button";
import { Container } from "@/components/ui/container";
import { SectionHeading } from "@/components/ui/section-heading";
import { Reveal } from "@/components/ui/reveal";
import { MentorDirectory } from "@/components/mentor-directory";

const mentorFocus = [
  "Guidance on careers and decisions",
  "Industry knowledge and perspective",
  "Practical, real-world advice",
  "Encouragement and accountability",
];

export function Mentorship() {
  return (
    <section id="mentorship" className="bg-brand-50 py-20 lg:py-28">
      <Container>
        <div className="grid items-center gap-12 lg:grid-cols-2 lg:gap-16">
          <Reveal>
            <SectionHeading
              align="left"
              eyebrow={mentorship.eyebrow}
              title={mentorship.headline}
              description={mentorship.description}
            />
            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <Button href={mentorship.primaryCta.href} variant="accent">
                {mentorship.primaryCta.label}
              </Button>
              <Button href={mentorship.secondaryCta.href} variant="outline">
                {mentorship.secondaryCta.label}
              </Button>
            </div>
          </Reveal>

          <Reveal delay={150}>
            <div className="rounded-3xl border border-brand-900/10 bg-white p-8 shadow-lg">
              <MessageSquareQuote className="h-10 w-10 text-accent-500" />
              <h3 className="mt-4 font-display text-xl font-bold text-brand-950">
                What mentors offer
              </h3>
              <ul className="mt-5 space-y-3">
                {mentorFocus.map((item) => (
                  <li key={item} className="flex items-center gap-3 text-sm text-slate-600">
                    <GraduationCap className="h-4 w-4 shrink-0 text-brand-600" />
                    {item}
                  </li>
                ))}
              </ul>
              <p className="mt-6 border-t border-brand-900/10 pt-5 text-sm text-slate-500">
                Mentor profiles are published in the directory below as
                professionals join YEP.
              </p>
            </div>
          </Reveal>
        </div>

        <MentorDirectory />
      </Container>
    </section>
  );
}