import { Hero } from "@/components/hero";
import { About } from "@/components/about";
import { Programs } from "@/components/programs";
import { HowItWorks } from "@/components/how-it-works";
import { Mentorship } from "@/components/mentorship";
import { Events } from "@/components/events";
import { Impact } from "@/components/impact";
import { Stories } from "@/components/stories";
import { GetInvolved } from "@/components/get-involved";
import { Apply } from "@/components/apply";
import { Contact } from "@/components/contact";

export default function Home() {
  return (
    <>
      <Hero />
      <About />
      <Programs />
      <HowItWorks />
      <Mentorship />
      <Events />
      <Impact />
      <Stories />
      <GetInvolved />
      <Apply />
      <Contact />
    </>
  );
}
