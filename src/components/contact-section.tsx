"use client";

import { motion } from "framer-motion";
import {
  ArrowUpRight,
  Check,
  Copy,
  Mail,
  Sparkles,
} from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { LocalTime } from "@/components/local-time";
import { Magnetic } from "@/components/magnetic";
import { Reveal } from "@/components/reveal";
import { siteConfig } from "@/data/site";

export function ContactSection() {
  const [copied, setCopied] = useState(false);
  const timerRef = useRef<number | undefined>(undefined);

  useEffect(
    () => () => {
      if (timerRef.current) window.clearTimeout(timerRef.current);
    },
    [],
  );

  async function copyEmail() {
    try {
      await navigator.clipboard.writeText(siteConfig.email);
      setCopied(true);
      if (timerRef.current) window.clearTimeout(timerRef.current);
      timerRef.current = window.setTimeout(() => setCopied(false), 2000);
    } catch {
      setCopied(false);
    }
  }

  return (
    <section id="contact" className="relative scroll-mt-28 pb-8 pt-10 sm:pt-16">
      <div className="container-site">
        <Reveal>
          <div className="contact-panel relative overflow-hidden rounded-[1.75rem] px-5 pb-5 pt-12 sm:rounded-[2.5rem] sm:px-8 sm:pb-8 sm:pt-16 lg:px-14 lg:pt-20">
            <div className="contact-grid" aria-hidden="true" />
            <div className="contact-glow contact-glow-one" aria-hidden="true" />
            <div className="contact-glow contact-glow-two" aria-hidden="true" />

            <div className="relative z-10">
              <div className="grid gap-12 lg:grid-cols-[1fr_0.54fr] lg:gap-16">
                <div>
                  <div className="mb-7 flex flex-wrap items-center gap-3">
                    <span className="flex items-center gap-2 rounded-full border border-white/15 bg-white/[0.05] px-3 py-1.5 font-mono text-[8.5px] uppercase tracking-[0.14em] text-white/55 backdrop-blur-md">
                      <span className="relative flex size-1.5">
                        <span className="absolute inline-flex size-full animate-ping rounded-full bg-[#d7ff58] opacity-60" />
                        <span className="relative size-1.5 rounded-full bg-[#d7ff58]" />
                      </span>
                      {siteConfig.availability}
                    </span>
                    <span className="font-mono text-[8.5px] uppercase tracking-[0.14em] text-white/30">
                      Let&apos;s build something
                    </span>
                  </div>

                  <h2 className="max-w-4xl font-display text-[clamp(2.6rem,6.4vw,5.8rem)] font-medium leading-[0.94] tracking-[-0.065em] text-[#f3f4ea]">
                    Let&apos;s make something
                    <br />
                    <em className="contact-serif font-normal">
                      worth remembering.
                    </em>
                  </h2>

                  <p className="mt-7 max-w-md text-[13.5px] leading-6 text-white/45 sm:text-sm sm:leading-7">
                    Have a product that deserves more care, a system that needs
                    untangling, or a bold idea looking for its first real
                    version? I&apos;d love to hear it.
                  </p>

                  <div className="mt-9 flex flex-col gap-3 sm:flex-row sm:items-center">
                    <Magnetic>
                      <a
                        href={`mailto:${siteConfig.email}?subject=Let%27s%20work%20together`}
                        className="group inline-flex h-[3.5rem] w-full items-center justify-center gap-2.5 rounded-full bg-[#d7ff58] px-7 text-[13px] font-bold tracking-[-0.01em] text-[#11150a] transition-colors duration-300 hover:bg-[#e3ff8a] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#d7ff58] focus-visible:ring-offset-2 focus-visible:ring-offset-[#0a0c08] sm:w-auto"
                      >
                        <Mail className="size-4" strokeWidth={1.8} />
                        Start a conversation
                        <ArrowUpRight className="size-4 transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
                      </a>
                    </Magnetic>

                    <button
                      type="button"
                      onClick={copyEmail}
                      className="group inline-flex h-[3.5rem] w-full items-center justify-center gap-2.5 rounded-full border border-white/15 bg-white/[0.04] px-6 text-[12.5px] font-semibold text-white/70 backdrop-blur-md transition-colors duration-300 hover:border-white/30 hover:bg-white/[0.08] hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#d7ff58] sm:w-auto"
                      aria-live="polite"
                    >
                      {copied ? (
                        <Check className="size-4 text-[#d7ff58]" strokeWidth={2} />
                      ) : (
                        <Copy className="size-4" strokeWidth={1.7} />
                      )}
                      {copied ? "Email copied" : "Copy email"}
                    </button>
                  </div>

                  <div className="mt-8 flex flex-wrap items-center gap-x-5 gap-y-3">
                    {siteConfig.socials.map((social) => (
                      <a
                        key={social.label}
                        href={social.href}
                        target="_blank"
                        rel="noreferrer"
                        className="group inline-flex items-center gap-1.5 text-[11.5px] text-white/35 transition-colors hover:text-white/80"
                      >
                        {social.label}
                        <ArrowUpRight className="size-3 opacity-50 transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
                      </a>
                    ))}
                  </div>
                </div>

                <div className="flex flex-col gap-3 lg:pt-2">
                  <div className="rounded-[1.4rem] border border-white/12 bg-white/[0.055] p-5 backdrop-blur-2xl sm:p-6">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <span className="flex size-10 items-center justify-center rounded-full bg-gradient-to-br from-[#d7ff58] via-[#9fe8d2] to-[#ff9d7d] font-display text-[11px] font-bold text-[#0b0d08]">
                          YW
                        </span>
                        <div>
                          <p className="text-[12px] font-semibold text-white/85">
                            Yun Wangshu
                          </p>
                          <p className="mt-0.5 font-mono text-[8px] uppercase tracking-[0.12em] text-white/35">
                            Independent · Jakarta
                          </p>
                        </div>
                      </div>
                      <Sparkles className="size-4 text-[#d7ff58]/70" strokeWidth={1.3} />
                    </div>

                    <div className="mt-6 border-t border-white/10 pt-5">
                      <p className="font-mono text-[8px] uppercase tracking-[0.15em] text-white/30">
                        Local time
                      </p>
                      <p className="mt-1 font-display text-[2.4rem] font-medium leading-none tracking-[-0.05em] text-[#f3f4ea]">
                        <LocalTime showZone={false} />
                        <span className="ml-2 font-mono text-[9px] font-normal tracking-[0.1em] text-white/30">
                          WIB
                        </span>
                      </p>
                    </div>

                    <div className="mt-5 grid grid-cols-2 gap-3 border-t border-white/10 pt-5">
                      <div>
                        <p className="font-mono text-[7.5px] uppercase tracking-[0.14em] text-white/30">
                          Response
                        </p>
                        <p className="mt-1 text-[11px] text-white/65">
                          Within 24h
                        </p>
                      </div>
                      <div>
                        <p className="font-mono text-[7.5px] uppercase tracking-[0.14em] text-white/30">
                          Starting
                        </p>
                        <p className="mt-1 text-[11px] text-white/65">
                          Q1 2027
                        </p>
                      </div>
                    </div>
                  </div>

                  <a
                    href={`mailto:${siteConfig.email}`}
                    className="group flex items-center justify-between rounded-[1.2rem] border border-white/10 bg-black/20 px-5 py-4 backdrop-blur-xl transition-colors hover:border-white/20 hover:bg-black/30"
                  >
                    <span className="truncate font-mono text-[10px] text-white/50 group-hover:text-white/75">
                      {siteConfig.email}
                    </span>
                    <ArrowUpRight className="size-3.5 shrink-0 text-white/30 transition-all duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-[#d7ff58]" />
                  </a>
                </div>
              </div>

              <motion.div
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, delay: 0.2 }}
                className="mt-16 flex flex-col gap-4 border-t border-white/10 pt-5 font-mono text-[8px] uppercase tracking-[0.14em] text-white/25 sm:flex-row sm:items-center sm:justify-between"
              >
                <span>Open to select collaborations worldwide</span>
                <span className="hidden sm:block">No recruiters, please</span>
                <span>Yun Wangshu / 2026</span>
              </motion.div>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}