import com.sun.net.httpserver.HttpExchange;
import com.sun.net.httpserver.HttpServer;
import java.io.OutputStream;
import java.net.InetSocketAddress;
import java.nio.charset.StandardCharsets;
import java.time.Instant;

public class Main {
    private static long fibonacci(int n) {
        long a = 0;
        long b = 1;
        for (int i = 0; i < n; i++) {
            long next = a + b;
            a = b;
            b = next;
        }
        return a;
    }

    public static void main(String[] args) throws Exception {
        int port = Integer.parseInt(System.getenv().getOrDefault("PORT", "8080"));
        HttpServer server = HttpServer.create(new InetSocketAddress("0.0.0.0", port), 0);

        server.createContext("/", exchange -> {
            if ("OPTIONS".equalsIgnoreCase(exchange.getRequestMethod())) {
                exchange.getResponseHeaders().add("Access-Control-Allow-Origin", "*");
                exchange.getResponseHeaders().add("Access-Control-Allow-Methods", "GET, OPTIONS");
                exchange.sendResponseHeaders(204, -1);
                exchange.close();
                return;
            }

            long started = System.nanoTime();
            long value = fibonacci(18);
            double computeMs = (System.nanoTime() - started) / 1_000_000.0;

            String payload = String.format(
                "{\"ok\":true,\"language\":\"Java\",\"runtime\":\"Java %s · Docker\","
                    + "\"message\":\"Structured, steady, built to scale.\","
                    + "\"served_at\":\"%s\",\"compute_ms\":%.3f,"
                    + "\"meta\":{\"engine\":\"OpenJDK\",\"algorithm\":\"iterative_fibonacci\","
                    + "\"n\":18,\"value\":%d,\"containerized\":true}}",
                System.getProperty("java.version"),
                Instant.now().toString(),
                computeMs,
                value
            );

            byte[] body = payload.getBytes(StandardCharsets.UTF_8);
            exchange.getResponseHeaders().add("Content-Type", "application/json; charset=utf-8");
            exchange.getResponseHeaders().add("Cache-Control", "no-store");
            exchange.getResponseHeaders().add("Access-Control-Allow-Origin", "*");
            exchange.sendResponseHeaders(200, body.length);
            try (OutputStream output = exchange.getResponseBody()) {
                output.write(body);
            }
        });

        server.start();
    }
}
