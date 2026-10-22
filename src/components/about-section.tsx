import {
  ArrowUpRight,
  Brain,
  Layers,
  Server,
  Sparkles,
  type LucideIcon,
} from "lucide-react";
import { LocalTime } from "@/components/local-time";
import { Reveal } from "@/components/reveal";
import { SpotlightCard } from "@/components/spotlight-card";
import { capabilities, principles, type Capability } from "@/data/site";
import { cn } from "@/lib/utils";

const iconMap: Record<Capability["icon"], LucideIcon> = {
  layers: Layers,
  sparkles: Sparkles,
  server: Server,
  brain: Brain,
};

function ProfileCard() {
  return (
    <div className="profile-card relative overflow-hidden rounded-[1.75rem] border border-white/10 sm:rounded-[2rem]">
      <div className="profile-grid" aria-hidden="true" />
      <div className="relative z-10 flex items-center justify-between border-b border-white/10 px-5 py-4 sm:px-6">
        <span className="font-mono text-[8px] uppercase tracking-[0.18em] text-white/45">
          Identity / YW—001
        </span>
        <span className="flex items-center gap-1.5 font-mono text-[8px] uppercase tracking-[0.18em] text-white/45">
          <span className="size-1 rounded-full bg-[#d7ff58]" />
          verified
        </span>
      </div>

      <div className="profile-visual relative flex h-[18rem] items-center justify-center overflow-hidden sm:h-[21rem]">
        <div className="profile-orbit profile-orbit-one" aria-hidden="true" />
        <div className="profile-orbit profile-orbit-two" aria-hidden="true" />
        <div className="profile-halo" aria-hidden="true" />
        <span className="profile-initials" aria-hidden="true">
          YW
        </span>
        <span className="absolute left-5 top-5 font-mono text-[8px] uppercase tracking-[0.16em] text-white/35 sm:left-6 sm:top-6">
          Product engineer
        </span>
        <span className="absolute bottom-5 right-5 rotate-180 font-mono text-[8px] uppercase tracking-[0.2em] text-white/35 [writing-mode:vertical-rl] sm:bottom-6 sm:right-6">
          Jakarta — worldwide
        </span>
        <span className="absolute bottom-5 left-5 flex items-center gap-2 rounded-full border border-white/15 bg-black/25 px-3 py-1.5 font-mono text-[8px] uppercase tracking-[0.12em] text-white/70 backdrop-blur-md sm:bottom-6 sm:left-6">
          <span className="size-1.5 animate-pulse rounded-full bg-[#d7ff58]" />
          Open for select work
        </span>
      </div>

      <div className="relative z-10 px-5 py-6 sm:px-6 sm:py-7">
        <div className="flex items-end justify-between gap-4">
          <div>
            <p className="font-display text-[1.9rem] font-medium leading-none tracking-[-0.05em] text-[#f3f4ea]">
              Yun Wangshu
            </p>
            <p className="mt-2 text-[11px] tracking-[-0.01em] text-white/45">
              Independent product engineer
            </p>
          </div>
          <span className="font-mono text-[8px] uppercase tracking-[0.14em] text-white/35">
            Est. 2018
          </span>
        </div>

        <div className="mt-6 grid grid-cols-2 gap-x-5 gap-y-4 border-t border-white/10 pt-5">
          <div>
            <p className="font-mono text-[7.5px] uppercase tracking-[0.15em] text-white/35">
              Base
            </p>
            <p className="mt-1 text-[11px] font-medium text-white/80">
              Jakarta, ID
            </p>
          </div>
          <div>
            <p className="font-mono text-[7.5px] uppercase tracking-[0.15em] text-white/35">
              Focus
            </p>
            <p className="mt-1 text-[11px] font-medium text-white/80">
              Interface × systems
            </p>
          </div>
          <div>
            <p className="font-mono text-[7.5px] uppercase tracking-[0.15em] text-white/35">
              Local time
            </p>
            <p className="mt-1 text-[11px] font-medium text-white/80">
              <LocalTime />
            </p>
          </div>
          <div>
            <p className="font-mono text-[7.5px] uppercase tracking-[0.15em] text-white/35">
              Currently
            </p>
            <p className="mt-1 text-[11px] font-medium text-[#d7ff58]">
              Building, quietly
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export function AboutSection() {
  return (
    <section
      id="about"
      className="relative scroll-mt-28 border-y border-[var(--line)] bg-[var(--soft)] py-24 sm:py-32 lg:py-40"
    >
      <div className="container-site">
        <div className="grid gap-16 lg:grid-cols-[1fr_0.72fr] lg:gap-20 xl:gap-28">
          <div>
            <Reveal>
              <div className="mb-8 flex items-center gap-3 font-mono text-[9.5px] uppercase tracking-[0.16em] text-muted">
                <span className="text-ink">02</span>
                <span className="h-px w-6 bg-[var(--line-strong)]" />
                <span>About</span>
              </div>
            </Reveal>

            <Reveal delay={0.05}>
              <h2 className="max-w-2xl font-display text-[clamp(2.4rem,5.2vw,4.5rem)] font-medium leading-[0.98] tracking-[-0.06em] text-ink">
                The details are the{" "}
                <em className="accent-serif gradient-text font-normal">
                  product.
                </em>
              </h2>
            </Reveal>

            <div className="mt-8 max-w-xl space-y-5 text-[14.5px] leading-7 text-muted">
              <Reveal delay={0.1}>
                <p>
                  I&apos;m Yun — an independent product engineer based in
                  Jakarta. For the last eight years, I&apos;ve worked wherever
                  design meets code: shaping the interface, then building the
                  systems that make it real.
                </p>
              </Reveal>
              <Reveal delay={0.15}>
                <p>
                  I care about the space between disciplines. The best work
                  happens when the person drawing the flow is also the person
                  shipping the API. That&apos;s the seam I like to live in —
                  close enough to the craft to sweat the details, close enough
                  to the infrastructure to keep them honest.
                </p>
              </Reveal>
            </div>

            <Reveal delay={0.2}>
              <ol className="mt-10 max-w-lg divide-y divide-[var(--line)] border-y border-[var(--line)]">
                {principles.map((principle, index) => (
                  <li
                    key={principle}
                    className="group flex items-center gap-5 py-4"
                  >
                    <span className="font-mono text-[9px] text-muted">
                      0{index + 1}
                    </span>
                    <span className="flex-1 font-display text-[15px] font-medium tracking-[-0.02em] text-ink">
                      {principle}
                    </span>
                    <Sparkles className="size-3 text-muted/40 transition-colors duration-300 group-hover:text-accent" />
                  </li>
                ))}
              </ol>
            </Reveal>

            <Reveal delay={0.25}>
              <a
                href="#contact"
                className="group mt-10 inline-flex items-center gap-2 text-[13px] font-semibold text-ink"
              >
                More about how I work
                <span className="flex size-7 items-center justify-center rounded-full border border-[var(--line)] transition-colors group-hover:border-accent group-hover:bg-accent group-hover:text-[var(--accent-ink)]">
                  <ArrowUpRight className="size-3 transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
                </span>
              </a>
            </Reveal>
          </div>

          <Reveal delay={0.12} className="lg:pt-10">
            <ProfileCard />
            <p className="mt-4 flex items-center justify-between px-2 font-mono text-[8px] uppercase tracking-[0.14em] text-muted">
              <span>Available worldwide · GMT+7</span>
              <span>Ref. 2026</span>
            </p>
          </Reveal>
        </div>

        <div className="mt-24 sm:mt-28">
          <Reveal>
            <div className="mb-7 flex items-end justify-between gap-6 border-b border-[var(--line)] pb-5">
              <h3 className="font-display text-xl font-medium tracking-[-0.04em] text-ink sm:text-2xl">
                What I bring to the table
              </h3>
              <span className="font-mono text-[8.5px] uppercase tracking-[0.14em] text-muted">
                Capabilities / 04
              </span>
            </div>
          </Reveal>

          <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-12">
            {capabilities.map((capability, index) => {
              const Icon = iconMap[capability.icon];
              return (
                <Reveal
                  key={capability.title}
                  delay={index * 0.05}
                  className={cn(
                    "lg:col-span-6",
                    index === 0 && "lg:col-span-5",
                    index === 1 && "lg:col-span-7",
                    index === 2 && "lg:col-span-7",
                    index === 3 && "lg:col-span-5",
                  )}
                >
                  <SpotlightCard className="group relative flex h-full min-h-[15.5rem] flex-col overflow-hidden rounded-[1.5rem] border border-[var(--line)] bg-[var(--surface)] p-6 transition-colors duration-500 hover:border-[var(--line-strong)] sm:p-7">
                    <div className="flex items-start justify-between">
                      <span className="flex size-10 items-center justify-center rounded-full border border-[var(--line)] bg-[var(--soft)] text-ink transition-colors duration-500 group-hover:border-accent group-hover:bg-accent group-hover:text-[var(--accent-ink)]">
                        <Icon className="size-4" strokeWidth={1.5} />
                      </span>
                      <span className="font-mono text-[9px] tracking-[0.14em] text-muted">
                        {capability.number}
                      </span>
                    </div>
                    <h4 className="mt-7 font-display text-[1.45rem] font-medium tracking-[-0.04em] text-ink">
                      {capability.title}
                    </h4>
                    <p className="mt-2.5 max-w-md text-[12.5px] leading-6 text-muted">
                      {capability.description}
                    </p>
                    <ul className="mt-auto flex flex-wrap gap-1.5 pt-6">
                      {capability.tags.map((tag) => (
                        <li
                          key={tag}
                          className="rounded-full border border-[var(--line)] bg-[var(--soft)] px-2.5 py-1 font-mono text-[7.5px] uppercase tracking-[0.08em] text-muted"
                        >
                          {tag}
                        </li>
                      ))}
                    </ul>
                  </SpotlightCard>
                </Reveal>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}