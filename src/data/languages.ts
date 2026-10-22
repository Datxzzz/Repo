export const languageIds = ["python", "go", "rust"] as const;

export type LanguageId = (typeof languageIds)[number];

export type ApiRecord = {
  ok?: boolean;
  language?: string;
  runtime?: string;
  message?: string;
  served_at?: string;
  compute_ms?: number;
  meta?: Record<string, unknown>;
  [key: string]: unknown;
};

export type Language = {
  id: LanguageId;
  name: string;
  mark: string;
  file: string;
  endpoint: string;
  accent: string;
  description: string;
  traits: string[];
  snippet: string;
};

export const languages: Language[] = [
  {
    id: "python",
    name: "Python",
    mark: "py",
    file: "api/python.py",
    endpoint: "/api/python",
    accent: "#ffd76a",
    description:
      "The pragmatic generalist. Readable by humans, formidable with data — here using nothing but the standard library.",
    traits: ["Zero dependencies", "Standard library", "BaseHTTPRequestHandler"],
    snippet: `from http.server import BaseHTTPRequestHandler
from datetime import datetime, timezone
import json, platform

class handler(BaseHTTPRequestHandler):
    def do_GET(self):
        payload = {
            "ok": True,
            "language": "Python",
            "runtime": platform.python_version(),
            "served_at": datetime.now(timezone.utc).isoformat(),
        }
        self.send_response(200)
        self.send_header("Content-Type", "application/json")
        self.end_headers()
        self.wfile.write(json.dumps(payload).encode())`,
  },
  {
    id: "go",
    name: "Go",
    mark: "go",
    file: "api/go.go",
    endpoint: "/api/go",
    accent: "#83e8ff",
    description:
      "Compiled for fast, boring reliability. One exported handler, no framework, and a goroutine count to prove it.",
    traits: ["Native runtime", "net/http", "Single binary"],
    snippet: `package handler

import (
    "encoding/json"
    "net/http"
    "runtime"
)

func Handler(w http.ResponseWriter, r *http.Request) {
    w.Header().Set("Content-Type", "application/json")
    json.NewEncoder(w).Encode(map[string]any{
        "ok":       true,
        "language": "Go",
        "runtime":  runtime.Version(),
    })
}`,
  },
  {
    id: "rust",
    name: "Rust",
    mark: "rs",
    file: "api/rust.rs",
    endpoint: "/api/rust",
    accent: "#ff9d7d",
    description:
      "Performance with a seatbelt. A native Vercel function powered by vercel_runtime and a very small footprint.",
    traits: ["Memory safe", "vercel_runtime", "Zero GC"],
    snippet: `use serde_json::{json, Value};
use vercel_runtime::{run, service_fn, Error, Request};

#[tokio::main]
async fn main() -> Result<(), Error> {
    run(service_fn(handler)).await
}

async fn handler(_req: Request) -> Result<Value, Error> {
    Ok(json!({
        "ok": true,
        "language": "Rust",
        "runtime": "vercel_runtime",
    }))
}`,
  },
];

export function getLanguage(id: LanguageId) {
  return languages.find((language) => language.id === id) ?? languages[0];
}

function fibonacci(n: number) {
  let a = 0;
  let b = 1;
  for (let index = 0; index < n; index += 1) {
    [a, b] = [b, a + b];
  }
  return a;
}

export function createPreviewResponse(id: LanguageId): ApiRecord {
  const language = getLanguage(id);
  const n = id === "rust" ? 30 : 18;
  const now = new Date().toISOString();

  return {
    ok: true,
    language: language.name,
    runtime:
      id === "python"
        ? "Python 3.12 · Vercel Function"
        : id === "go"
          ? "Go 1.23 · Vercel Function"
          : "Rust · vercel_runtime",
    message:
      id === "python"
        ? "Readable by humans. Relentless with data."
        : id === "go"
          ? "Small binary. Serious throughput."
          : "Fearless concurrency. Featherweight footprint.",
    served_at: now,
    compute_ms: Number((0.35 + Math.random() * 0.9).toFixed(2)),
    meta: {
      preview: true,
      algorithm: "iterative_fibonacci",
      n,
      value: fibonacci(n),
      note: "Run with `vercel dev` to execute the native function locally.",
    },
  };
}
