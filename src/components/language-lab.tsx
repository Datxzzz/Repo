"use client";

import { AnimatePresence, motion } from "framer-motion";
import {
  Check,
  Copy,
  LoaderCircle,
  Play,
  RotateCw,
  Terminal,
} from "lucide-react";
import {
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
  type CSSProperties,
} from "react";
import { Reveal } from "@/components/reveal";
import { SectionHeading } from "@/components/section-heading";
import {
  createPreviewResponse,
  getLanguage,
  languages,
  type ApiRecord,
  type LanguageId,
} from "@/data/languages";
import { cn } from "@/lib/utils";

type RunState = {
  status: "loading" | "success" | "preview";
  data?: ApiRecord;
  roundTrip?: number;
};

type ViewMode = "response" | "source";

const sourceKeywords: Record<LanguageId, string[]> = {
  python: [
    "from",
    "import",
    "class",
    "def",
    "self",
    "return",
    "True",
    "False",
    "None",
  ],
  go: [
    "package",
    "import",
    "func",
    "var",
    "return",
    "map",
    "string",
    "any",
  ],
  rust: [
    "use",
    "async",
    "fn",
    "main",
    "let",
    "Ok",
    "true",
    "false",
    "return",
    "Result",
  ],
};

function escapeHtml(value: string) {
  return value
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;");
}

function highlightCode(code: string, language: LanguageId) {
  const keywords = sourceKeywords[language].join("|");
  const tokenPattern = new RegExp(
    `(#[^\\n]*|//[^\\n]*)|("(?:\\\\.|[^"\\\\])*"|'(?:\\\\.|[^'\\\\])*')|\\b(${keywords})\\b|\\b(\\d+)\\b`,
    "g",
  );

  let output = "";
  let lastIndex = 0;
  let match: RegExpExecArray | null;

  while ((match = tokenPattern.exec(code)) !== null) {
    output += escapeHtml(code.slice(lastIndex, match.index));

    const className = match[1]
      ? "code-comment"
      : match[2]
        ? "code-string"
        : match[3]
          ? "code-keyword"
          : "code-number";

    output += `<span class="${className}">${escapeHtml(match[0])}</span>`;
    lastIndex = match.index + match[0].length;
  }

  output += escapeHtml(code.slice(lastIndex));
  return output;
}

function highlightJson(data: ApiRecord) {
  const json = JSON.stringify(data, null, 2);
  const escaped = escapeHtml(json);

  return escaped.replace(
    /("(?:\\u[a-fA-F0-9]{4}|\\[^u]|[^\\"])*")(\s*:)?|\b(true|false|null)\b|-?\d+(?:\.\d+)?(?:[eE][+-]?\d+)?/g,
    (match, stringToken: string | undefined, colon: string | undefined) => {
      if (stringToken) {
        const className = colon ? "json-key" : "json-string";
        return `<span class="${className}">${stringToken}</span>${colon ?? ""}`;
      }
      if (match === "true" || match === "false") {
        return `<span class="json-bool">${match}</span>`;
      }
      if (match === "null") {
        return `<span class="json-null">${match}</span>`;
      }
      return `<span class="json-number">${match}</span>`;
    },
  );
}

function CodeView({
  languageId,
  snippet,
}: {
  languageId: LanguageId;
  snippet: string;
}) {
  const lines = useMemo(
    () => highlightCode(snippet, languageId).split("\n"),
    [languageId, snippet],
  );

  return (
    <div className="lab-code">
      {lines.map((line, index) => (
        <div key={index} className="code-line">
          <span className="code-line-number">
            {String(index + 1).padStart(2, "0")}
          </span>
          <span
            className="code-line-content"
            dangerouslySetInnerHTML={{ __html: line || "&nbsp;" }}
          />
        </div>
      ))}
    </div>
  );
}

function JsonView({ data }: { data: ApiRecord }) {
  const highlighted = useMemo(() => highlightJson(data), [data]);

  return (
    <pre className="lab-json">
      <code dangerouslySetInnerHTML={{ __html: highlighted }} />
    </pre>
  );
}

function LoadingState({ languageName }: { languageName: string }) {
  return (
    <div className="flex h-full flex-col justify-center px-2 sm:px-4">
      <div className="mb-6 flex items-center gap-3 font-mono text-[10px] uppercase tracking-[0.14em] text-white/45">
        <LoaderCircle className="size-4 animate-spin text-[#d7ff58]" />
        Invoking {languageName} function
      </div>
      <div className="space-y-3">
        <div className="h-3 w-2/5 animate-pulse rounded-full bg-white/10" />
        <div className="h-3 w-3/5 animate-pulse rounded-full bg-white/[0.07]" />
        <div className="h-3 w-1/3 animate-pulse rounded-full bg-white/[0.06]" />
        <div className="h-3 w-1/2 animate-pulse rounded-full bg-white/[0.05]" />
      </div>
    </div>
  );
}

