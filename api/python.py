from datetime import datetime, timezone
from http.server import BaseHTTPRequestHandler
from urllib.parse import parse_qs, urlparse
import json
import platform
import time


def fibonacci(n: int) -> int:
    a, b = 0, 1
    for _ in range(n):
        a, b = b, a + b
    return a


class handler(BaseHTTPRequestHandler):
    def _respond(self, status: int, payload: dict) -> None:
        body = json.dumps(payload, separators=(",", ":")).encode("utf-8")
        self.send_response(status)
        self.send_header("Content-Type", "application/json; charset=utf-8")
        self.send_header("Cache-Control", "no-store, max-age=0")
        self.send_header("Access-Control-Allow-Origin", "*")
        self.send_header("Access-Control-Allow-Methods", "GET, OPTIONS")
        self.send_header("Content-Length", str(len(body)))
        self.end_headers()
        self.wfile.write(body)

    def do_GET(self) -> None:
        started = time.perf_counter()
        params = parse_qs(urlparse(self.path).query)

        try:
            n = int(params.get("n", ["18"])[0])
        except (TypeError, ValueError):
            n = 18

        n = max(1, min(n, 60))
        value = fibonacci(n)
        compute_ms = round((time.perf_counter() - started) * 1000, 3)

        self._respond(
            200,
            {
                "ok": True,
                "language": "Python",
                "runtime": f"Python {platform.python_version()} · Vercel Function",
                "message": "Readable by humans. Relentless with data.",
                "served_at": datetime.now(timezone.utc).isoformat(),
                "compute_ms": compute_ms,
                "meta": {
                    "engine": platform.python_implementation(),
                    "algorithm": "iterative_fibonacci",
                    "n": n,
                    "value": value,
                    "serverless": True,
                },
            },
        )

    def do_OPTIONS(self) -> None:
        self._respond(204, {})

    def log_message(self, format: str, *args: object) -> None:
        return
