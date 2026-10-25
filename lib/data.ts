// ============================================================
// YEP — all editable website content lives here.
// Change text, stats, events, and placeholders in this file.
// ============================================================

export const siteConfig = {
  name: "YEP",
  fullName: "YEP — Youth Empowerment Program",
  tagline: "Empowering Young Minds. Building Stronger Futures.",
  location: "Abuja, Nigeria",
} as const;

// ------------------------------------------------------------
// Navigation
// ------------------------------------------------------------
export const navLinks = [
  { label: "Home", href: "#home" },
  { label: "About", href: "#about" },
  { label: "Programs", href: "#programs" },
  { label: "Mentorship", href: "#mentorship" },
  { label: "Events", href: "#events" },
  { label: "Impact", href: "#impact" },
  { label: "Get Involved", href: "#get-involved" },
  { label: "Contact", href: "#contact" },
] as const;

// ------------------------------------------------------------
// Hero
// ------------------------------------------------------------
export const hero = {
  headlineTop: "Empowering Young Minds.",
  headlineBottom: "Building Stronger Futures.",
  description:
    "YEP helps young people discover career opportunities, develop entrepreneurial skills, gain practical knowledge, connect with mentors, and build a clearer path toward a successful future.",
  primaryCta: { label: "Join YEP", href: "#apply" },
  secondaryCta: { label: "Explore Programs", href: "#programs" },
} as const;

// ------------------------------------------------------------
// About
// ------------------------------------------------------------
export type FocusArea = {
  title: string;
  description: string;
};

export const about = {
  eyebrow: "About YEP",
  title: "More informed. More skilled. More ready for the future.",
  description:
    "YEP is a youth-focused initiative helping young people become more informed, skilled, disciplined, and prepared for education, careers, entrepreneurship, and life.",
  focusAreas: [
    {
      title: "Career Guidance",
      description:
        "Counseling on career paths, job-market trends, and informed decision-making to help young people choose their futures.",
    },
    {
      title: "Entrepreneurship",
      description:
        "Business fundamentals and startup skills that turn ideas into sustainable ventures.",
    },
    {
      title: "Skills Development",
      description:
        "Practical, industry-relevant training that prepares young people for employment and self-employment.",
    },
    {
      title: "Mentorship",
      description:
        "Real-world guidance from experienced professionals who share perspective and encouragement.",
    },
    {
      title: "Leadership",
      description:
        "Confidence, communication, decision-making, and discipline to lead in school, work, and community.",
    },
    {
      title: "Personal Development",
      description:
        "Growth in discipline, time management, and personal effectiveness for everyday life.",
    },
    {
      title: "Opportunities & Networking",
      description:
        "Access to programs, events, and connections with peers, mentors, and organizations.",
    },
  ],
} as const;

// ------------------------------------------------------------
// Programs
// ------------------------------------------------------------
// `icon` maps to a Lucide icon in components/programs.tsx.
export type Program = {
  title: string;
  description: string;
  icon: string;
};

export const programs: Program[] = [
  {
    title: "Career Guidance",
    description:
      "Helping young people understand career paths, discover opportunities, and make informed decisions about their future.",
    icon: "compass",
  },
  {
    title: "Entrepreneurship",
    description:
      "Introducing young people to entrepreneurship, business thinking, innovation, and the skills needed to turn ideas into opportunities.",
    icon: "lightbulb",
  },
  {
    title: "Skills Development",
    description:
      "Helping young people develop practical and relevant skills that prepare them for education, employment, entrepreneurship, and the future of work.",
    icon: "wrench",
  },
  {
    title: "Mentorship",
    description:
      "Connecting young people with experienced professionals who can provide guidance, perspective, encouragement, and practical knowledge.",
    icon: "users",
  },
  {
    title: "Leadership & Personal Development",
    description:
      "Developing confidence, discipline, communication, leadership, decision-making, and other qualities that help young people grow.",
    icon: "badgeCheck",
  },
];

// ------------------------------------------------------------
// How YEP Works
// ------------------------------------------------------------
export const steps = [
  {
    number: "01",
    title: "Discover",
    description: "Explore careers, skills, opportunities, and possibilities.",
    icon: "search",
  },
  {
    number: "02",
    title: "Learn",
    description:
      "Access useful resources, workshops, training, and practical knowledge.",
    icon: "bookOpen",
  },
  {
    number: "03",
    title: "Connect",
    description: "Meet mentors, professionals, and ambitious young people.",
    icon: "handshake",
  },
  {
    number: "04",
    title: "Grow",
    description:
      "Use what you learn to build your education, career, entrepreneurship journey, and life.",
    icon: "trendingUp",
  },
];

// ------------------------------------------------------------
// Mentorship
// ------------------------------------------------------------
export const mentorship = {
  eyebrow: "Mentorship",
  headline: "Learn From People Who Have Walked the Path",
  description:
    "Experienced professionals can provide guidance, knowledge, perspective, and practical advice to help young people navigate important decisions and opportunities.",
  primaryCta: { label: "Become a Mentor", href: "#apply" },
  secondaryCta: { label: "Find a Mentor", href: "#mentor-directory" },
} as const;