export function LanguageLab() {
  const [selected, setSelected] = useState<LanguageId>("python");
  const [view, setView] = useState<ViewMode>("response");
  const [results, setResults] = useState<Partial<Record<LanguageId, RunState>>>(
    {},
  );
  const [copied, setCopied] = useState(false);
  const requestCounter = useRef(0);
  const copyTimer = useRef<number | undefined>(undefined);

  const language = getLanguage(selected);
  const current = results[selected];

  const runLanguage = useCallback(async (id: LanguageId) => {
    const requestId = ++requestCounter.current;
    const started = performance.now();

    setResults((previous) => ({
      ...previous,
      [id]: { status: "loading" },
    }));

    try {
      const response = await fetch(`/api/${id}`, { cache: "no-store" });
      if (!response.ok) throw new Error(`Function returned ${response.status}`);
      const data = (await response.json()) as ApiRecord;
      if (requestId !== requestCounter.current) return;

      setResults((previous) => ({
        ...previous,
        [id]: {
          status: "success",
          data,
          roundTrip: Math.round(performance.now() - started),
        },
      }));
    } catch {
      if (requestId !== requestCounter.current) return;
      setResults((previous) => ({
        ...previous,
        [id]: {
          status: "preview",
          data: createPreviewResponse(id),
        },
      }));
    }
  }, []);

  useEffect(() => {
    const frame = window.requestAnimationFrame(() => {
      void runLanguage(selected);
    });

    return () => window.cancelAnimationFrame(frame);
  }, [runLanguage, selected]);

  useEffect(
    () => () => {
      if (copyTimer.current) window.clearTimeout(copyTimer.current);
    },
    [],
  );

  async function copyEndpoint() {
    try {
      await navigator.clipboard.writeText(
        `${window.location.origin}${language.endpoint}`,
      );
      setCopied(true);
      if (copyTimer.current) window.clearTimeout(copyTimer.current);
      copyTimer.current = window.setTimeout(() => setCopied(false), 1800);
    } catch {
      setCopied(false);
    }
  }

  const isLoading = !current || current.status === "loading";
  const isPreview = current?.status === "preview";

  return (
    <section id="lab" className="relative scroll-mt-28 py-24 sm:py-32 lg:py-40">
      <div className="container-site">
        <SectionHeading
          index="03"
          label="Polyglot playground"
          title={
            <>
              One job.{" "}
              <em className="accent-serif font-normal">Three languages.</em>
            </>
          }
          description="A tiny live API route implemented natively in Python, Go, and Rust. No proxies, no containers — just three Vercel Functions speaking JSON."
        />

        <Reveal>
          <div
            className="lab-shell relative overflow-hidden rounded-[1.75rem] border border-white/10 bg-[#090b08] shadow-[0_50px_120px_-55px_rgba(0,0,0,0.8)] sm:rounded-[2.25rem]"
            style={{ "--lab-accent": language.accent } as CSSProperties}
          >
            <div className="lab-shell-grid" aria-hidden="true" />
            <div className="lab-shell-glow" aria-hidden="true" />

            <div className="relative z-10 p-4 sm:p-6 lg:p-8">
              <div className="mb-6 flex flex-wrap items-center justify-between gap-3 border-b border-white/10 pb-5">
                <div className="flex items-center gap-3">
                  <span className="flex size-7 items-center justify-center rounded-full border border-white/10 bg-white/[0.04] text-white/50">
                    <Terminal className="size-3.5" strokeWidth={1.6} />
                  </span>
                  <span className="font-mono text-[8.5px] uppercase tracking-[0.16em] text-white/40">
                    Serverless / Multilingual API
                  </span>
                </div>
                <span className="flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.03] px-3 py-1.5 font-mono text-[8px] uppercase tracking-[0.14em] text-white/45">
                  <span
                    className={cn(
                      "size-1.5 rounded-full",
                      isPreview ? "bg-[#ffd76a]" : "bg-[#d7ff58]",
                    )}
                  />
                  {isPreview
                    ? "Preview mode"
                    : current?.status === "success"
                      ? "Native function live"
                      : "Connecting"}
                </span>
              </div>

              <div className="grid gap-6 lg:grid-cols-[0.82fr_1.18fr] lg:gap-8 xl:gap-12">
                <div className="flex flex-col">
                  <div
                    role="tablist"
                    aria-label="Choose API language"
                    className="grid grid-cols-3 gap-1 rounded-2xl border border-white/10 bg-white/[0.025] p-1"
                  >
                    {languages.map((item) => {
                      const active = selected === item.id;
                      return (
                        <button
                          key={item.id}
                          type="button"
                          role="tab"
                          aria-selected={active}
                          aria-controls="language-panel"
                          onClick={() => {
                            setSelected(item.id);
                            setCopied(false);
                          }}
                          className={cn(
                            "relative flex min-h-[3.4rem] flex-col items-center justify-center gap-1 rounded-xl px-2 transition-colors duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#d7ff58] sm:flex-row sm:gap-2",
                            active
                              ? "text-white"
                              : "text-white/40 hover:text-white/70",
                          )}
                        >
                          {active && (
                            <motion.span
                              layoutId="active-language"
                              transition={{
                                type: "spring",
                                stiffness: 380,
                                damping: 32,
                              }}
                              className="absolute inset-0 rounded-xl border border-white/10 bg-white/[0.07]"
                            />
                          )}
                          <span
                            className="relative z-10 flex size-6 items-center justify-center rounded-md border font-mono text-[8px] font-bold lowercase"
                            style={{
                              color: item.accent,
                              borderColor: `${item.accent}35`,
                              backgroundColor: `${item.accent}0f`,
                            }}
                          >
                            {item.mark}
                          </span>
                          <span className="relative z-10 text-[11px] font-semibold tracking-[-0.01em]">
                            {item.name}
                          </span>
                        </button>
                      );
                    })}
                  </div>

                  <div className="mt-7 flex-1">
                    <AnimatePresence mode="wait" initial={false}>
                      <motion.div
                        key={language.id}
                        initial={{ opacity: 0, y: 8 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -8 }}
                        transition={{ duration: 0.24 }}
                      >
                        <p className="max-w-sm text-[13px] leading-6 text-white/55">
                          {language.description}
                        </p>

                        <ul className="mt-5 flex flex-wrap gap-1.5">
                          {language.traits.map((trait) => (
                            <li
                              key={trait}
                              className="rounded-full border border-white/10 bg-white/[0.03] px-2.5 py-1 font-mono text-[8px] uppercase tracking-[0.07em] text-white/40"
                            >
                              {trait}
                            </li>
                          ))}
                        </ul>
                      </motion.div>
                    </AnimatePresence>

                    <div className="mt-8">
                      <p className="mb-2 font-mono text-[8px] uppercase tracking-[0.16em] text-white/30">
                        Endpoint
                      </p>
                      <div className="flex items-center justify-between gap-3 rounded-xl border border-white/10 bg-black/20 px-3.5 py-3">
                        <code className="truncate font-mono text-[10.5px] text-white/70">
                          <span className="mr-2 text-[#d7ff58]">GET</span>
                          {language.endpoint}
                        </code>
                        <button
                          type="button"
                          onClick={copyEndpoint}
                          aria-label="Copy endpoint URL"
                          className="flex size-7 shrink-0 items-center justify-center rounded-md text-white/35 transition-colors hover:bg-white/10 hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#d7ff58]"
                        >
                          {copied ? (
                            <Check className="size-3.5 text-[#d7ff58]" />
                          ) : (
                            <Copy className="size-3.5" />
                          )}
                        </button>
                      </div>
                    </div>

                    <div className="mt-6 flex flex-wrap items-center gap-2 font-mono text-[8px] uppercase tracking-[0.1em] text-white/30">
                      <span className="rounded-full border border-white/10 px-2.5 py-1">
                        Node.js · Next.js runtime
                      </span>
                      <span className="rounded-full border border-white/10 px-2.5 py-1">
                        Deno · edge-ready
                      </span>
                    </div>
                  </div>

                  <div className="mt-8 border-t border-white/10 pt-5">
                    <p className="text-[11px] leading-5 text-white/35">
                      <span className="text-white/60">Runtimes orchestrate.</span>{" "}
                      Languages do the thinking. Node.js and Deno power the
                      platform; Python, Go, and Rust power these functions.
                    </p>
                  </div>
                </div>

                <div
                  id="language-panel"
                  role="tabpanel"
                  aria-label={`${language.name} API response`}
                  className="terminal-window overflow-hidden rounded-2xl border border-white/10 bg-[#0d100b]/90 backdrop-blur-xl"
                >
                  <div className="flex flex-wrap items-center justify-between gap-3 border-b border-white/10 px-4 py-3.5">
                    <div className="flex items-center gap-2">
                      <span className="flex gap-1.5">
                        <span className="size-2 rounded-full bg-[#ff6f61]/70" />
                        <span className="size-2 rounded-full bg-[#ffd76a]/70" />
                        <span className="size-2 rounded-full bg-[#d7ff58]/70" />
                      </span>
                      <span className="ml-1 font-mono text-[9px] text-white/40">
                        {language.file}
                      </span>
                    </div>

                    <div className="flex items-center gap-1 rounded-lg border border-white/10 bg-white/[0.025] p-0.5">
                      <button
                        type="button"
                        onClick={() => setView("response")}
                        aria-pressed={view === "response"}
                        className={cn(
                          "rounded-md px-2.5 py-1.5 font-mono text-[8px] uppercase tracking-[0.08em] transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#d7ff58]",
                          view === "response"
                            ? "bg-white/10 text-white/80"
                            : "text-white/35 hover:text-white/60",
                        )}
                      >
                        Response
                      </button>
                      <button
                        type="button"
                        onClick={() => setView("source")}
                        aria-pressed={view === "source"}
                        className={cn(
                          "rounded-md px-2.5 py-1.5 font-mono text-[8px] uppercase tracking-[0.08em] transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#d7ff58]",
                          view === "source"
                            ? "bg-white/10 text-white/80"
                            : "text-white/35 hover:text-white/60",
                        )}
                      >
                        Source
                      </button>
                    </div>
                  </div>

                  <div className="flex min-h-[23rem] flex-col sm:min-h-[25rem]">
                    <div className="flex items-center justify-between gap-3 border-b border-white/10 px-4 py-2.5">
                      <div className="flex items-center gap-2.5 font-mono text-[8.5px] uppercase tracking-[0.1em]">
                        <span
                          className={cn(
                            "flex items-center gap-1.5",
                            isPreview ? "text-[#ffd76a]" : "text-[#d7ff58]",
                          )}
                        >
                          <span
                            className={cn(
                              "size-1.5 rounded-full",
                              isLoading && "animate-pulse",
                              isPreview ? "bg-[#ffd76a]" : "bg-[#d7ff58]",
                            )}
                          />
                          {isLoading
                            ? "running"
                            : isPreview
                              ? "preview / 200"
                              : "200 ok"}
                        </span>
                        <span className="text-white/20">·</span>
                        <span className="text-white/30">
                          {isLoading
                            ? "— ms"
                            : current?.roundTrip
                              ? `${current.roundTrip} ms`
                              : "native"}
                        </span>
                      </div>
                      <button
                        type="button"
                        onClick={() => void runLanguage(selected)}
                        disabled={isLoading}
                        className="group flex items-center gap-1.5 rounded-md px-2 py-1 font-mono text-[8px] uppercase tracking-[0.1em] text-white/35 transition-colors hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#d7ff58] disabled:cursor-wait disabled:opacity-50"
                      >
                        <RotateCw
                          className={cn(
                            "size-2.5 transition-transform duration-500 group-hover:rotate-180",
                            isLoading && "animate-spin",
                          )}
                        />
                        Run again
                      </button>
                    </div>

                    <div className="terminal-content flex-1 overflow-auto px-4 py-4 sm:px-5">
                      <AnimatePresence mode="wait" initial={false}>
                        <motion.div
                          key={`${language.id}-${view}-${current?.status ?? "loading"}`}
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                          exit={{ opacity: 0 }}
                          transition={{ duration: 0.18 }}
                          className="h-full"
                        >
                          {view === "source" ? (
                            <CodeView
                              languageId={language.id}
                              snippet={language.snippet}
                            />
                          ) : isLoading ? (
                            <LoadingState languageName={language.name} />
                          ) : current?.data ? (
                            <JsonView data={current.data} />
                          ) : null}
                        </motion.div>
                      </AnimatePresence>
                    </div>

                    <div className="flex flex-wrap items-center justify-between gap-2 border-t border-white/10 px-4 py-3 font-mono text-[8px] uppercase tracking-[0.1em] text-white/25">
                      <span>
                        {isPreview
                          ? "Native APIs run under vercel dev or production"
                          : "Executed by a native Vercel Function"}
                      </span>
                      <span className="flex items-center gap-1.5">
                        <Play className="size-2 fill-current" />
                        {language.name} · edge-adjacent
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </Reveal>

        <Reveal delay={0.08}>
          <div className="mt-6 flex flex-col gap-4 rounded-2xl border border-[var(--line)] bg-[var(--soft)] px-5 py-4 sm:flex-row sm:items-center sm:justify-between">
            <p className="text-[11.5px] leading-5 text-muted">
              Also in the toolbox: <span className="text-ink">Ruby, PHP, Java</span>{" "}
              — container demos live in{" "}
              <code className="font-mono text-[10px] text-ink">/docker</code>.
            </p>
            <span className="font-mono text-[8.5px] uppercase tracking-[0.12em] text-muted">
              APIs by language, not by runtime
            </span>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
