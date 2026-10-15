"use client";

import { useState } from "react";
import { Menu, X } from "lucide-react";
import { navLinks, siteConfig } from "@/lib/data";

export function SiteHeader() {
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 border-b border-brand-900/10 bg-white/95 shadow-sm backdrop-blur">
      <div className="mx-auto flex h-16 w-full max-w-6xl items-center justify-between gap-4 px-4 sm:px-6 lg:px-8">
        <a href="#home" className="flex items-center gap-2.5">
          <span className="flex h-9 w-9 items-center justify-center rounded-lg bg-brand-900 font-display text-lg font-bold text-white">
            YEP
          </span>
          <span className="leading-tight">
            <span className="block text-sm font-bold text-brand-950">
              {siteConfig.name}
            </span>
            <span className="block text-[10px] font-medium uppercase tracking-widest text-slate-500">
              Youth Empowerment<br />Program
            </span>
          </span>
        </a>

        <nav className="hidden items-center gap-6 lg:flex">
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="text-sm font-medium text-slate-600 transition-colors hover:text-brand-900"
            >
              {link.label}
            </a>
          ))}
        </nav>

        <div className="flex items-center gap-3">
          <a
            href="#apply"
            className="hidden rounded-full bg-accent-500 px-5 py-2.5 text-sm font-semibold text-brand-950 transition-colors hover:bg-accent-400 sm:inline-flex"
          >
            Join YEP
          </a>

          <button
            type="button"
            onClick={() => setOpen((value) => !value)}
            aria-expanded={open}
            aria-label={open ? "Close menu" : "Open menu"}
            className="inline-flex h-10 w-10 items-center justify-center rounded-lg text-brand-900 transition-colors hover:bg-brand-50 lg:hidden"
          >
            {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </div>

      {open && (
        <nav className="border-t border-brand-900/10 bg-white lg:hidden">
          <div className="flex flex-col px-4 py-3 sm:px-6">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                onClick={() => setOpen(false)}
                className="rounded-md px-2 py-3 text-sm font-medium text-slate-700 transition-colors hover:bg-brand-50 hover:text-brand-900"
              >
                {link.label}
              </a>
            ))}
            <a
              href="#apply"
              onClick={() => setOpen(false)}
              className="mt-2 rounded-full bg-accent-500 px-5 py-3 text-center text-sm font-semibold text-brand-950 transition-colors hover:bg-accent-400"
            >
              Join YEP
            </a>
          </div>
        </nav>
      )}
    </header>
  );
}