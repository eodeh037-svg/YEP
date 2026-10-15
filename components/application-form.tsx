"use client";

import { useState } from "react";
import {
  CheckCircle2,
  ClipboardCheck,
  Clock,
  MailCheck,
  Send,
} from "lucide-react";
import { hearAboutOptions, interestOptions } from "@/lib/data";
import { ApplicationData, submitApplication } from "@/lib/firebase";
import { useAuth } from "@/components/auth-provider";

type FormState = ApplicationData;
type Errors = Partial<Record<keyof ApplicationData, string>>;

const initialForm: FormState = {
  fullName: "",
  age: "",
  email: "",
  phone: "",
  cityState: "",
  school: "",
  interest: "",
  reason: "",
  hearAbout: "",
  consent: false,
};

const inputClasses =
  "w-full rounded-lg border border-brand-900/15 bg-white px-3.5 py-2.5 text-sm text-brand-950 placeholder:text-slate-400 outline-none transition-colors focus:border-brand-600 focus:ring-2 focus:ring-brand-600/20";

function Field({
  label,
  htmlFor,
  error,
  children,
}: {
  label: string;
  htmlFor: string;
  error?: string;
  children: React.ReactNode;
}) {
  return (
    <div>
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

function validate(form: FormState): Errors {
  const errors: Errors = {};

  if (!form.fullName.trim()) errors.fullName = "Please enter your full name.";
  if (form.fullName.trim().length < 3)
    errors.fullName = "Name looks too short.";

  if (!form.age.trim()) {
    errors.age = "Please enter your age.";
  } else {
    const age = Number(form.age);
    if (!Number.isInteger(age) || age < 10 || age > 35)
      errors.age = "Age must be between 10 and 35.";
  }

  if (!form.email.trim()) {
    errors.email = "Please enter your email address.";
  } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email.trim())) {
    errors.email = "Please enter a valid email address.";
  }

  if (!form.phone.trim()) {
    errors.phone = "Please enter your phone number.";
  } else if (!/^\+?[0-9\s-]{7,15}$/.test(form.phone.trim())) {
    errors.phone = "Please enter a valid phone number.";
  }

  if (!form.cityState.trim()) errors.cityState = "Please enter your city and state.";

  if (!form.interest) errors.interest = "Please choose an area of interest.";

  if (!form.reason.trim()) errors.reason = "Please tell us why you want to join YEP.";

  if (!form.consent) errors.consent = "Please agree before submitting.";

  return errors;
}

