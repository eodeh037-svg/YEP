import { ApplicationForm, ApplyProcessList } from "@/components/application-form";
import { AuthPanel } from "@/components/auth-panel";
import { Container } from "@/components/ui/container";
import { Reveal } from "@/components/ui/reveal";

export function Apply() {
  return (
    <section id="apply" className="bg-white py-20 lg:py-28">
      <Container>
        <div className="grid gap-12 lg:grid-cols-2 lg:gap-16">
          <Reveal>
            <div>
              <p className="mb-3 text-xs font-semibold uppercase tracking-widest text-accent-600">
                Apply
              </p>
              <h2 className="font-display text-3xl font-bold tracking-tight text-brand-950 sm:text-4xl text-balance">
                Ready to join YEP?
              </h2>
              <p className="mt-4 text-base leading-relaxed text-slate-600 sm:text-lg text-pretty">
                Create a free YEP account to sign in and submit your
                application. The YEP team will match you with the right
                opportunities.
              </p>
              <div className="mt-8">
                <AuthPanel />
              </div>
              <ApplyProcessList />
              <p className="mt-8 rounded-xl border border-accent-500/20 bg-accent-50 p-4 text-sm leading-relaxed text-accent-800">
                Prefer to wait?{" "}
                <a href="#contact" className="font-semibold underline underline-offset-2 hover:text-accent-700">
                  Get in touch with YEP
                </a>{" "}
                and we will answer your questions before you apply.
              </p>
            </div>
          </Reveal>

          <Reveal delay={150}>
            <ApplicationForm />
          </Reveal>
        </div>
      </Container>
    </section>
  );
}