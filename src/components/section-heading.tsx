import type { ReactNode } from "react";
import { Reveal } from "@/components/reveal";
import { cn } from "@/lib/utils";

type SectionHeadingProps = {
  index: string;
  label: string;
  title: ReactNode;
  description?: ReactNode;
  className?: string;
};

export function SectionHeading({
  index,
  label,
  title,
  description,
  className,
}: SectionHeadingProps) {
  return (
    <div className={cn("mb-14 sm:mb-20", className)}>
      <Reveal>
        <div className="mb-8 flex items-center gap-3 font-mono text-[9.5px] uppercase tracking-[0.16em] text-muted">
          <span className="text-ink">{index}</span>
          <span className="h-px w-6 bg-[var(--line-strong)]" />
          <span>{label}</span>
          <span className="ml-auto hidden h-px flex-1 bg-[var(--line)] sm:block" />
        </div>
      </Reveal>
      <div className="grid gap-6 md:grid-cols-[1fr_0.48fr] md:items-end md:gap-16">
        <Reveal>
          <h2 className="max-w-3xl font-display text-[clamp(2.3rem,5.4vw,4.5rem)] font-medium leading-[0.98] tracking-[-0.06em] text-ink">
            {title}
          </h2>
        </Reveal>
        {description && (
          <Reveal delay={0.08}>
            <div className="max-w-sm text-sm leading-6 text-muted md:justify-self-end md:pb-1">
              {description}
            </div>
          </Reveal>
        )}
      </div>
    </div>
  );
}
