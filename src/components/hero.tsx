"use client";

import {
  motion,
  useMotionValue,
  useReducedMotion,
  useSpring,
  useTransform,
} from "framer-motion";
import {
  ArrowDown,
  ArrowUpRight,
  Braces,
  MousePointer2,
  Sparkles,
} from "lucide-react";
import { useRef, type PointerEvent } from "react";
import { Magnetic } from "@/components/magnetic";
import { siteConfig } from "@/data/site";
import { easeOutExpo } from "@/components/reveal";

const headlineVariants = {
  hidden: { y: "115%", rotate: 2.5 },
  visible: {
    y: "0%",
    rotate: 0,
    transition: { duration: 1.05, ease: easeOutExpo },
  },
};

const fadeUp = {
  hidden: { opacity: 0, y: 22 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.8, ease: easeOutExpo },
  },
};

export function Hero() {
  const reduceMotion = useReducedMotion();
  const artRef = useRef<HTMLDivElement>(null);
  const pointerX = useMotionValue(0);
  const pointerY = useMotionValue(0);

  const rotateX = useSpring(
    useTransform(pointerY, [-0.5, 0.5], [5.5, -5.5]),
    { stiffness: 140, damping: 20 },
  );
  const rotateY = useSpring(
    useTransform(pointerX, [-0.5, 0.5], [-6.5, 6.5]),
    { stiffness: 140, damping: 20 },
  );
  const driftX = useSpring(useTransform(pointerX, [-0.5, 0.5], [-10, 10]), {
    stiffness: 90,
    damping: 20,
  });
  const driftY = useSpring(useTransform(pointerY, [-0.5, 0.5], [-10, 10]), {
    stiffness: 90,
    damping: 20,
  });
  const counterX = useSpring(useTransform(pointerX, [-0.5, 0.5], [6, -6]), {
    stiffness: 110,
    damping: 20,
  });
  const counterY = useSpring(useTransform(pointerY, [-0.5, 0.5], [6, -6]), {
    stiffness: 110,
    damping: 20,
  });

  function handlePointerMove(event: PointerEvent<HTMLDivElement>) {
    if (reduceMotion || event.pointerType !== "mouse" || !artRef.current) return;

    const rect = artRef.current.getBoundingClientRect();
    pointerX.set((event.clientX - rect.left) / rect.width - 0.5);
    pointerY.set((event.clientY - rect.top) / rect.height - 0.5);
  }

  function handlePointerLeave() {
    pointerX.set(0);
    pointerY.set(0);
  }

  return (
    <section
      id="top"
      className="relative overflow-hidden pb-10 pt-32 sm:pt-40 lg:pb-8 lg:pt-44"
    >
      <div className="hero-backdrop" aria-hidden="true">
        <div className="hero-blob hero-blob-one" />
        <div className="hero-blob hero-blob-two" />
      </div>

      <div className="container-site relative z-10">
        <div className="grid items-center gap-16 lg:grid-cols-[1.04fr_0.96fr] lg:gap-10 xl:gap-16">
          <motion.div
            initial="hidden"
            animate="visible"
            transition={{ staggerChildren: 0.09, delayChildren: 0.18 }}
          >
            <motion.div variants={fadeUp} className="mb-8 flex flex-wrap items-center gap-4">
              <span className="inline-flex items-center gap-2 rounded-full border border-[var(--line)] bg-[var(--soft)] py-1.5 pl-2 pr-3.5 font-mono text-[10px] uppercase tracking-[0.13em] text-muted backdrop-blur-md">
                <span className="relative flex size-4 items-center justify-center rounded-full bg-[var(--accent-soft)]">
                  <span className="absolute size-1.5 animate-ping rounded-full bg-accent opacity-60" />
                  <span className="relative size-1.5 rounded-full bg-accent" />
                </span>
                {siteConfig.availability}
              </span>
              <span className="hidden font-mono text-[10px] uppercase tracking-[0.13em] text-muted sm:block">
                {siteConfig.location}
              </span>
            </motion.div>

            <h1 className="font-display text-[clamp(2.85rem,11.5vw,4.9rem)] font-medium leading-[0.9] tracking-[-0.065em] text-ink xl:text-[clamp(4.9rem,6vw,6rem)]">
              <span className="mb-1 block overflow-hidden pb-[0.07em]">
                <motion.span variants={headlineVariants} className="block">
                  Digital products,
                </motion.span>
              </span>
              <span className="block overflow-hidden pb-[0.08em]">
                <motion.span variants={headlineVariants} className="block">
                  with a{" "}
                  <em className="accent-serif gradient-text pr-1 font-normal not-italic">
                    pulse.
                  </em>
                </motion.span>
              </span>
            </h1>

            <motion.p
              variants={fadeUp}
              className="mt-7 max-w-[30rem] text-[15px] leading-7 text-muted sm:text-base sm:leading-[1.75]"
            >
              I&apos;m Yun, an independent product engineer blending considered
              interface design with resilient full-stack systems. I make complex
              things feel simple — and a little alive.
            </motion.p>

            <motion.div
              variants={fadeUp}
              className="mt-9 flex flex-col gap-3 sm:flex-row sm:items-center"
            >
              <Magnetic>
                <a
                  href="#work"
                  className="group inline-flex h-[3.25rem] w-full items-center justify-center gap-2.5 rounded-full bg-accent px-6 text-[13px] font-bold tracking-[-0.01em] text-[var(--accent-ink)] shadow-[0_16px_40px_-18px_var(--accent)] transition-[background-color,box-shadow,transform] duration-300 hover:bg-[var(--accent-bright)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-canvas sm:w-auto"
                >
                  Explore selected work
                  <ArrowDown className="size-4 transition-transform duration-300 group-hover:translate-y-0.5" strokeWidth={1.9} />
                </a>
              </Magnetic>
              <Magnetic>
                <a
                  href="#lab"
                  className="glass-button group inline-flex h-[3.25rem] w-full items-center justify-center gap-2.5 rounded-full px-6 text-[13px] font-semibold tracking-[-0.01em] text-ink transition-colors duration-300 hover:border-[var(--line-strong)] hover:bg-[var(--soft-strong)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent sm:w-auto"
                >
                  <Braces className="size-4 text-muted transition-colors group-hover:text-accent" strokeWidth={1.7} />
                  Enter the lab
                </a>
              </Magnetic>
            </motion.div>

            <motion.div
              variants={fadeUp}
              className="mt-12 flex max-w-[31rem] items-stretch border-t border-[var(--line)] pt-6 sm:mt-14"
            >
              {siteConfig.heroStats.map((stat, index) => (
                <div
                  key={stat.label}
                  className={`flex-1 ${index > 0 ? "border-l border-[var(--line)] pl-5 sm:pl-7" : "pr-3"}`}
                >
                  <p className="font-display text-2xl font-medium tracking-[-0.04em] text-ink sm:text-[1.7rem]">
                    {stat.value}
                  </p>
                  <p className="mt-1 font-mono text-[9px] uppercase leading-4 tracking-[0.11em] text-muted">
                    {stat.label}
                  </p>
                </div>
              ))}
            </motion.div>
          </motion.div>

          <motion.div
            initial={reduceMotion ? false : { opacity: 0, scale: 0.96, y: 26 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            transition={{ duration: 1.1, delay: 0.55, ease: easeOutExpo }}
            className="relative mx-auto w-full max-w-[34rem] lg:max-w-none"
          >
            <div
              ref={artRef}
              onPointerMove={handlePointerMove}
              onPointerLeave={handlePointerLeave}
              className="relative mx-auto w-full max-w-[32rem]"
              style={{ perspective: 1200 }}
            >
              <motion.div
                style={reduceMotion ? undefined : { rotateX, rotateY }}
                className="hero-stage relative aspect-[0.92] w-full overflow-hidden rounded-[2.2rem] border border-white/10 shadow-[0_50px_120px_-55px_rgba(0,0,0,0.9)] sm:aspect-[1.02] sm:rounded-[2.6rem]"
              >
                <div className="stage-grid" aria-hidden="true" />
                <div className="stage-noise" aria-hidden="true" />
                <div className="absolute left-5 top-5 flex items-center gap-2 font-mono text-[8.5px] uppercase tracking-[0.17em] text-white/45 sm:left-7 sm:top-7">
                  <span className="size-1 rounded-full bg-[#d7ff58]" />
                  Fig. 01 / Interface × systems
                </div>
                <span className="absolute right-6 top-7 font-mono text-[8.5px] uppercase tracking-[0.17em] text-white/35 sm:right-7">
                  06°12′S · 106°49′E
                </span>

                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="relative flex aspect-square w-[67%] items-center justify-center">
                    <div className="orb-glow" aria-hidden="true" />
                    <svg
                      aria-hidden="true"
                      viewBox="0 0 200 200"
                      className="absolute inset-0 size-full animate-[spin_44s_linear_infinite] text-white/30"
                    >
                      <defs>
                        <path
                          id="hero-orbit-path"
                          d="M100,100 m-92,0 a92,92 0 1,1 184,0 a92,92 0 1,1 -184,0"
                        />
                      </defs>
                      <text className="fill-current font-mono text-[5.3px] uppercase tracking-[0.32em]">
                        <textPath href="#hero-orbit-path">
                          DESIGN · ENGINEER · SHIP · REFINE · INTERFACE ·
                          SYSTEMS ·
                        </textPath>
                      </text>
                    </svg>
                    <div className="orb-ring orb-ring-outer" aria-hidden="true" />
                    <div className="orb-ring orb-ring-inner" aria-hidden="true" />
                    <motion.div
                      style={
                        reduceMotion ? undefined : { x: counterX, y: counterY }
                      }
                      className="hero-orb"
                      aria-hidden="true"
                    />
                    <motion.div
                      style={reduceMotion ? undefined : { x: driftX, y: driftY }}
                      className="absolute right-[2%] top-[20%] flex size-11 rotate-6 items-center justify-center rounded-full border border-white/20 bg-white/10 shadow-[0_8px_30px_rgba(0,0,0,0.35)] backdrop-blur-md sm:size-14"
                    >
                      <Sparkles className="size-4 text-[#e8ff9f] sm:size-5" strokeWidth={1.3} />
                    </motion.div>
                    <div className="absolute bottom-[12%] left-[-6%] rounded-full border border-white/15 bg-black/35 px-3 py-1.5 font-mono text-[8px] uppercase tracking-[0.14em] text-white/60 backdrop-blur-lg">
                      craft / 001
                    </div>
                  </div>
                </div>

                <div className="absolute inset-x-4 bottom-4 sm:inset-x-6 sm:bottom-6">
                  <div className="rounded-[1.35rem] border border-white/15 bg-white/[0.08] p-4 backdrop-blur-2xl sm:p-5">
                    <div className="flex items-center justify-between gap-4">
                      <div className="flex items-center gap-3">
                        <span className="flex size-9 items-center justify-center rounded-full border border-white/15 bg-white/10">
                          <span className="size-2 rounded-full bg-[#d7ff58] shadow-[0_0_14px_#d7ff58]" />
                        </span>
                        <div>
                          <p className="font-mono text-[8px] uppercase tracking-[0.17em] text-white/45">
                            Currently
                          </p>
                          <p className="mt-0.5 text-[12px] font-medium tracking-[-0.01em] text-white/90 sm:text-[13px]">
                            Prototyping a polyglot edge toolkit
                          </p>
                        </div>
                      </div>
                      <ArrowUpRight className="hidden size-4 shrink-0 text-white/40 sm:block" />
                    </div>
                    <div className="mt-4 flex items-center justify-between border-t border-white/10 pt-3 font-mono text-[8px] uppercase tracking-[0.14em] text-white/35">
                      <span>Interaction</span>
                      <span>Infrastructure</span>
                      <span>Motion</span>
                    </div>
                  </div>
                </div>

                <span className="absolute left-[7%] top-[20%] text-white/20" aria-hidden="true">
                  +
                </span>
                <span className="absolute right-[8%] top-[42%] text-white/20" aria-hidden="true">
                  +
                </span>
                <span className="absolute bottom-[32%] left-[12%] text-white/20" aria-hidden="true">
                  +
                </span>
              </motion.div>

              <motion.div
                style={reduceMotion ? undefined : { x: counterX, y: counterY }}
                className="absolute -right-2 top-[16%] hidden rotate-3 sm:flex lg:-right-7"
              >
                <div className="flex items-center gap-3 rounded-2xl border border-[var(--line)] bg-[var(--surface)]/85 px-4 py-3 shadow-[var(--card-shadow)] backdrop-blur-2xl">
                  <span className="flex size-8 items-center justify-center rounded-full bg-[var(--accent-soft)] text-accent">
                    <MousePointer2 className="size-3.5" strokeWidth={1.8} />
                  </span>
                  <div>
                    <p className="font-mono text-[8px] uppercase tracking-[0.15em] text-muted">
                      Based in
                    </p>
                    <p className="mt-0.5 text-[11px] font-semibold tracking-[-0.01em] text-ink">
                      Jakarta, ID
                    </p>
                  </div>
                </div>
              </motion.div>

              <motion.div
                style={reduceMotion ? undefined : { x: driftX, y: driftY }}
                className="absolute -bottom-7 left-4 hidden sm:block lg:-left-7"
              >
                <div className="flex items-center gap-3 rounded-full border border-[var(--line)] bg-[var(--surface)]/85 py-2 pl-2 pr-4 shadow-[var(--card-shadow)] backdrop-blur-2xl">
                  <span className="flex size-8 items-center justify-center rounded-full bg-gradient-to-br from-[#d7ff58] via-[#8fe3d1] to-[#ff9d7d] font-display text-[10px] font-bold text-[#0b0d08]">
                    YW
                  </span>
                  <span className="font-mono text-[9px] uppercase tracking-[0.13em] text-muted">
                    Available · Q1 &apos;27
                  </span>
                </div>
              </motion.div>
            </div>
          </motion.div>
        </div>

        <div className="mt-20 hidden items-center justify-between border-t border-[var(--line)] py-5 lg:flex">
          <p className="font-mono text-[9.5px] uppercase tracking-[0.14em] text-muted">
            Independent by design · 2018—{new Date().getFullYear()}
          </p>
          <a
            href="#work"
            className="group flex items-center gap-3 font-mono text-[9.5px] uppercase tracking-[0.14em] text-muted transition-colors hover:text-ink"
          >
            Scroll to explore
            <span className="flex size-7 items-center justify-center rounded-full border border-[var(--line)] transition-colors group-hover:border-ink">
              <ArrowDown className="size-3 transition-transform duration-300 group-hover:translate-y-0.5" />
            </span>
          </a>
          <p className="font-mono text-[9.5px] uppercase tracking-[0.14em] text-muted">
            Portfolio / 2026
          </p>
        </div>
      </div>
    </section>
  );
}