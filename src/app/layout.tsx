import type { Metadata, Viewport } from "next";
import "@fontsource-variable/bricolage-grotesque";
import "@fontsource-variable/manrope";
import "@fontsource-variable/jetbrains-mono";
import "@fontsource/instrument-serif/400-italic.css";
import "./globals.css";
import { ScrollProgress } from "@/components/scroll-progress";
import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";
import { ThemeProvider } from "@/components/theme-provider";
import { siteConfig } from "@/data/site";

const siteUrl = siteConfig.url;

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: "Yun Wangshu — Product Engineer & Interface Designer",
    template: "%s — Yun Wangshu",
  },
  description: siteConfig.description,
  keywords: [
    "product engineer",
    "interface designer",
    "full-stack developer",
    "Next.js",
    "TypeScript",
    "Framer Motion",
    "Banten",
    "portfolio",
  ],
  authors: [{ name: siteConfig.name, url: siteUrl }],
  creator: siteConfig.name,
  category: "design",
  alternates: {
    canonical: "/",
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: siteUrl,
    siteName: `${siteConfig.name} — Portfolio`,
    title: "Yun Wangshu — Product Engineer & Interface Designer",
    description: siteConfig.description,
  },
  twitter: {
    card: "summary_large_image",
    title: "Yun Wangshu — Product Engineer & Interface Designer",
    description: siteConfig.description,
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  colorScheme: "dark light",
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#f2efe6" },
    { media: "(prefers-color-scheme: dark)", color: "#080a07" },
  ],
};

const themeScript = `(function(){try{var t=localStorage.getItem('yun-theme');if(t!=='light'&&t!=='dark'){t='dark';}document.documentElement.dataset.theme=t;document.documentElement.style.colorScheme=t;}catch(e){document.documentElement.dataset.theme='dark';}})();`;

const personSchema = {
  "@context": "https://schema.org",
  "@type": "Person",
  name: siteConfig.name,
  url: siteUrl,
  email: `mailto:${siteConfig.email}`,
  jobTitle: "Product Engineer & Interface Designer",
  description: siteConfig.description,
  address: {
    "@type": "PostalAddress",
    addressLocality: "Jakarta",
    addressCountry: "ID",
  },
  sameAs: siteConfig.socials.map((social) => social.href),
  knowsAbout: [
    "Product engineering",
    "Interface design",
    "Design systems",
    "Next.js",
    "TypeScript",
    "Python",
    "Go",
    "Rust",
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      data-theme="dark"
      suppressHydrationWarning
    >
      <head>
        <script dangerouslySetInnerHTML={{ __html: themeScript }} />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(personSchema) }}
        />
      </head>
      <body>
        <ThemeProvider>
          <a
            href="#main-content"
            className="fixed left-4 top-4 z-[120] -translate-y-24 rounded-full bg-accent px-5 py-3 text-xs font-bold text-[var(--accent-ink)] transition-transform focus:translate-y-0"
          >
            Skip to content
          </a>
          <ScrollProgress />
          <SiteHeader />
          <main id="main-content">{children}</main>
          <SiteFooter />
          <div className="page-noise" aria-hidden="true" />
        </ThemeProvider>
      </body>
    </html>
  );
}