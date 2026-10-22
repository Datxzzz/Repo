use serde_json::{json, Value};
use std::time::{Instant, SystemTime, UNIX_EPOCH};
use vercel_runtime::{run, service_fn, Error, Request};

#[tokio::main]
async fn main() -> Result<(), Error> {
    run(service_fn(handler)).await
}

fn fibonacci(n: usize) -> u64 {
    let (mut a, mut b) = (0_u64, 1_u64);
    for _ in 0..n {
        let next = a.wrapping_add(b);
        a = b;
        b = next;
    }
    a
}

async fn handler(_req: Request) -> Result<Value, Error> {
    let started = Instant::now();
    let value = fibonacci(30);
    let elapsed_us = started.elapsed().as_micros();
    let served_at = SystemTime::now()
        .duration_since(UNIX_EPOCH)
        .map(|duration| duration.as_secs())
        .unwrap_or_default();

    Ok(json!({
        "ok": true,
        "language": "Rust",
        "runtime": "Rust · vercel_runtime",
        "message": "Fearless concurrency. Featherweight footprint.",
        "served_at_unix": served_at,
        "compute_ms": elapsed_us as f64 / 1000.0,
        "meta": {
            "engine": "rustc / vercel_runtime",
            "algorithm": "iterative_fibonacci",
            "n": 30,
            "value": value,
            "benchmark_us": elapsed_us,
            "serverless": true
        }
    }))
}
