require "json"
require "time"
require "webrick"

def fibonacci(n)
  a, b = 0, 1
  n.times { a, b = b, a + b }
  a
end

server = WEBrick::HTTPServer.new(
  Port: Integer(ENV.fetch("PORT", "8080")),
  BindAddress: "0.0.0.0",
  AccessLog: [],
  Logger: WEBrick::Log.new($stderr, WEBrick::Log::WARN)
)

server.mount_proc("/") do |_request, response|
  started = Process.clock_gettime(Process::CLOCK_MONOTONIC)
  value = fibonacci(18)
  compute_ms = ((Process.clock_gettime(Process::CLOCK_MONOTONIC) - started) * 1000).round(3)

  response["Content-Type"] = "application/json; charset=utf-8"
  response["Cache-Control"] = "no-store"
  response["Access-Control-Allow-Origin"] = "*"
  response.body = JSON.generate(
    ok: true,
    language: "Ruby",
    runtime: "Ruby #{RUBY_VERSION} · Docker",
    message: "Elegant by default. Container-ready.",
    served_at: Time.now.utc.iso8601,
    compute_ms: compute_ms,
    meta: {
      engine: RUBY_ENGINE,
      algorithm: "iterative_fibonacci",
      n: 18,
      value: value,
      containerized: true
    }
  )
end

trap("TERM") { server.shutdown }
trap("INT") { server.shutdown }
server.start
