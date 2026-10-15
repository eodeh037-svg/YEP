import {
  CalendarDays,
  Presentation,
  School,
  Lightbulb,
  Users,
  Handshake,
  Wrench,
  LucideIcon,
} from "lucide-react";
import { events, supportedEventTypes, YepEvent } from "@/lib/data";
import { Button } from "@/components/ui/button";
import { Container } from "@/components/ui/container";
import { SectionHeading } from "@/components/ui/section-heading";
import { Reveal } from "@/components/ui/reveal";

const typeIcon: Record<string, LucideIcon> = {
  "Career Seminars": Presentation,
  "Entrepreneurship Workshops": Lightbulb,
  "School Programs": School,
  "Youth Conferences": Users,
  "Mentorship Sessions": Handshake,
  "Skills Training": Wrench,
};

function EmptyEvents() {
  return (
    <div className="rounded-3xl border-2 border-dashed border-brand-900/15 bg-white px-6 py-14 text-center">
      <span className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-brand-50 text-brand-600">
        <CalendarDays className="h-7 w-7" />
      </span>
      <h3 className="mt-5 font-display text-xl font-bold text-brand-950">
        New opportunities are coming soon
      </h3>
      <p className="mx-auto mt-2 max-w-md text-sm leading-relaxed text-slate-600">
        Stay connected with YEP. When events, workshops, and programs are
        confirmed, they will be announced here.
      </p>
      <div className="mt-8">
        <p className="text-xs font-semibold uppercase tracking-widest text-slate-400">
          YEP events cover
        </p>
        <ul className="mx-auto mt-4 flex max-w-2xl flex-wrap items-center justify-center gap-2.5">
          {supportedEventTypes.map((type) => {
            const Icon = typeIcon[type] ?? CalendarDays;
            return (
              <li
                key={type}
                className="inline-flex items-center gap-2 rounded-full border border-brand-900/10 bg-brand-50 px-4 py-2 text-xs font-semibold text-brand-800"
              >
                <Icon className="h-3.5 w-3.5 text-accent-600" />
                {type}
              </li>
            );
          })}
        </ul>
      </div>
    </div>
  );
}

function EventCard({ event }: { event: YepEvent }) {
  return (
    <article className="flex h-full flex-col rounded-2xl border border-brand-900/10 bg-white p-6 shadow-sm transition-shadow hover:shadow-md">
      <div className="flex items-center justify-between gap-4">
        <h3 className="font-display text-lg font-bold text-brand-950">
          {event.name}
        </h3>
        <span className="inline-flex shrink-0 items-center gap-1.5 rounded-full bg-accent-500/10 px-3 py-1 text-xs font-semibold text-accent-700">
          <CalendarDays className="h-3.5 w-3.5" />
          {event.date}
        </span>
      </div>
      <p className="mt-1 text-xs font-medium uppercase tracking-widest text-slate-400">
        {event.location}
      </p>
      <p className="mt-3 text-sm leading-relaxed text-slate-600">
        {event.description}
      </p>
      <div className="mt-5 flex-1" />
      <Button href={event.registerHref} variant="accent" className="w-full">
        Register
      </Button>
    </article>
  );
}

export function Events() {
  return (
    <section id="events" className="bg-white py-20 lg:py-28">
      <Container>
        <Reveal>
          <SectionHeading
            eyebrow="Events"
            title="Seminars, workshops, and gatherings"
            description="Real programs and events coming soon — right here, in one place."
          />
        </Reveal>

        <div className="mt-12">
          {events.length === 0 ? (
            <Reveal>
              <EmptyEvents />
            </Reveal>
          ) : (
            <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
              {events.map((event, index) => (
                <Reveal key={event.name} delay={(index % 3) * 100}>
                  <EventCard event={event} />
                </Reveal>
              ))}
            </div>
          )}
        </div>
      </Container>
    </section>
  );
}