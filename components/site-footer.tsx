import { MapPin } from "lucide-react";
import { contact, footerInvolvementLinks, footerQuickLinks, siteConfig } from "@/lib/data";

export function SiteFooter() {
  return (
    <footer className="bg-brand-950 text-brand-100">
      <div className="mx-auto w-full max-w-6xl px-4 py-14 sm:px-6 lg:px-8">
        <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-4">
          <div className="lg:col-span-1">
            <div className="flex items-center gap-2.5">
              <span className="flex h-9 w-9 items-center justify-center rounded-lg bg-white/10 font-display text-lg font-bold text-white">
                YEP
              </span>
              <span className="font-display text-lg font-bold text-white">
                {siteConfig.name}
              </span>
            </div>
            <p className="mt-2 text-xs font-medium uppercase tracking-widest text-brand-300">
              Youth Empowerment Program
            </p>
            <p className="mt-4 text-sm leading-relaxed text-brand-200">
              {siteConfig.tagline}
            </p>
            <p className="mt-4 flex items-center gap-1.5 text-sm text-brand-200">
              <MapPin className="h-4 w-4 text-accent-400" />
              {siteConfig.location}
            </p>
          </div>

          <div>
            <h3 className="text-sm font-semibold text-white">Quick Links</h3>
            <ul className="mt-4 space-y-2.5">
              {footerQuickLinks.map((link) => (
                <li key={link.href}>
                  <a
                    href={link.href}
                    className="text-sm text-brand-200 transition-colors hover:text-white"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="text-sm font-semibold text-white">Get Involved</h3>
            <ul className="mt-4 space-y-2.5">
              {footerInvolvementLinks.map((link) => (
                <li key={link.label}>
                  <a
                    href={link.href}
                    className="text-sm text-brand-200 transition-colors hover:text-white"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="text-sm font-semibold text-white">Contact</h3>
            <ul className="mt-4 space-y-2.5 text-sm text-brand-200">
              <li className="flex items-start gap-1.5">
                <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-accent-400" />
                {contact.location}
              </li>
              <li className="break-all">{contact.email}</li>
              <li>{contact.phone}</li>
            </ul>
          </div>
        </div>

        <div className="mt-12 border-t border-white/10 pt-6 text-center text-xs text-brand-300 sm:text-left">
          <p>© 2026 {siteConfig.fullName}. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}