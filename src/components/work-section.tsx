"use client";

import { AnimatePresence } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import { useState } from "react";
import { ProjectArtwork } from "@/components/project-artwork";
import { ProjectDialog } from "@/components/project-dialog";
import { Reveal } from "@/components/reveal";
import { SectionHeading } from "@/components/section-heading";
import { projects, type Project } from "@/data/projects";
import { cn } from "@/lib/utils";

function ProjectCard({
  project,
  index,
  onOpen,
}: {
  project: Project;
  index: number;
  onOpen: () => void;
}) {
  const isWide = index === 2;

  return (
    <Reveal
      delay={index === 0 ? 0 : 0.08}
      className={cn(
        index === 0 && "lg:col-span-7",
        index === 1 && "lg:col-span-5",
        isWide && "lg:col-span-12",
      )}
    >
      <article
        className={cn(
          "project-card group relative flex h-full flex-col overflow-hidden rounded-[1.6rem] border border-[var(--line)] bg-[var(--surface)] p-2.5 shadow-[var(--card-shadow)] transition-[border-color,transform,box-shadow] duration-500 hover:-translate-y-1 hover:border-[var(--line-strong)] hover:shadow-[var(--card-shadow-hover)] sm:rounded-[2rem] sm:p-3",
          isWide &&
            "lg:grid lg:grid-cols-[1.45fr_0.8fr] lg:items-stretch lg:gap-2.5",
        )}
      >
        <button
          type="button"
          onClick={onOpen}
          aria-label={`Open ${project.name} case study`}
          className="absolute inset-0 z-20 rounded-[1.6rem] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-4 focus-visible:ring-offset-canvas sm:rounded-[2rem]"
        />

        <div
          className={cn(
            "relative overflow-hidden rounded-[1.25rem] bg-[#10110d] sm:rounded-[1.5rem]",
            !isWide && "aspect-[4/3] sm:aspect-[1.42]",
            index === 1 && "sm:aspect-[1.13]",
            isWide && "aspect-[4/3] lg:aspect-auto lg:min-h-[29rem]",
          )}
        >
          <div className="size-full transition-transform duration-[900ms] ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-[1.025]">
            <ProjectArtwork tone={project.tone} />
          </div>
          <div className="pointer-events-none absolute left-4 top-4 z-10 flex items-center gap-2">
            <span className="rounded-full border border-white/20 bg-black/25 px-3 py-1.5 font-mono text-[8px] uppercase tracking-[0.13em] text-white/80 backdrop-blur-xl">
              {project.year}
            </span>
            <span className="rounded-full border border-white/20 bg-black/25 px-3 py-1.5 font-mono text-[8px] uppercase tracking-[0.13em] text-white/80 backdrop-blur-xl">
              {String(index + 1).padStart(2, "0")} / 03
            </span>
          </div>
          <div className="pointer-events-none absolute right-4 top-4 z-10 flex size-10 translate-y-1 items-center justify-center rounded-full border border-white/20 bg-black/30 text-white opacity-0 backdrop-blur-xl transition-all duration-500 group-hover:translate-y-0 group-hover:opacity-100">
            <ArrowUpRight className="size-4" strokeWidth={1.6} />
          </div>
        </div>

        <div
          className={cn(
            "flex flex-1 flex-col px-3 pb-4 pt-6 sm:px-5 sm:pb-5 sm:pt-7",
            isWide && "lg:justify-center lg:px-8 lg:py-10",
          )}
        >
          <div className="flex items-center justify-between gap-4">
            <span className="font-mono text-[8.5px] uppercase tracking-[0.14em] text-muted">
              {project.category}
            </span>
            <span className="hidden font-mono text-[8.5px] uppercase tracking-[0.14em] text-muted sm:block">
              {project.year}
            </span>
          </div>

          <div className="mt-4 flex items-end justify-between gap-4">
            <h3 className="font-display text-[2.15rem] font-medium leading-none tracking-[-0.055em] text-ink sm:text-[2.6rem]">
              {project.name}
            </h3>
            <span className="mb-1 flex size-8 shrink-0 items-center justify-center rounded-full border border-[var(--line)] text-muted transition-all duration-500 group-hover:border-accent group-hover:bg-accent group-hover:text-[var(--accent-ink)]">
              <ArrowUpRight className="size-3.5" strokeWidth={1.7} />
            </span>
          </div>

          <p className="mt-3 max-w-md text-[13px] leading-6 text-muted">
            {project.tagline}{" "}
            <span className={cn("text-muted/80", !isWide && "hidden sm:inline")}>
              {project.summary}
            </span>
          </p>

          <div className="mt-auto flex flex-wrap items-center gap-1.5 pt-7">
            {project.stack.map((item) => (
              <span
                key={item}
                className="rounded-full border border-[var(--line)] bg-[var(--soft)] px-2.5 py-1 font-mono text-[8px] uppercase tracking-[0.08em] text-muted"
              >
                {item}
              </span>
            ))}
          </div>
        </div>
      </article>
    </Reveal>
  );
}

export function WorkSection() {
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);

  return (
    <section
      id="work"
      className="relative scroll-mt-28 py-24 sm:py-32 lg:py-40"
    >
      <div className="container-site">
        <SectionHeading
          index="01"
          label="Selected work"
          title={
            <>
              Work with a{" "}
              <em className="accent-serif font-normal">point of view.</em>
            </>
          }
          description={
            <>
              Three recent products at the intersection of design and
              engineering. Every detail intentional, every system built to last.
            </>
          }
        />

        <div className="grid grid-cols-1 gap-5 lg:grid-cols-12">
          {projects.map((project, index) => (
            <ProjectCard
              key={project.slug}
              project={project}
              index={index}
              onOpen={() => setSelectedProject(project)}
            />
          ))}
        </div>

        <Reveal className="mt-10 flex flex-col gap-5 border-t border-[var(--line)] pt-7 sm:flex-row sm:items-center sm:justify-between">
          <p className="max-w-md text-[13px] leading-6 text-muted">
            A deeper archive — experiments, open source, and the work that never
            shipped — lives in the lab.
          </p>
          <a
            href="#lab"
            className="group inline-flex items-center gap-3 self-start font-mono text-[9.5px] uppercase tracking-[0.14em] text-ink sm:self-auto"
          >
            Visit the playground
            <span className="flex size-8 items-center justify-center rounded-full border border-[var(--line)] transition-colors group-hover:border-accent group-hover:bg-accent group-hover:text-[var(--accent-ink)]">
              <ArrowUpRight className="size-3.5 transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
            </span>
          </a>
        </Reveal>
      </div>

      <AnimatePresence>
        {selectedProject && (
          <ProjectDialog
            key={selectedProject.slug}
            project={selectedProject}
            onClose={() => setSelectedProject(null)}
          />
        )}
      </AnimatePresence>
    </section>
  );
}