export function ApplicationForm() {
  const { user } = useAuth();
  const [form, setForm] = useState<FormState>(initialForm);
  const [errors, setErrors] = useState<Errors>({});
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);

  function handleChange(
    field: keyof FormState,
    value: string | boolean
  ) {
    setForm((prev) => ({ ...prev, [field]: value }));
    if (errors[field]) {
      setErrors((prev) => ({ ...prev, [field]: undefined }));
    }
    if (submitError) setSubmitError(null);
  }

  async function handleSubmit(event: React.FormEvent) {
    event.preventDefault();
    const nextErrors = validate(form);
    setErrors(nextErrors);
    if (Object.values(nextErrors).some(Boolean)) return;

    setSubmitting(true);
    setSubmitError(null);
    try {
      const result = await submitApplication(form, {
        uid: user?.uid ?? "",
        email: user?.email ?? "",
      });
      if (result.ok) {
        setSubmitted(true);
      } else {
        setSubmitError("We couldn't submit your application. Please try again.");
      }
    } catch {
      setSubmitError("We couldn't submit your application. Please try again.");
    } finally {
      setSubmitting(false);
    }
  }

  if (submitted) {
    return (
      <div className="flex h-full flex-col items-center justify-center rounded-2xl border border-green-200 bg-green-50 p-8 text-center">
        <CheckCircle2 className="h-12 w-12 text-green-600" />
        <h3 className="mt-4 font-display text-xl font-bold text-brand-950">
          Application submitted
        </h3>
        <p className="mt-2 max-w-sm text-sm leading-relaxed text-slate-600">
          Application submitted successfully. Thank you for joining YEP. The
          YEP team will review your application and be in touch with next
          steps.
        </p>
      </div>
    );
  }

  return (
    <form
      onSubmit={handleSubmit}
      noValidate
      className="rounded-2xl border border-brand-900/10 bg-white p-6 shadow-lg sm:p-8"
    >
      <h3 className="font-display text-xl font-bold text-brand-950">
        YEP Application Form
      </h3>
      <p className="mt-1 text-sm text-slate-500">
        Fill in the details below to apply.
      </p>

      <div className="mt-6 grid gap-5 sm:grid-cols-2">
        <Field label="Full Name" htmlFor="fullName" error={errors.fullName}>
          <input
            id="fullName"
            type="text"
            value={form.fullName}
            onChange={(e) => handleChange("fullName", e.target.value)}
            placeholder="e.g. Ada Obi"
            className={inputClasses}
            aria-invalid={Boolean(errors.fullName)}
            autoComplete="name"
          />
        </Field>

        <Field label="Age" htmlFor="age" error={errors.age}>
          <input
            id="age"
            type="number"
            inputMode="numeric"
            min={10}
            max={35}
            value={form.age}
            onChange={(e) => handleChange("age", e.target.value)}
            placeholder="e.g. 19"
            className={inputClasses}
            aria-invalid={Boolean(errors.age)}
          />
        </Field>

        <Field label="Email" htmlFor="email" error={errors.email}>
          <input
            id="email"
            type="email"
            value={form.email}
            onChange={(e) => handleChange("email", e.target.value)}
            placeholder="you@example.com"
            className={inputClasses}
            aria-invalid={Boolean(errors.email)}
            autoComplete="email"
          />
        </Field>

        <Field label="Phone Number" htmlFor="phone" error={errors.phone}>
          <input
            id="phone"
            type="tel"
            value={form.phone}
            onChange={(e) => handleChange("phone", e.target.value)}
            placeholder="e.g. +234 801 234 5678"
            className={inputClasses}
            aria-invalid={Boolean(errors.phone)}
            autoComplete="tel"
          />
        </Field>

        <Field label="City / State" htmlFor="cityState" error={errors.cityState}>
          <input
            id="cityState"
            type="text"
            value={form.cityState}
            onChange={(e) => handleChange("cityState", e.target.value)}
            placeholder="e.g. Abuja, FCT"
            className={inputClasses}
            aria-invalid={Boolean(errors.cityState)}
            autoComplete="address-level2"
          />
        </Field>

        <Field label="School / Organization" htmlFor="school">
          <input
            id="school"
            type="text"
            value={form.school}
            onChange={(e) => handleChange("school", e.target.value)}
            placeholder="e.g. University of Abuja (optional)"
            className={inputClasses}
          />
        </Field>

        <Field
          label="Area of Interest"
          htmlFor="interest"
          error={errors.interest}
        >
          <select
            id="interest"
            value={form.interest}
            onChange={(e) => handleChange("interest", e.target.value)}
            className={inputClasses}
            aria-invalid={Boolean(errors.interest)}
          >
            <option value="">Select an area…</option>
            {interestOptions.map((option) => (
              <option key={option} value={option}>
                {option}
              </option>
            ))}
          </select>
        </Field>

        <Field
          label="How did you hear about YEP?"
          htmlFor="hearAbout"
        >
          <select
            id="hearAbout"
            value={form.hearAbout}
            onChange={(e) => handleChange("hearAbout", e.target.value)}
            className={inputClasses}
          >
            <option value="">Select an option…</option>
            {hearAboutOptions.map((option) => (
              <option key={option} value={option}>
                {option}
              </option>
            ))}
          </select>
        </Field>

        <Field
          label="Why do you want to join YEP?"
          htmlFor="reason"
          error={errors.reason}
        >
          <textarea
            id="reason"
            rows={4}
            value={form.reason}
            onChange={(e) => handleChange("reason", e.target.value)}
            placeholder="Tell us about your goals and what you hope to gain from YEP."
            className={inputClasses}
            aria-invalid={Boolean(errors.reason)}
          />
        </Field>
      </div>

      <div className="mt-6">
        <label className="flex items-start gap-3 text-sm text-slate-600">
          <input
            type="checkbox"
            checked={form.consent}
            onChange={(e) => handleChange("consent", e.target.checked)}
            className="mt-0.5 h-4 w-4 shrink-0 rounded border-brand-900/30 accent-brand-900"
            aria-invalid={Boolean(errors.consent)}
          />
          <span>
            I consent to YEP contacting me about my application.
            <span className="text-red-600"> *</span>
          </span>
        </label>
        {errors.consent && (
          <p role="alert" className="mt-1.5 text-xs font-medium text-red-600">
            {errors.consent}
          </p>
        )}
      </div>

      {submitError && (
        <div
          role="alert"
          className="mt-6 rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm font-medium text-red-700"
        >
          {submitError}
        </div>
      )}

      <button
        type="submit"
        disabled={submitting}
        className="mt-8 inline-flex w-full items-center justify-center gap-2 rounded-full bg-accent-500 px-6 py-3.5 text-sm font-semibold text-brand-950 transition-colors hover:bg-accent-400 disabled:cursor-not-allowed disabled:opacity-60 sm:w-auto"
      >
        <Send className="h-4 w-4" />
        {submitting ? "Submitting…" : "Submit Application"}
      </button>
    </form>
  );
}

export function ApplyProcessList() {
  const stepsList = [
    {
      icon: ClipboardCheck,
      title: "Review",
      text: "The YEP team reviews every application.",
    },
    {
      icon: MailCheck,
      title: "Contact",
      text: "You will be contacted at the email you provide.",
    },
    {
      icon: Clock,
      title: "Next steps",
      text: "Invitations and program details are shared directly.",
    },
  ];

  return (
    <ul className="mt-8 space-y-4">
      {stepsList.map((step) => (
        <li key={step.title} className="flex items-start gap-4">
          <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-brand-900 text-white">
            <step.icon className="h-5 w-5" />
          </span>
          <div>
            <p className="font-semibold text-brand-950">{step.title}</p>
            <p className="text-sm text-slate-600">{step.text}</p>
          </div>
        </li>
      ))}
    </ul>
  );
}