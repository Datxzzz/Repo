# Raka Pradana — Portfolio

A premium, editorial portfolio for a product engineer and interface designer. Built with Next.js, TypeScript, Tailwind CSS, and Framer Motion, with native Python, Go, and Rust serverless functions on Vercel.

## Highlights

- Dark and light themes with colour-scheme persistence and a circular view transition
- Custom Bricolage Grotesque, Manrope, Instrument Serif, and JetBrains Mono typography
- CSS and SVG project artwork — zero external image dependencies
- Framer Motion reveals, magnetic buttons, pointer parallax, spotlight cards, and micro-interactions
- Glass navigation, responsive mobile menu, project case-study dialogs, and full keyboard support
- Live polyglot API playground with response and source views
- Native Vercel Functions in Python, Go, and Rust
- Optional containerised Ruby, PHP, and Java demos
- Generated metadata, Open Graph image, sitemap, robots.txt, and JSON-LD

## Stack

| Layer | Technology |
| --- | --- |
| Framework | Next.js 16 (App Router) |
| Language | TypeScript |
| Styling | Tailwind CSS 4 |
| Motion | Framer Motion |
| Icons | Lucide |
| Serverless APIs | Python, Go, Rust |
| Deploy | Vercel |

## Run locally

```bash
npm install
npm run dev
```

Open `http://localhost:3000`.

The frontend works with `next dev` alone. The API playground detects that the native language functions are unavailable and switches to preview mode.

To run the frontend and native Python/Go/Rust functions together:

```bash
npx vercel dev
```

The Go and Rust toolchains are compiled by Vercel's build infrastructure, not by Next.js.

## Production build

```bash
npm run typecheck
npm run lint
npm run build
```

## Deploy to Vercel

### Git

1. Push this repository to GitHub, GitLab, or Bitbucket.
2. Import it at [vercel.com/new](https://vercel.com/new).
3. Keep the detected Next.js settings.
4. Add `NEXT_PUBLIC_SITE_URL` with the final domain, for example `https://raka.design`.
5. Deploy.

### CLI

```bash
npx vercel login
npx vercel
npx vercel --prod
```

After the first deployment, set the production URL:

```bash
npx vercel env add NEXT_PUBLIC_SITE_URL production
npx vercel --prod
```

`vercel.json` configures function duration and security headers.

## API endpoints

| Language | Endpoint | Source | Runtime |
| --- | --- | --- | --- |
| Python | `GET /api/python` | `api/python.py` | Vercel Python 3.12 |
| Go | `GET /api/go` | `api/go.go` | Vercel Go |
| Rust | `GET /api/rust` | `api/rust.rs` | Vercel Rust + `vercel_runtime` |

All endpoints return JSON and accept an optional `?n=` parameter for a small Fibonacci benchmark (Python and Go). Example:

```bash
curl "https://your-domain.com/api/python?n=24"
```

Node.js powers the Next.js runtime. Deno is a supported edge runtime, not a language. Python, Go, and Rust are the languages demonstrated by these APIs.

Go and Rust functions are supported as beta runtimes on Vercel. If either runtime is unavailable for your plan or region, the frontend automatically falls back to preview data while the remaining APIs continue to work.

## Optional Docker APIs

Ruby, PHP, and Java demos are included outside the Vercel deployment:

```bash
docker compose up --build
```

| Service | URL |
| --- | --- |
| Ruby | `http://localhost:4101` |
| PHP | `http://localhost:4102` |
| Java | `http://localhost:4103` |

These container services are intentionally excluded from Vercel through `.vercelignore`.

## Customisation

Most persona, navigation, capability, and contact content lives in `src/data/site.ts`. Selected work is in `src/data/projects.ts`. The API playground metadata lives in `src/data/languages.ts`.

Before publishing, update:

- `siteConfig.name`, `role`, `email`, `location`, and `availability`
- Social links in `siteConfig.socials`
- Project stories, metrics, and stack tags
- `NEXT_PUBLIC_SITE_URL`

The project artwork is composed with CSS and container queries in `src/app/globals.css` and `src/components/project-artwork.tsx`.

## Structure

```text
src/
  app/                 App Router pages, metadata, generated OG image
  components/          UI, sections, interactions, and artwork
  data/                Portfolio copy, projects, API language metadata
  lib/                 Small shared utilities
api/
  python.py            Python Vercel Function
  go.go                Go Vercel Function
  rust.rs              Rust Vercel Function
docker/                Optional Ruby, PHP, and Java services
```

## Design notes

The layout uses a warm paper light theme and an ink-black dark theme with an acid-lime accent. Serif italics break up the grotesque display type, while thin rules, mono labels, and restrained movement keep the interface grounded. All interactive controls have visible focus states, and motion respects `prefers-reduced-motion`.
