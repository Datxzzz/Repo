export const siteConfig = {
  name: "Yun Wangshu",
  shortName: "Yun Wangshu",
  initials: "YW",
  role: "Full-stack engineer & interface designer",
  location: "Banten, Indonesia",
  timeZone: "Asia/Jakarta",
  email: "yun-wangshu@proton.me",
  availability: "Booking select projects for Q1 2027",
  description:
    "Independent product engineer blending thoughtful interface design with resilient full-stack systems. Currently building expressive digital products from Jakarta.",
  url: process.env.NEXT_PUBLIC_SITE_URL ?? "https://yunwangshu.design",
  socials: [
    { label: "GitHub", href: "https://github.com", handle: "" },
    { label: "LinkedIn", href: "https://www.linkedin.com", handle: "" },
    { label: "Dribbble", href: "https://dribbble.com", handle: "" },
  ],
  navLinks: [
    { label: "Work", href: "#work" },
    { label: "About", href: "#about" },
    { label: "Lab", href: "#lab" },
    { label: "Contact", href: "#contact" },
  ],
  heroStats: [
    { value: "8+", label: "Years shipping" },
    { value: "30+", label: "Products launched" },
    { value: "6", label: "Engineering stacks" },
  ],
};

export type Capability = {
  number: string;
  title: string;
  description: string;
  tags: string[];
  icon: "layers" | "sparkles" | "server" | "brain";
};

export const capabilities: Capability[] = [
  {
    number: "01",
    title: "Product engineering",
    description:
      "From first wireframe to production release. Fast, accessible interfaces with an obsession for the last 10%.",
    tags: ["Next.js", "React", "TypeScript", "Tailwind"],
    icon: "layers",
  },
  {
    number: "02",
    title: "Interface & motion",
    description:
      "Design systems and interactions with a point of view — expressive enough to remember, quiet enough to use.",
    tags: ["Design systems", "Framer Motion", "Prototyping"],
    icon: "sparkles",
  },
  {
    number: "03",
    title: "Systems & APIs",
    description:
      "Calm architecture for messy problems. Polyglot services, clean contracts, and infrastructure that stays out of the way.",
    tags: ["Python", "Go", "Rust", "Postgres"],
    icon: "server",
  },
  {
    number: "04",
    title: "AI-native products",
    description:
      "Interfaces for probabilistic systems. Streaming, evaluation, and guardrails designed around real human workflows.",
    tags: ["LLM UX", "RAG", "Evals", "Streaming"],
    icon: "brain",
  },
];

export const processSteps = [
  {
    number: "01",
    title: "Frame",
    description:
      "Get honest about the problem. Align the team around the sharpest version of the brief.",
  },
  {
    number: "02",
    title: "Make",
    description:
      "Prototype in the browser early. Design and engineering happen in the same room — not in sequence.",
  },
  {
    number: "03",
    title: "Refine",
    description:
      "Pressure-test every seam: performance, accessibility, empty states, edge cases, copy.",
  },
  {
    number: "04",
    title: "Ship",
    description:
      "Launch with instrumentation, documentation, and a handover the next team can actually use.",
  },
];

export const principles = [
  "Clarity is a feature.",
  "Motion should explain, not perform.",
  "The last 10% is the product.",
];