"use client";

import { useEffect, useState } from "react";
import {
  AtSign,
  Briefcase,
  GraduationCap,
  Link2,
  LoaderCircle,
  Lock,
  LogIn,
  LogOut,
  Mail,
  MessageCircle,
  UserPlus,
  UserRound,
  Users,
} from "lucide-react";
import { signInWithEmail, signUpWithEmail, signOutUser } from "@/lib/auth";
import { getProfile, saveProfile, type Profile } from "@/lib/profiles";
import { mentorSpecialties } from "@/lib/data";
import { useAuth } from "@/components/auth-provider";

const baseInput =
  "w-full rounded-lg border border-brand-900/15 bg-white px-3.5 py-2.5 text-sm text-brand-950 placeholder:text-slate-400 outline-none transition-colors focus:border-brand-600 focus:ring-2 focus:ring-brand-600/20";
const inputClasses = `${baseInput} pl-10`;
const selectClasses = `${baseInput} appearance-none pl-10`;
const iconClasses =
  "pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400";

type Role = "mentee" | "mentor";
type Mode = "signin" | "signup";

function Field({
  label,
  htmlFor,
  error,
  children,
  className = "",
}: {
  label: string;
  htmlFor: string;
  error?: string;
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <div className={className}>
      <label
        htmlFor={htmlFor}
        className="mb-1.5 block text-sm font-medium text-brand-950"
      >
        {label}
      </label>
      {children}
      {error && (
        <p role="alert" className="mt-1.5 text-xs font-medium text-red-600">
          {error}
        </p>
      )}
    </div>
  );
}

function IconField({
  icon,
  children,
}: {
  icon: React.ReactNode;
  children: React.ReactNode;
}) {
  return (
    <div className="relative">
      <span className={iconClasses} aria-hidden="true">
        {icon}
      </span>
      {children}
    </div>
  );
}

function toggleClasses(active: boolean) {
  return `flex flex-1 items-center justify-center gap-1.5 rounded-lg px-3 py-2 text-sm font-semibold transition-colors ${
    active
      ? "bg-white text-brand-950 shadow-sm"
      : "text-slate-500 hover:text-brand-900"
  }`;
}

