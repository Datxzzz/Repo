"use client";

import { AnimatePresence, motion } from "framer-motion";
import { ArrowUpRight, Menu, X } from "lucide-react";
import { useEffect, useState } from "react";
import { ThemeToggle } from "@/components/theme-toggle";
import { siteConfig } from "@/data/site";
import { cn } from "@/lib/utils";

const sectionIds = ["work", "about", "lab", "contact"];

export function SiteHeader() {
  const [isOpen, setIsOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("");

  useEffect(() => {
    const elements = sectionIds
      .map((id) => document.getElementById(id))
      .filter((element): element is HTMLElement => Boolean(element));

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];

        if (visible) setActiveSection(`#${visible.target.id}`);
      },
      { rootMargin: "-20% 0px -55% 0px", threshold: [0, 0.2, 0.5] },
    );

    elements.forEach((element) => observer.observe(element));
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    document.body.style.overflow = isOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  useEffect(() => {
    function handleKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") setIsOpen(false);
    }

    function handleResize() {
      if (window.innerWidth >= 1024) setIsOpen(false);
    }

    window.addEventListener("keydown", handleKeyDown);
    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return (
    <>
      <motion.header
        initial={{ y: -24, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.8, delay: 0.15, ease: [0.16, 1, 0.3, 1] }}
        className="fixed inset-x-0 top-0 z-[60] px-4 pt-4 sm:px-6 sm:pt-5"
      >
        <div className="mx-auto flex h-[4.25rem] max-w-[78rem] items-center justify-between rounded-full border border-[var(--line)] bg-[var(--nav-bg)] px-3 shadow-[var(--nav-shadow)] backdrop-blur-2xl sm:px-4">
          <a
            href="#top"
            aria-label="Yun Wangshu — back to top"
            className="group flex items-center gap-3 rounded-full py-1 pl-1 pr-3 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent"
          >
            <span className="logo-orb" aria-hidden="true">
              <span>Y</span>
            </span>
            <span className="font-display text-[15px] font-semibold tracking-[-0.03em] text-ink">
              Yun
              <span className="text-accent">.</span>
            </span>
          </a>

          <nav
            aria-label="Primary navigation"
            className="hidden items-center gap-1 lg:flex"
          >
            {siteConfig.navLinks.map((link) => {
              const active = activeSection === link.href;
              return (
                <a
                  key={link.href}
                  href={link.href}
                  className={cn(
                    "nav-link relative rounded-full px-4 py-2 text-[13px] font-medium tracking-[-0.01em] transition-colors duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent",
                    active ? "text-ink" : "text-muted hover:text-ink",
                  )}
                >
                  {link.label}
                  {active && (
                    <motion.span
                      layoutId="active-nav"
                      transition={{ type: "spring", stiffness: 340, damping: 30 }}
                      className="absolute inset-x-4 -bottom-[1px] h-px bg-accent"
                    />
                  )}
                </a>
              );
            })}
          </nav>

          <div className="flex items-center gap-2">
            <span className="mr-1 hidden items-center gap-2 text-[11px] font-medium tracking-[-0.01em] text-muted xl:flex">
              <span className="relative flex size-1.5">
                <span className="absolute inline-flex size-full animate-ping rounded-full bg-accent opacity-60" />
                <span className="relative inline-flex size-1.5 rounded-full bg-accent" />
              </span>
              Open for Q1 &apos;27
            </span>
            <ThemeToggle />
            <a
              href="#contact"
              className="group hidden h-10 items-center gap-2 rounded-full bg-ink px-5 text-[12.5px] font-semibold tracking-[-0.01em] text-canvas transition-[background-color,transform] duration-300 hover:bg-accent hover:text-[var(--accent-ink)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-canvas sm:flex"
            >
              Let&apos;s talk
              <ArrowUpRight
                className="size-3.5 transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
                strokeWidth={1.8}
              />
            </a>
            <button
              type="button"
              onClick={() => setIsOpen((open) => !open)}
              className="icon-button lg:hidden"
              aria-expanded={isOpen}
              aria-controls="mobile-menu"
              aria-label={isOpen ? "Close menu" : "Open menu"}
            >
              <AnimatePresence initial={false} mode="wait">
                <motion.span
                  key={isOpen ? "close" : "menu"}
                  initial={{ opacity: 0, rotate: -25, scale: 0.8 }}
                  animate={{ opacity: 1, rotate: 0, scale: 1 }}
                  exit={{ opacity: 0, rotate: 25, scale: 0.8 }}
                  transition={{ duration: 0.18 }}
                  className="flex items-center justify-center"
                >
                  {isOpen ? (
                    <X className="size-5" strokeWidth={1.7} />
                  ) : (
                    <Menu className="size-5" strokeWidth={1.7} />
                  )}
                </motion.span>
              </AnimatePresence>
            </button>
          </div>
        </div>
      </motion.header>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            id="mobile-menu"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 z-[55] overflow-y-auto bg-[var(--canvas)]/92 px-5 pb-8 pt-28 backdrop-blur-3xl lg:hidden"
          >
            <div className="mx-auto flex min-h-full max-w-lg flex-col">
              <nav aria-label="Mobile navigation" className="mt-6">
                {siteConfig.navLinks.map((link, index) => (
                  <motion.div
                    key={link.href}
                    initial={{ opacity: 0, y: 18 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{
                      delay: 0.08 + index * 0.06,
                      duration: 0.5,
                      ease: [0.16, 1, 0.3, 1],
                    }}
                  >
                    <a
                      href={link.href}
                      onClick={() => setIsOpen(false)}
                      className="group flex items-baseline justify-between border-b border-[var(--line)] py-5"
                    >
                      <span className="flex items-baseline gap-4">
                        <span className="font-mono text-[10px] text-muted">
                          0{index + 1}
                        </span>
                        <span className="font-display text-[clamp(2.4rem,11vw,3.6rem)] font-medium leading-none tracking-[-0.06em] text-ink">
                          {link.label}
                        </span>
                      </span>
                      <ArrowUpRight
                        className="size-5 text-muted transition-transform duration-300 group-hover:-translate-y-1 group-hover:translate-x-1 group-hover:text-accent"
                        strokeWidth={1.4}
                      />
                    </a>
                  </motion.div>
                ))}
              </nav>

              <motion.div
                initial={{ opacity: 0, y: 18 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.36, duration: 0.5 }}
                className="mt-auto pt-12"
              >
                <p className="eyebrow mb-3">Start a conversation</p>
                <a
                  href={`mailto:${siteConfig.email}`}
                  className="font-display text-xl font-medium tracking-[-0.03em] text-ink underline decoration-[var(--line)] underline-offset-4"
                >
                  {siteConfig.email}
                </a>
                <div className="mt-8 flex items-center justify-between border-t border-[var(--line)] pt-5">
                  <span className="flex items-center gap-2 font-mono text-[10px] uppercase tracking-[0.12em] text-muted">
                    <span className="size-1.5 rounded-full bg-accent" />
                    {siteConfig.availability}
                  </span>
                  <span className="font-mono text-[10px] uppercase tracking-[0.12em] text-muted">
                    {siteConfig.location}
                  </span>
                </div>
              </motion.div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}