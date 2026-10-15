import type { Metadata } from "next";
import { Geist, Plus_Jakarta_Sans } from "next/font/google";
import "./globals.css";
import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";
import { AuthProvider } from "@/components/auth-provider";
import { siteConfig } from "@/lib/data";

const geist = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const jakarta = Plus_Jakarta_Sans({
  variable: "--font-display",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "YEP — Youth Empowerment Program",
  description:
    "YEP — Youth Empowerment Program helps young people in Nigeria discover careers, learn entrepreneurship, build practical skills, find mentors, and build a clearer path toward a successful future.",
  openGraph: {
    title: "YEP — Youth Empowerment Program",
    description:
      "Empowering young minds and building stronger futures in Nigeria through career guidance, skills, mentorship, and entrepreneurship.",
    type: "website",
    locale: "en_NG",
    siteName: siteConfig.fullName,
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={`${geist.variable} ${jakarta.variable}`}>
        <div className="flex min-h-screen flex-col bg-white text-brand-950">
          <AuthProvider>
            <SiteHeader />
            <main className="flex-1">{children}</main>
            <SiteFooter />
          </AuthProvider>
        </div>
      </body>
    </html>
  );
}
