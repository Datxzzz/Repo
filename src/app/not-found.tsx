import { ArrowLeft, ArrowUpRight } from "lucide-react";
import Link from "next/link";

export default function NotFound() {
  return (
    <section className="relative flex min-h-[80svh] items-center overflow-hidden pb-24 pt-36">
      <div className="hero-backdrop" aria-hidden="true">
        <div className="hero-blob hero-blob-one" />
      </div>
      <div className="container-site relative z-10">
        <p className="eyebrow mb-5 text-accent">Error / 404</p>
        <h1 className="max-w-4xl font-display text-[clamp(4rem,14vw,11rem)] font-medium leading-[0.84] tracking-[-0.07em] text-ink">
          A beautiful
          <br />
          <em className="accent-serif gradient-text font-normal">dead end.</em>
        </h1>
        <p className="mt-8 max-w-md text-sm leading-7 text-muted">
          This page wandered off the map. The good work, however, is still
          exactly where you left it.
        </p>
        <div className="mt-9 flex flex-col gap-3 sm:flex-row">
          <Link
            href="/"
            className="group inline-flex h-12 items-center justify-center gap-2 rounded-full bg-accent px-6 text-[12px] font-bold text-[var(--accent-ink)] transition-colors hover:bg-[var(--accent-bright)]"
          >
            <ArrowLeft className="size-4 transition-transform duration-300 group-hover:-translate-x-0.5" />
            Back home
          </Link>
          <Link
            href="/#work"
            className="glass-button inline-flex h-12 items-center justify-center gap-2 rounded-full px-6 text-[12px] font-semibold text-ink"
          >
            See selected work
            <ArrowUpRight className="size-4" />
          </Link>
        </div>
      </div>
    </section>
  );
}
