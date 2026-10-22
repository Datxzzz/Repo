import { ArrowDownRight } from "lucide-react";
import { Reveal } from "@/components/reveal";
import { SectionHeading } from "@/components/section-heading";
import { processSteps } from "@/data/site";

export function ProcessSection() {
  return (
    <section className="relative border-t border-[var(--line)] py-24 sm:py-32 lg:py-36">
      <div className="container-site">
        <SectionHeading
          index="04"
          label="The process"
          title={
            <>
              A simple way to make{" "}
              <em className="accent-serif font-normal">
                hard things feel easy.
              </em>
            </>
          }
          description="No theatre, no ten-step decks. Just a tight loop of thinking, making, and pressure-testing until the product feels inevitable."
        />

        <div className="overflow-hidden rounded-[1.5rem] border border-[var(--line)] bg-[var(--line)] sm:rounded-[2rem]">
          <div className="grid gap-px sm:grid-cols-2 lg:grid-cols-4">
            {processSteps.map((step, index) => (
              <Reveal
                key={step.number}
                delay={index * 0.06}
                className="group relative bg-[var(--surface)] p-6 transition-colors duration-500 hover:bg-[var(--soft-strong)] sm:p-8"
              >
                <div className="flex items-start justify-between">
                  <span className="font-serif text-[3.5rem] italic leading-none text-[var(--line-strong)] transition-colors duration-500 group-hover:text-accent sm:text-[4rem]">
                    {step.number}
                  </span>
                  <ArrowDownRight className="size-4 text-muted/40 transition-all duration-500 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-accent" />
                </div>
                <h3 className="mt-10 font-display text-xl font-medium tracking-[-0.04em] text-ink">
                  {step.title}
                </h3>
                <p className="mt-3 max-w-[17rem] text-[12px] leading-6 text-muted">
                  {step.description}
                </p>
                <span className="absolute bottom-0 left-0 h-px w-0 bg-accent transition-[width] duration-500 group-hover:w-full" />
              </Reveal>
            ))}
          </div>
        </div>

        <Reveal>
          <div className="mt-8 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <p className="font-mono text-[9px] uppercase tracking-[0.14em] text-muted">
              Async-first · four time zones · one shared source of truth
            </p>
            <p className="text-[12px] text-muted">
              Usual engagement: 4—12 weeks, embedded with your team.
            </p>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
