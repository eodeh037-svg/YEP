type ButtonProps = {
  href?: string;
  variant?: "primary" | "accent" | "outline" | "outline-light";
  className?: string;
  children: React.ReactNode;
} & (
  | { href?: string; onClick?: never }
  | { href?: never; onClick?: () => void }
);

const baseClasses =
  "inline-flex items-center justify-center gap-2 rounded-full px-6 py-3 text-sm font-semibold transition-colors duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-500 focus-visible:ring-offset-2";

const variants = {
  primary: "bg-brand-900 text-white hover:bg-brand-800",
  accent: "bg-accent-500 text-brand-950 hover:bg-accent-400",
  outline: "border border-brand-900/20 text-brand-900 hover:bg-brand-50",
  "outline-light":
    "border border-white/30 text-white hover:bg-white/10",
} as const;

export function Button({
  href,
  variant = "primary",
  className = "",
  children,
  onClick,
}: ButtonProps) {
  const classes = `${baseClasses} ${variants[variant]} ${className}`;

  if (href) {
    return (
      <a href={href} className={classes}>
        {children}
      </a>
    );
  }

  return (
    <button type="button" onClick={onClick} className={classes}>
      {children}
    </button>
  );
}