// Sign in / Create account panel with a role switch:
// "I need a mentor" (mentee) or "I'm a mentor". Mentor sign-up collects
// contact details plus specialty, experience, and education so the
// public mentor directory can list them.
export function AuthPanel() {
  const { user, loading } = useAuth();
  const [profile, setProfile] = useState<Profile | null>(null);
  const [role, setRole] = useState<Role>("mentee");
  const [mode, setMode] = useState<Mode>("signin");
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [whatsapp, setWhatsapp] = useState("");
  const [linkedin, setLinkedin] = useState("");
  const [specialty, setSpecialty] = useState("");
  const [yearsExperience, setYearsExperience] = useState("");
  const [education, setEducation] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [busy, setBusy] = useState(false);

  const uid = user?.uid ?? null;

  useEffect(() => {
    if (!uid) return;
    let cancelled = false;
    getProfile(uid).then((p) => {
      if (!cancelled && p) setProfile(p);
    });
    return () => {
      cancelled = true;
    };
  }, [uid]);

  if (loading) {
    return (
      <div className="flex items-center justify-center rounded-2xl border border-brand-900/10 bg-white p-8">
        <LoaderCircle className="h-5 w-5 animate-spin text-brand-600" />
      </div>
    );
  }

  if (user) {
    const isMentor = profile?.role === "mentor";
    return (
      <div className="rounded-2xl border border-brand-900/10 bg-white p-6">
        <p className="text-xs font-semibold uppercase tracking-widest text-accent-600">
          Signed in
        </p>
        <p className="mt-2 text-sm text-slate-600">
          Account:{" "}
          <span className="font-semibold text-brand-950">{user.email}</span>
        </p>
        {error && (
          <p role="alert" className="mt-3 rounded-lg bg-red-50 px-3 py-2 text-xs font-medium text-red-600">
            {error}
          </p>
        )}
        {profile && (
          <div className="mt-3 rounded-xl bg-brand-50 p-4 text-sm text-slate-600">
            <p className="flex items-center gap-2 font-semibold text-brand-950">
              {isMentor ? (
                <Users className="h-4 w-4 text-brand-600" />
              ) : (
                <UserRound className="h-4 w-4 text-brand-600" />
              )}
              {isMentor ? "Mentor profile" : "Mentee account"}
            </p>
            {isMentor && profile.role === "mentor" && (
              <p className="mt-1.5">
                {profile.specialty} · {profile.yearsExperience} years
                experience
              </p>
            )}
            {isMentor && (
              <a
                href="#mentor-directory"
                className="mt-2 inline-block font-semibold text-brand-700 underline underline-offset-2 hover:text-brand-900"
              >
                View the mentor directory
              </a>
            )}
          </div>
        )}
        <button
          type="button"
          onClick={async () => {
            await signOutUser();
            setProfile(null);
            setPassword("");
          }}
          className="mt-4 inline-flex items-center gap-2 rounded-full border border-brand-900/15 px-4 py-2 text-sm font-semibold text-brand-900 transition-colors hover:bg-brand-50"
        >
          <LogOut className="h-4 w-4" />
          Sign out
        </button>
      </div>
    );
  }

  function validateSignup(): string | null {
    if (fullName.trim().length < 2) return "Please enter your full name.";
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim()))
      return "Please enter a valid email address.";
    if (password.length < 6) return "Password must be at least 6 characters.";
    if (role === "mentor") {
      if (!specialty) return "Please choose the field you mentor in.";
      const years = Number(yearsExperience);
      if (
        !Number.isFinite(years) ||
        years < 0 ||
        years > 60 ||
        !Number.isInteger(years)
      )
        return "Please enter your years of experience as a whole number (0–60).";
      if (education.trim().length < 2)
        return "Please add your education background.";
      if (!whatsapp.trim() && !linkedin.trim())
        return "Add a WhatsApp number or LinkedIn profile so mentees can contact you.";
    }
    return null;
  }

  async function handleSubmit(event: React.FormEvent) {
    event.preventDefault();
    setError(null);

    if (mode === "signin") {
      if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim())) {
        setError("Please enter a valid email address.");
        return;
      }
      if (password.length < 6) {
        setError("Password must be at least 6 characters.");
        return;
      }
      setBusy(true);
      const result = await signInWithEmail(email, password);
      setBusy(false);
      if (!result.ok) {
        setError(result.message ?? "Something went wrong. Please try again.");
      }
      return;
    }

    const validationError = validateSignup();
    if (validationError) {
      setError(validationError);
      return;
    }

    setBusy(true);
    const result = await signUpWithEmail(email, password);
    if (!result.ok || !result.uid) {
      setBusy(false);
      setError(result.message ?? "Something went wrong. Please try again.");
      return;
    }

    const base = {
      fullName: fullName.trim(),
      email: email.trim(),
      whatsapp: whatsapp.trim(),
      linkedin: linkedin.trim(),
    };
    const fields =
      role === "mentor"
        ? {
            ...base,
            role: "mentor" as const,
            specialty,
            yearsExperience: String(Number(yearsExperience)),
            education: education.trim(),
          }
        : { ...base, role: "mentee" as const };

    const saved = await saveProfile(result.uid, fields);
    setBusy(false);
    if (!saved.ok) {
      setError(
        saved.message ??
          "Your account was created but the profile couldn't be saved. Please try again."
      );
    } else {
      setProfile({ uid: result.uid, ...fields });
    }
    // Auth state updates automatically via AuthProvider.
  }

  const roleButton = (value: Role, label: string, icon: React.ReactNode) => (
    <button
      type="button"
      onClick={() => {
        setRole(value);
        setError(null);
      }}
      className={toggleClasses(role === value)}
      aria-pressed={role === value}
    >
      {icon}
      {label}
    </button>
  );

  return (
    <div className="rounded-2xl border border-brand-900/10 bg-white p-6">
      <div className="grid grid-cols-2 gap-1 rounded-xl bg-brand-50 p-1">
        {roleButton("mentee", "I need a mentor", <UserRound className="h-4 w-4" />)}
        {roleButton("mentor", "I'm a mentor", <Users className="h-4 w-4" />)}
      </div>

      <div className="mt-3 flex items-center gap-1 rounded-xl bg-brand-50 p-1">
        <button
          type="button"
          onClick={() => {
            setMode("signin");
            setError(null);
          }}
          className={toggleClasses(mode === "signin")}
        >
          <LogIn className="h-4 w-4" />
          Sign in
        </button>
        <button
          type="button"
          onClick={() => {
            setMode("signup");
            setError(null);
          }}
          className={toggleClasses(mode === "signup")}
        >
          <UserPlus className="h-4 w-4" />
          Create account
        </button>
      </div>

      <p className="mt-4 text-sm text-slate-500">
        {mode === "signin"
          ? "Sign in to manage your YEP account."
          : role === "mentor"
            ? "Create a mentor account — your profile and contact details will appear in the public mentor directory."
            : "Create an account to connect with mentors and apply to YEP programs."}
      </p>

      <form onSubmit={handleSubmit} noValidate className="mt-5 space-y-4">
        {mode === "signup" && (
          <Field label="Full name" htmlFor="auth-name">
            <IconField icon={<UserRound className="h-4 w-4" />}>
              <input
                id="auth-name"
                type="text"
                autoComplete="name"
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
                placeholder="e.g. Ada Obi"
                className={inputClasses}
              />
            </IconField>
          </Field>
        )}

        <div
          className={
            mode === "signup" ? "grid gap-4 sm:grid-cols-2" : "space-y-4"
          }
        >
          <Field label="Email" htmlFor="auth-email">
            <IconField icon={<Mail className="h-4 w-4" />}>
              <input
                id="auth-email"
                type="email"
                autoComplete="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="you@example.com"
                className={inputClasses}
              />
            </IconField>
          </Field>

          <Field label="Password" htmlFor="auth-password">
            <IconField icon={<Lock className="h-4 w-4" />}>
              <input
                id="auth-password"
                type="password"
                autoComplete={
                  mode === "signup" ? "new-password" : "current-password"
                }
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="At least 6 characters"
                className={inputClasses}
              />
            </IconField>
          </Field>
        </div>

        {mode === "signup" && (
          <>
            <div className="grid gap-4 sm:grid-cols-2">
              <Field label="WhatsApp" htmlFor="auth-whatsapp">
                <IconField icon={<MessageCircle className="h-4 w-4" />}>
                  <input
                    id="auth-whatsapp"
                    type="tel"
                    autoComplete="tel"
                    value={whatsapp}
                    onChange={(e) => setWhatsapp(e.target.value)}
                    placeholder="e.g. +234 801 234 5678"
                    className={inputClasses}
                  />
                </IconField>
              </Field>

              <Field label="LinkedIn" htmlFor="auth-linkedin">
                <IconField icon={<Link2 className="h-4 w-4" />}>
                  <input
                    id="auth-linkedin"
                    type="text"
                    value={linkedin}
                    onChange={(e) => setLinkedin(e.target.value)}
                    placeholder="linkedin.com/in/username"
                    className={inputClasses}
                  />
                </IconField>
              </Field>
            </div>

            {role === "mentor" && (
              <div className="grid gap-4 border-t border-brand-900/10 pt-4 sm:grid-cols-2">
                <Field
                  label="Field you mentor in"
                  htmlFor="auth-specialty"
                  className="sm:col-span-2"
                >
                  <IconField icon={<AtSign className="h-4 w-4" />}>
                    <select
                      id="auth-specialty"
                      value={specialty}
                      onChange={(e) => setSpecialty(e.target.value)}
                      className={selectClasses}
                    >
                      <option value="">Choose a field…</option>
                      {mentorSpecialties.map((item) => (
                        <option key={item} value={item}>
                          {item}
                        </option>
                      ))}
                    </select>
                  </IconField>
                </Field>

                <Field label="Years of experience" htmlFor="auth-years">
                  <IconField icon={<Briefcase className="h-4 w-4" />}>
                    <input
                      id="auth-years"
                      type="number"
                      inputMode="numeric"
                      min={0}
                      max={60}
                      value={yearsExperience}
                      onChange={(e) => setYearsExperience(e.target.value)}
                      placeholder="e.g. 5"
                      className={inputClasses}
                    />
                  </IconField>
                </Field>

                <Field
                  label="Education background"
                  htmlFor="auth-education"
                  className="sm:col-span-2"
                >
                  <IconField icon={<GraduationCap className="h-4 w-4" />}>
                    <input
                      id="auth-education"
                      type="text"
                      value={education}
                      onChange={(e) => setEducation(e.target.value)}
                      placeholder="e.g. BSc Computer Science, University of Abuja"
                      className={inputClasses}
                    />
                  </IconField>
                </Field>
              </div>
            )}
          </>
        )}

        {error && (
          <p
            role="alert"
            className="rounded-lg bg-red-50 px-3 py-2 text-xs font-medium text-red-600"
          >
            {error}
          </p>
        )}

        <button
          type="submit"
          disabled={busy}
          className="inline-flex w-full items-center justify-center gap-2 rounded-full bg-brand-900 px-5 py-3 text-sm font-semibold text-white transition-colors hover:bg-brand-800 disabled:cursor-not-allowed disabled:opacity-60"
        >
          {busy ? (
            <LoaderCircle className="h-4 w-4 animate-spin" />
          ) : mode === "signup" ? (
            <UserPlus className="h-4 w-4" />
          ) : (
            <LogIn className="h-4 w-4" />
          )}
          {mode === "signup"
            ? role === "mentor"
              ? "Create mentor account"
              : "Create account"
            : "Sign in"}
        </button>
      </form>
    </div>
  );
}