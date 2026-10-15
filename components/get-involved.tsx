import {
  UserPlus,
  HeartHandshake,
  Building,
  Gift,
  LucideIcon,
  ArrowRight,
} from "lucide-react";
import { involvementCards, InvolvementCard } from "@/lib/data";
import { Container } from "@/components/ui/container";
import { SectionHeading } from "@/components/ui/section-heading";
import { Reveal } from "@/components/ui/reveal";

const cardIcons: Record<string, LucideIcon> = {
  userPlus: UserPlus,
  heartHandshake: HeartHandshake,
  building: Building,
  gift: Gift,
};

function InvolvementCardComponent({ card }: { card: InvolvementCard }) {
  const Icon = cardIcons[card.icon] ?? UserPlus;
  return (
    <div className="group flex h-full flex-col rounded-2xl border border-brand-900/10 bg-white p-6 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-md">
      <span className="flex h-12 w-12 items-center justify-center rounded-xl bg-brand-50 text-brand-800 transition-colors group-hover:bg-brand-900 group-hover:text-white">
        <Icon className="h-6 w-6" />
      </span>
      <h3 className="mt-5 font-display text-lg font-bold text-brand-950">
        {card.title}
      </h3>
      <p className="mt-2 flex-1 text-sm leading-relaxed text-slate-600">
        {card.description}
      </p>
      <a
        href={card.cta.href}
        className="mt-5 inline-flex items-center gap-1.5 text-sm font-semibold text-accent-700 transition-colors hover:text-accent-600"
      >
        {card.cta.label}
        <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
      </a>
    </div>
  );
}

export function GetInvolved() {
  return (
    <section id="get-involved" className="bg-white py-20 lg:py-28">
      <Container>
        <Reveal>
          <SectionHeading
            eyebrow="Get Involved"
            title="There is a place for you at YEP"
            description="Whether you are a young person, a professional, or an organization, you can help shape brighter futures."
          />
        </Reveal>

        <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {involvementCards.map((card, index) => (
            <Reveal key={card.title} delay={index * 100}>
              <InvolvementCardComponent card={card} />
            </Reveal>
          ))}
        </div>
      </Container>
    </section>
  );
}