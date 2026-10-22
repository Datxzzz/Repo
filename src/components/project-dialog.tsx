"use client";

import { motion } from "framer-motion";
import { ArrowUpRight, X } from "lucide-react";
import { useEffect, useRef } from "react";
import { ProjectArtwork } from "@/components/project-artwork";
import type { Project } from "@/data/projects";
import { siteConfig } from "@/data/site";

type ProjectDialogProps = {
  project: Project;
  onClose: () => void;
};

export function ProjectDialog({ project, onClose }: ProjectDialogProps) {
  const dialogRef = useRef<HTMLDivElement>(null);
  const closeRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    const previousOverflow = document.body.style.overflow;
    const previousActiveElement = document.activeElement as HTMLElement | null;
    document.body.style.overflow = "hidden";

    const focusTimer = window.setTimeout(() => closeRef.current?.focus(), 80);

    function handleKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") {
        onClose();
        return;
      }

      if (event.key !== "Tab" || !dialogRef.current) return;

      const focusableElements = Array.from(
        dialogRef.current.querySelectorAll<HTMLElement>(
          'a[href], button:not([disabled]), [tabindex]:not([tabindex="-1"])',
        ),
      );

      if (focusableElements.length === 0) return;

      const first = focusableElements[0];
      const last = focusableElements[focusableElements.length - 1];

      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault();
        last.focus();
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault();
        first.focus();
      }
    }

    document.addEventListener("keydown", handleKeyDown);
    return () => {
      window.clearTimeout(focusTimer);
      document.body.style.overflow = previousOverflow;
      document.removeEventListener("keydown", handleKeyDown);
      previousActiveElement?.focus();
    };
  }, [onClose]);

  return (
    <motion.div
      className="fixed inset-0 z-[90] flex items-center justify-center p-3 sm:p-6"
      role="dialog"
      aria-modal="true"
      aria-labelledby="project-dialog-title"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.28 }}
    >
      <div
        aria-hidden="true"
        onClick={onClose}
        className="absolute inset-0 bg-black/65 backdrop-blur-md"
      />
      <motion.div
        ref={dialogRef}
        initial={{ opacity: 0, y: 28, scale: 0.975 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        exit={{ opacity: 0, y: 20, scale: 0.98 }}
        transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
        className="relative max-h-[92dvh] w-full max-w-5xl overflow-y-auto overscroll-contain rounded-[1.75rem] border border-[var(--line)] bg-[var(--surface)] shadow-[0_60px_150px_-30px_rgba(0,0,0,0.65)] sm:rounded-[2rem]"
      >
        <div className="pointer-events-none sticky top-0 z-30 -mb-14 flex h-14 justify-end px-4 pt-4 sm:px-5">
          <button
            ref={closeRef}
            type="button"
            onClick={onClose}
            className="pointer-events-auto flex size-10 items-center justify-center rounded-full border border-white/20 bg-black/35 text-white/80 backdrop-blur-xl transition-colors hover:bg-black/55 hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white"
            aria-label="Close case study"
          >
            <X className="size-4" strokeWidth={1.8} />
          </button>
        </div>

        <div className="h-[18rem] sm:h-[25rem]">
          <ProjectArtwork tone={project.tone} />
        </div>

        <div className="p-6 sm:p-10 lg:p-14">
          <div className="grid gap-12 lg:grid-cols-[1fr_0.52fr] lg:gap-16">
            <div>
              <p className="eyebrow mb-4">
                {project.category} · {project.year}
              </p>
              <h2
                id="project-dialog-title"
                className="font-display text-[clamp(2.8rem,6vw,4.6rem)] font-medium leading-none tracking-[-0.06em] text-ink"
              >
                {project.name}
              </h2>
              <p className="mt-4 max-w-xl font-display text-xl font-medium tracking-[-0.03em] text-ink/80 sm:text-2xl">
                {project.tagline}
              </p>

              <div className="mt-12 space-y-10">
                <div>
                  <h3 className="mb-3 flex items-center gap-3 font-mono text-[9.5px] uppercase tracking-[0.15em] text-muted">
                    <span className="text-accent">01</span>
                    The challenge
                  </h3>
                  <p className="text-[15px] leading-7 text-muted">
                    {project.challenge}
                  </p>
                </div>
                <div>
                  <h3 className="mb-3 flex items-center gap-3 font-mono text-[9.5px] uppercase tracking-[0.15em] text-muted">
                    <span className="text-accent">02</span>
                    The approach
                  </h3>
                  <p className="text-[15px] leading-7 text-muted">
                    {project.approach}
                  </p>
                </div>
                <div>
                  <h3 className="mb-3 flex items-center gap-3 font-mono text-[9.5px] uppercase tracking-[0.15em] text-muted">
                    <span className="text-accent">03</span>
                    The outcome
                  </h3>
                  <p className="text-[15px] leading-7 text-muted">
                    {project.outcome}
                  </p>
                </div>
              </div>
            </div>

            <aside className="space-y-8 lg:border-l lg:border-[var(--line)] lg:pl-10">
              <div>
                <p className="eyebrow mb-3">Role</p>
                <p className="text-sm font-medium text-ink">{project.role}</p>
              </div>
              <div>
                <p className="eyebrow mb-3">Timeline</p>
                <p className="text-sm font-medium text-ink">
                  {project.duration} · {project.year}
                </p>
              </div>
              <div>
                <p className="eyebrow mb-3">Stack</p>
                <ul className="flex flex-wrap gap-1.5">
                  {project.stack.map((item) => (
                    <li
                      key={item}
                      className="rounded-full border border-[var(--line)] bg-[var(--soft)] px-3 py-1.5 font-mono text-[9px] uppercase tracking-[0.08em] text-muted"
                    >
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
              <div>
                <p className="eyebrow mb-4">Signals</p>
                <div className="space-y-4">
                  {project.metrics.map((metric) => (
                    <div
                      key={metric.label}
                      className="border-b border-[var(--line)] pb-4 last:border-0 last:pb-0"
                    >
                      <p className="font-display text-2xl font-medium tracking-[-0.04em] text-ink">
                        {metric.value}
                      </p>
                      <p className="mt-0.5 text-[11px] leading-5 text-muted">
                        {metric.label}
                      </p>
                    </div>
                  ))}
                </div>
              </div>

              <a
                href={`mailto:${siteConfig.email}?subject=Project%20inquiry`}
                className="group flex items-center justify-between gap-3 rounded-full bg-ink px-5 py-3.5 text-[12px] font-semibold text-canvas transition-colors hover:bg-accent hover:text-[var(--accent-ink)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent"
              >
                Start something similar
                <ArrowUpRight className="size-4 transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
              </a>
            </aside>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
}
