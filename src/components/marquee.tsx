const items = [
  "Product engineering",
  "Interface design",
  "Motion systems",
  "Polyglot APIs",
  "AI-native experiences",
  "Design engineering",
];

function Track({ hidden = false }: { hidden?: boolean }) {
  return (
    <div
      aria-hidden={hidden || undefined}
      className="flex shrink-0 items-center"
    >
      {items.map((item) => (
        <div key={item} className="flex items-center">
          <span className="whitespace-nowrap px-6 font-mono text-[9.5px] uppercase tracking-[0.18em] text-muted sm:px-8">
            {item}
          </span>
          <svg
            viewBox="0 0 16 16"
            className="size-2.5 shrink-0 text-accent"
            aria-hidden="true"
          >
            <path
              d="M8 0c.4 4.5 3.5 7.6 8 8-4.5.4-7.6 3.5-8 8-.4-4.5-3.5-7.6-8-8 4.5-.4 7.6-3.5 8-8Z"
              fill="currentColor"
            />
          </svg>
        </div>
      ))}
    </div>
  );
}

export function Marquee() {
  return (
    <section
      aria-label="Areas of practice"
      className="relative overflow-hidden border-y border-[var(--line)] bg-[var(--soft)] py-4"
    >
      <p className="sr-only">{items.join(", ")}</p>
      <div className="marquee-fade marquee-fade-left" aria-hidden="true" />
      <div className="marquee-fade marquee-fade-right" aria-hidden="true" />
      <div className="marquee-track flex w-max items-center">
        <Track />
        <Track hidden />
      </div>
    </section>
  );
}
