"use client";

import { useEffect, useMemo, useState } from "react";
import {
  Briefcase,
  GraduationCap,
  Link2,
  LoaderCircle,
  Mail,
  MessageCircle,
  Search,
  Users,
} from "lucide-react";
import { getMentors, type MentorProfile } from "@/lib/profiles";
import { mentorSpecialties } from "@/lib/data";

// Turns a pasted WhatsApp number into a wa.me deep link.
function waLink(raw: string): string {
  const digits = raw.replace(/[^\d]/g, "");
  const local = digits.startsWith("234") ? digits : digits.replace(/^0/, "234");
  return `https://wa.me/${local}`;
}

function linkedinLink(raw: string): string {
  const value = raw.trim();
  if (/^https?:\/\//i.test(value)) return value;
  return `https://www.linkedin.com/in/${value.replace(/^@/, "").replace(/\/$/, "")}`;
}

// Public directory of mentor profiles with a specialty filter.
// Reads from the Firestore `profiles` collection (role === "mentor").
export function MentorDirectory() {
  const [mentors, setMentors] = useState<MentorProfile[]>([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState<string>("All");

  useEffect(() => {
    let cancelled = false;
    getMentors().then((list) => {
      if (cancelled) return;
      // Newest sign-ups first when createdAt is available.
      setMentors(
        [...list].sort((a, b) => {
          const at = a.createdAt?.seconds ?? 0;
          const bt = b.createdAt?.seconds ?? 0;
          return bt - at;
        })
      );
      setLoading(false);
    });
    return () => {
      cancelled = true;
    };
  }, []);

  // Specialties that actually have mentors, so the filter stays useful.
  const available = useMemo(() => {
    const present = new Set(mentors.map((m) => m.specialty));
    return mentorSpecialties.filter((s) => present.has(s));
  }, [mentors]);

  const visible =
    filter === "All" ? mentors : mentors.filter((m) => m.specialty === filter);

  return (
    <div id="mentor-directory" className="mt-16 scroll-mt-24">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <p className="mb-3 text-xs font-semibold uppercase tracking-widest text-accent-600">
            Directory
          </p>
          <h3 className="font-display text-2xl font-bold text-brand-950 sm:text-3xl">
            Meet Our Mentors
          </h3>
          <p className="mt-2 max-w-xl text-sm leading-relaxed text-slate-600">
            Mentors who joined YEP — filter by the field you need guidance in
            and reach out directly.
          </p>
        </div>

        <div className="relative w-full sm:w-64">
          <Search
            className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400"
            aria-hidden="true"
          />
          <select
            value={filter}
            onChange={(e) => setFilter(e.target.value)}
            aria-label="Filter mentors by specialty"
            className="w-full appearance-none rounded-lg border border-brand-900/15 bg-white py-2.5 pl-10 pr-4 text-sm text-brand-950 outline-none transition-colors focus:border-brand-600 focus:ring-2 focus:ring-brand-600/20"
          >
            <option value="All">All specialties</option>
            {available.map((item) => (
              <option key={item} value={item}>
                {item}
              </option>
            ))}
          </select>
        </div>
      </div>

      <div className="mt-8">
        {loading ? (
          <div className="flex items-center justify-center rounded-2xl border border-brand-900/10 bg-white p-10">
            <LoaderCircle className="h-5 w-5 animate-spin text-brand-600" />
          </div>
        ) : visible.length === 0 ? (
          <div className="rounded-2xl border border-dashed border-brand-900/15 bg-white p-10 text-center">
            <Users className="mx-auto h-10 w-10 text-brand-300" />
            <p className="mt-4 font-display text-lg font-bold text-brand-950">
              {filter === "All"
                ? "No mentors yet"
                : `No mentors in ${filter} yet`}
            </p>
            <p className="mx-auto mt-2 max-w-sm text-sm leading-relaxed text-slate-500">
              {filter === "All"
                ? "Be the first — create a mentor account to join the directory."
                : "Try another specialty, or be the first mentor in this field."}
            </p>
            <a
              href="#apply"
              className="mt-5 inline-flex items-center gap-2 rounded-full bg-brand-900 px-5 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-brand-800"
            >
              Become a mentor
            </a>
          </div>
        ) : (
          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {visible.map((mentor) => (
              <article
                key={mentor.uid}
                className="flex flex-col rounded-2xl border border-brand-900/10 bg-white p-6 shadow-sm transition-shadow hover:shadow-md"
              >
                <div className="flex items-start gap-3">
                  <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-brand-900 text-sm font-bold text-white">
                    {mentor.fullName
                      .split(" ")
                      .map((part) => part[0])
                      .slice(0, 2)
                      .join("")
                      .toUpperCase()}
                  </div>
                  <div className="min-w-0">
                    <h4 className="truncate font-display text-base font-bold text-brand-950">
                      {mentor.fullName}
                    </h4>
                    <p className="mt-0.5 inline-flex max-w-full items-center gap-1.5 rounded-full bg-accent-50 px-2.5 py-1 text-xs font-semibold text-accent-700">
                      <span className="truncate">{mentor.specialty}</span>
                    </p>
                  </div>
                </div>

                <dl className="mt-4 space-y-2 text-sm text-slate-600">
                  <div className="flex items-center gap-2">
                    <Briefcase className="h-4 w-4 shrink-0 text-brand-500" />
                    <dt className="sr-only">Experience</dt>
                    <dd>{mentor.yearsExperience} years experience</dd>
                  </div>
                  <div className="flex items-start gap-2">
                    <GraduationCap className="mt-0.5 h-4 w-4 shrink-0 text-brand-500" />
                    <dt className="sr-only">Education</dt>
                    <dd className="min-w-0">{mentor.education}</dd>
                  </div>
                </dl>

                <div className="mt-5 flex flex-col gap-2 border-t border-brand-900/10 pt-4">
                  {mentor.whatsapp && (
                    <a
                      href={waLink(mentor.whatsapp)}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 text-sm font-medium text-slate-600 transition-colors hover:text-brand-700"
                    >
                      <MessageCircle className="h-4 w-4 text-green-600" />
                      {mentor.whatsapp}
                    </a>
                  )}
                  {mentor.linkedin && (
                    <a
                      href={linkedinLink(mentor.linkedin)}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 text-sm font-medium text-slate-600 transition-colors hover:text-brand-700"
                    >
                      <Link2 className="h-4 w-4 text-brand-600" />
                      LinkedIn
                    </a>
                  )}
                  <a
                    href={`mailto:${mentor.email}`}
                    className="inline-flex items-center gap-2 text-sm font-medium text-slate-600 transition-colors hover:text-brand-700"
                  >
                    <Mail className="h-4 w-4 text-accent-600" />
                    {mentor.email}
                  </a>
                </div>
              </article>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}