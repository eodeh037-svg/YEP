import { PenLine, Quote } from "lucide-react";
import { stories, Story } from "@/lib/data";
import { Container } from "@/components/ui/container";
import { SectionHeading } from "@/components/ui/section-heading";
import { Reveal } from "@/components/ui/reveal";

function StoryCard({ story }: { story: Story }) {
  return (
    <figure className="flex h-full flex-col rounded-2xl border border-brand-900/10 bg-white p-6 shadow-sm transition-shadow hover:shadow-md">
      <div className="flex items-center justify-between">
        <Quote className="h-7 w-7 text-accent-500" />
        {story.isPlaceholder && (
          <span className="inline-flex items-center gap-1.5 rounded-full bg-brand-50 px-3 py-1 text-[11px] font-semibold uppercase tracking-widest text-brand-700">
            <PenLine className="h-3 w-3" />
            Placeholder
          </span>
        )}
      </div>
      <blockquote className="mt-4 flex-1 text-sm leading-relaxed text-slate-600 italic">
        “{story.quote}”
      </blockquote>
      <figcaption className="mt-5 border-t border-brand-900/10 pt-4">
        <p className="text-sm font-bold text-brand-950">{story.name}</p>
        <p className="text-xs text-slate-500">{story.role}</p>
      </figcaption>
    </figure>
  );
}

export function Stories() {
  return (
    <section id="stories" className="bg-brand-50 py-20 lg:py-28">
      <Container>
        <Reveal>
          <SectionHeading
            eyebrow="Stories"
            title="Young People. Real Potential."
            description="Real stories from YEP participants will appear here as programs begin to deliver results."
          />
        </Reveal>

        <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {stories.map((story, index) => (
            <Reveal key={index} delay={index * 100}>
              <StoryCard story={story} />
            </Reveal>
          ))}
        </div>
      </Container>
    </section>
  );
}