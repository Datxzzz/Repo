import { ArrowUp, ArrowUpRight } from "lucide-react";
import { LocalTime } from "@/components/local-time";
import { siteConfig } from "@/data/site";

export function SiteFooter() {
  const year = new Date().getFullYear();

  return (
    <footer className="relative border-t border-[var(--line)] pb-8 pt-16 sm:pt-20">
      <div className="container-site">
        <div className="grid gap-12 pb-16 md:grid-cols-[1.3fr_0.7fr_0.9fr] lg:gap-20">
          <div>
            <a
              href="#top"
              className="inline-flex items-baseline font-display text-3xl font-semibold tracking-[-0.06em] text-ink"
            >
              Yun<span className="text-accent">.</span>
            </a>
            <p className="mt-5 max-w-xs text-sm leading-6 text-muted">
              Independent product engineer designing and building thoughtful
              digital experiences from Jakarta.
            </p>
          </div>

          <div>
            <p className="eyebrow mb-5">Elsewhere</p>
            <ul className="space-y-3">
              {siteConfig.socials.map((social) => (
                <li key={social.label}>
                  <a
                    href={social.href}
                    target="_blank"
                    rel="noreferrer"
                    className="group inline-flex items-center gap-2 text-sm text-muted transition-colors hover:text-ink"
                  >
                    {social.label}
                    <ArrowUpRight className="size-3.5 opacity-60 transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <p className="eyebrow mb-5">Say hello</p>
            <a
              href={`mailto:${siteConfig.email}`}
              className="group inline-flex items-center gap-2 font-display text-lg font-medium tracking-[-0.03em] text-ink sm:text-xl"
            >
              {siteConfig.email}
              <ArrowUpRight className="size-4 text-muted transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-accent" />
            </a>
            <p className="mt-5 flex items-center gap-2 font-mono text-[10px] uppercase tracking-[0.14em] text-muted">
              <span className="size-1.5 rounded-full bg-accent" />
              {siteConfig.location} · <LocalTime />
            </p>
          </div>
        </div>

        <div className="flex flex-col gap-5 border-t border-[var(--line)] pt-6 sm:flex-row sm:items-center sm:justify-between">
          <p className="font-mono text-[10px] uppercase tracking-[0.12em] text-muted">
            © {year} {siteConfig.name}. All rights reserved.
          </p>
          <div className="flex items-center gap-5">
            <p className="hidden font-mono text-[10px] uppercase tracking-[0.12em] text-muted sm:block">
              Built with Next.js · Deployed on Vercel
            </p>
            <a
              href="#top"
              className="group inline-flex items-center gap-2 rounded-full border border-[var(--line)] px-4 py-2 font-mono text-[10px] uppercase tracking-[0.12em] text-muted transition-colors hover:border-ink hover:text-ink focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent"
            >
              Back to top
              <ArrowUp className="size-3 transition-transform duration-300 group-hover:-translate-y-0.5" />
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}