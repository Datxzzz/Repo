import { Reveal } from "@/components/reveal";

export function QuoteBand() {
  return (
    <section className="relative overflow-hidden bg-[#d7ff58] text-[#11150a]">
      <div className="quote-grid" aria-hidden="true" />
      <div className="container-site relative z-10 py-20 sm:py-28 lg:py-32">
        <div className="mb-10 flex items-center justify-between gap-6 border-b border-[#11150a]/15 pb-5">
          <span className="font-mono text-[9px] uppercase tracking-[0.17em] text-[#11150a]/55">
            Working principle / 04
          </span>
          <span className="flex items-center gap-2 font-mono text-[9px] uppercase tracking-[0.17em] text-[#11150a]/55">
            <span className="size-1.5 rounded-full bg-[#11150a]" />
            Non-negotiable
          </span>
        </div>

        <Reveal>
          <blockquote className="relative max-w-6xl font-serif text-[clamp(2.8rem,7.8vw,7.4rem)] italic leading-[0.92] tracking-[-0.035em]">
            <span className="absolute -left-3 -top-8 font-sans text-[clamp(3rem,6vw,5rem)] not-italic text-[#11150a]/20">
              “
            </span>
            Good interfaces don&apos;t ask for attention.
            <br />
            They <span className="relative inline-block">repay it.
              <svg
                viewBox="0 0 300 20"
                preserveAspectRatio="none"
                className="absolute -bottom-2 left-0 h-2.5 w-full text-[#11150a]/35 sm:-bottom-3 sm:h-3"
                aria-hidden="true"
              >
                <path d="M2 14C68 4 198 3 298 10" stroke="currentColor" strokeWidth="2" fill="none" />
              </svg>
            </span>
          </blockquote>
        </Reveal>

        <Reveal delay={0.1}>
          <div className="mt-14 flex flex-col gap-8 border-t border-[#11150a]/15 pt-6 sm:flex-row sm:items-center sm:justify-between">
            <p className="max-w-sm text-[12px] leading-6 text-[#11150a]/60">
              A note taped above the desk. It is also the filter every project
              passes through before it ships.
            </p>
            <div className="flex items-center gap-5 self-start sm:self-auto">
              <span className="font-serif text-xl italic text-[#11150a]/75">
                — Yun
              </span>
              <svg
                viewBox="0 0 16 16"
                className="size-7 animate-[spin_22s_linear_infinite] text-[#11150a]/50"
                aria-hidden="true"
              >
                <path
                  d="M8 0c.4 4.5 3.5 7.6 8 8-4.5.4-7.6 3.5-8 8-.4-4.5-3.5-7.6-8-8 4.5-.4 7.6-3.5 8-8Z"
                  fill="currentColor"
                />
              </svg>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}