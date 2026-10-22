export type ProjectTone = "acid" | "ember" | "ocean";

export type Project = {
  slug: string;
  name: string;
  tagline: string;
  summary: string;
  category: string;
  year: string;
  role: string;
  duration: string;
  tone: ProjectTone;
  stack: string[];
  metrics: { value: string; label: string }[];
  challenge: string;
  approach: string;
  outcome: string;
};

export const projects: Project[] = [
  {
    slug: "nusa",
    name: "Nusa",
    tagline: "Banking, minus the noise.",
    summary:
      "A mobile-first financial home that turns a tangle of products into one calm, legible flow.",
    category: "Fintech · Product ecosystem",
    year: "2026",
    role: "Product design & lead engineer",
    duration: "14 weeks",
    tone: "acid",
    stack: ["Next.js", "TypeScript", "Go", "Postgres"],
    metrics: [
      { value: "38%", label: "fewer steps to first transfer" },
      { value: "1.2s", label: "median interaction time" },
      { value: "12", label: "markets localised" },
    ],
    challenge:
      "Nusa had grown from a single transfer product into an ecosystem of wallets, cards, and lending tools. Every new feature added another tab, another decision, another moment of doubt. The brief: make money feel simple again without hiding the depth underneath.",
    approach:
      "We rebuilt the product around intent rather than features. One adaptive home surface, a strict type and spacing system, and a transaction language that reads like a sentence. I prototyped every flow in code, shipped the Go ledger service, and paired daily with the brand and growth teams.",
    outcome:
      "The new experience cut the path to a first transfer from eight screens to five, while support tickets about navigation dropped sharply in the first month. The design system now powers four squads across web and mobile.",
  },
  {
    slug: "auralis",
    name: "Auralis",
    tagline: "Your nervous system, in tune.",
    summary:
      "An adaptive sound and breathwork companion that meets you exactly where your day left you.",
    category: "AI · Wellbeing",
    year: "2025",
    role: "Founding product engineer",
    duration: "7 months",
    tone: "ember",
    stack: ["Next.js", "Python", "Rust", "Web Audio"],
    metrics: [
      { value: "68%", label: "30-day retention" },
      { value: "2.3m", label: "sessions guided" },
      { value: "4.9", label: "average app rating" },
    ],
    challenge:
      "Meditation apps ask busy people to choose a practice when they are least able to. Auralis wanted to infer the right moment, then disappear. The hard part was making machine intelligence feel gentle rather than clinical.",
    approach:
      "I designed an ambient interface with almost no chrome: a living gradient, a single invitation, and adaptive audio. The recommendation service runs on Python; a Rust audio engine keeps latency under 20ms in the browser. Every AI suggestion is framed as an option, never an instruction.",
    outcome:
      "Auralis became the team's most-loved release, with 30-day retention nearly double the category baseline. The sound engine now supports spatial sessions, and the design language was extended into a physical installation.",
  },
  {
    slug: "northline",
    name: "Northline",
    tagline: "Field notes for the modern explorer.",
    summary:
      "An editorial travel platform where careful storytelling and frictionless booking share the same stage.",
    category: "Travel · Editorial commerce",
    year: "2025",
    role: "Design engineer",
    duration: "11 weeks",
    tone: "ocean",
    stack: ["Next.js", "Sanity", "Stripe", "Mapbox"],
    metrics: [
      { value: "0.8s", label: "largest contentful paint" },
      { value: "3.4×", label: "organic discovery" },
      { value: "18k", label: "waitlist sign-ups" },
    ],
    challenge:
      "Travel content usually falls into one of two camps: beautiful and unusable, or efficient and forgettable. Northline wanted the pacing of a printed journal with the precision of a modern booking flow.",
    approach:
      "I built a bespoke editorial system with generous typography, map-led narratives, and quiet commerce. Content and inventory share one design language; booking happens in an overlay without losing your place. Performance budgets were treated as design constraints from day one.",
    outcome:
      "Organic traffic grew 3.4× after launch, and the first guided season sold out in eleven days. The platform has since expanded to twenty-two destinations while keeping its 0.8-second LCP.",
  },
];