// ------------------------------------------------------------
// Events
// ------------------------------------------------------------
// Supported event types shown when the schedule is empty.
export const supportedEventTypes = [
  "Career Seminars",
  "Entrepreneurship Workshops",
  "School Programs",
  "Youth Conferences",
  "Mentorship Sessions",
  "Skills Training",
] as const;

// Shape of one event. Fill this array to publish events — nothing
// else needs to change. The UI renders "coming soon" while it's empty.
export type YepEvent = {
  name: string;
  date: string;
  location: string;
  description: string;
  registerHref: string;
};

export const events: YepEvent[] = [];

// ------------------------------------------------------------
// Impact (EDITABLE PLACEHOLDER VALUES — not verified results)
// ------------------------------------------------------------
export type ImpactStat = {
  value: string;
  label: string;
};

export const impactStats: ImpactStat[] = [
  { value: "100+", label: "Young people targeted for early programs" },
  { value: "Growing", label: "Mentor & professional network" },
  { value: "Nigeria", label: "Our starting point" },
  { value: "1", label: "Mission — Empower young people" },
];

// ------------------------------------------------------------
// Stories (PLACEHOLDERS — replace with verified YEP stories)
// ------------------------------------------------------------
export type Story = {
  quote: string;
  name: string;
  role: string;
  isPlaceholder: boolean;
};

export const stories: Story[] = [
  {
    quote:
      "Testimonial placeholder — replace with a verified YEP participant story.",
    name: "YEP Participant",
    role: "Program participant",
    isPlaceholder: true,
  },
  {
    quote:
      "Testimonial placeholder — replace with a verified YEP participant story.",
    name: "YEP Participant",
    role: "Program participant",
    isPlaceholder: true,
  },
  {
    quote:
      "Testimonial placeholder — replace with a verified YEP participant story.",
    name: "YEP Participant",
    role: "Program participant",
    isPlaceholder: true,
  },
];

// ------------------------------------------------------------
// Get Involved
// ------------------------------------------------------------
export type InvolvementCard = {
  title: string;
  description: string;
  icon: string;
  cta: { label: string; href: string };
};

export const involvementCards: InvolvementCard[] = [
  {
    title: "Join YEP",
    description:
      "Apply to be part of YEP and access career guidance, skills training, mentorship, and a community of ambitious young people.",
    icon: "userPlus",
    cta: { label: "Apply now", href: "#apply" },
  },
  {
    title: "Become a Mentor",
    description:
      "Share your experience and guide a young person through important career and life decisions.",
    icon: "heartHandshake",
    cta: { label: "Offer mentorship", href: "#apply" },
  },
  {
    title: "Partner With Us",
    description:
      "YEP works with schools, organizations, NGOs, ministries, institutions, and youth-focused organizations to reach more young people.",
    icon: "building",
    cta: { label: "Partner with YEP", href: "#contact" },
  },
  {
    title: "Sponsor YEP",
    description:
      "Support YEP programs, workshops, and resources that help young people build capable, productive futures.",
    icon: "gift",
    cta: { label: "Sponsor a program", href: "#contact" },
  },
];

// ------------------------------------------------------------
// Application form options
// ------------------------------------------------------------
export const interestOptions = [
  "Career Guidance",
  "Entrepreneurship",
  "Skills Development",
  "Mentorship",
  "Leadership & Personal Development",
  "Not sure yet — explore first",
];

export const hearAboutOptions = [
  "Social media",
  "Friend or family",
  "School",
  "Search engine",
  "Event",
  "Other",
];

// ------------------------------------------------------------
// Mentor directory
// ------------------------------------------------------------
// Fields mentors can be listed under, used for the sign-up select
// and the directory filter.
export const mentorSpecialties = [
  "Career Guidance",
  "Entrepreneurship",
  "Skills Development",
  "Technology & Software",
  "Finance & Business",
  "Health & Life Sciences",
  "Education & Teaching",
  "Leadership & Management",
  "Engineering",
  "Arts & Creative",
  "Law & Public Policy",
  "Other",
];

// ------------------------------------------------------------
// Contact (official YEP details)
// ------------------------------------------------------------
export const contact = {
  eyebrow: "Contact",
  title: "Get In Touch With YEP",
  description:
    "Have a question, an opportunity, or an idea for collaboration? Reach out — we would love to hear from you.",
  email: "Yepnigeria1213@gmail.com",
  phone: "09063732903",
  location: siteConfig.location,
  socials: [
    { name: "Instagram", url: "" },
    { name: "TikTok", url: "" },
    { name: "Facebook", url: "" },
    { name: "X", url: "https://x.com/Yep_nigeria" },
    { name: "LinkedIn", url: "" },
  ],
} as const;

// ------------------------------------------------------------
// Footer
// ------------------------------------------------------------
export const footerQuickLinks = navLinks.filter(
  (link) => link.label !== "Get Involved"
);

export const footerInvolvementLinks = [
  { label: "Join YEP", href: "#apply" },
  { label: "Become a Mentor", href: "#apply" },
  { label: "Partner With Us", href: "#contact" },
  { label: "Sponsor YEP", href: "#contact" },
] as const;
