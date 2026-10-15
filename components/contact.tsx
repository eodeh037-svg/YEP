import { Mail, MapPin, Phone, Camera, Music2, ThumbsUp, AtSign, Briefcase, LucideIcon } from "lucide-react";
import { contact } from "@/lib/data";
import { Container } from "@/components/ui/container";
import { SectionHeading } from "@/components/ui/section-heading";
import { Reveal } from "@/components/ui/reveal";

const socialIcons: Record<string, LucideIcon> = {
  Instagram: Camera,
  TikTok: Music2,
  Facebook: ThumbsUp,
  X: AtSign,
  LinkedIn: Briefcase,
};

export function Contact() {
  return (
    <section id="contact" className="bg-brand-50 py-20 lg:py-28">
      <Container>
        <Reveal>
          <SectionHeading
            eyebrow={contact.eyebrow}
            title={contact.title}
            description={contact.description}
          />
        </Reveal>

        <div className="mt-12 grid gap-5 lg:grid-cols-2">
          <Reveal>
            <div className="flex h-full flex-col gap-4">
              <div className="flex items-start gap-4 rounded-2xl border border-brand-900/10 bg-white p-6">
                <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-brand-50 text-brand-800">
                  <MapPin className="h-5 w-5" />
                </span>
                <div>
                  <h3 className="font-display text-base font-bold text-brand-950">
                    Location
                  </h3>
                  <p className="mt-1 text-sm text-slate-600">
                    {contact.location}
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-4 rounded-2xl border border-brand-900/10 bg-white p-6">
                <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-brand-50 text-brand-800">
                  <Mail className="h-5 w-5" />
                </span>
                <div>
                  <h3 className="font-display text-base font-bold text-brand-950">
                    Email
                  </h3>
                  <p className="mt-1 text-sm text-slate-600">{contact.email}</p>
                </div>
              </div>

              <div className="flex items-start gap-4 rounded-2xl border border-brand-900/10 bg-white p-6">
                <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-brand-50 text-brand-800">
                  <Phone className="h-5 w-5" />
                </span>
                <div>
                  <h3 className="font-display text-base font-bold text-brand-950">
                    Phone
                  </h3>
                  <p className="mt-1 text-sm text-slate-600">{contact.phone}</p>
                </div>
              </div>
            </div>
          </Reveal>

          <Reveal delay={150}>
            <div className="flex h-full flex-col rounded-2xl border border-brand-900/10 bg-white p-6">
              <h3 className="font-display text-lg font-bold text-brand-950">
                Follow YEP on social media
              </h3>
              <p className="mt-2 text-sm leading-relaxed text-slate-600">
                Connect with YEP as we build a community of ambitious young
                people in Nigeria.
              </p>
              <ul className="mt-5 flex flex-wrap gap-2.5">
                {contact.socials.map((social) => {
                  const Icon = socialIcons[social.name] ?? AtSign;
                  const hasUrl = social.url.trim() !== "";
                  return (
                    <li key={social.name}>
                      {hasUrl ? (
                        <a
                          href={social.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-2 rounded-full border border-brand-900/15 px-4 py-2 text-sm font-medium text-brand-900 transition-colors hover:border-brand-900 hover:bg-brand-900 hover:text-white"
                          aria-label={social.name}
                        >
                          <Icon className="h-4 w-4" aria-hidden="true" />
                          {social.name}
                        </a>
                      ) : (
                        <span
                          aria-label={`${social.name} — link coming soon`}
                          className="inline-flex cursor-not-allowed items-center gap-2 rounded-full border border-brand-900/10 bg-brand-50/50 px-4 py-2 text-sm font-medium text-slate-400"
                        >
                          <Icon className="h-4 w-4" aria-hidden="true" />
                          {social.name}
                        </span>
                      )}
                    </li>
                  );
                })}
              </ul>
              <p className="mt-6 border-t border-brand-900/10 pt-5 text-xs leading-relaxed text-slate-400">
                Official YEP social media links will be added here when they
                are available.
              </p>
            </div>
          </Reveal>
        </div>
      </Container>
    </section>
  );
}