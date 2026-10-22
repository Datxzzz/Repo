package handler

import (
	"encoding/json"
	"net/http"
	"runtime"
	"strconv"
	"time"
)

type apiResponse struct {
	OK        bool           `json:"ok"`
	Language  string         `json:"language"`
	Runtime   string         `json:"runtime"`
	Message   string         `json:"message"`
	ServedAt  string         `json:"served_at"`
	ComputeMS float64        `json:"compute_ms"`
	Meta      map[string]any `json:"meta"`
}

func fibonacci(n int) uint64 {
	var a, b uint64 = 0, 1
	for range n {
		a, b = b, a+b
	}
	return a
}

func writeJSON(w http.ResponseWriter, status int, payload apiResponse) {
	w.Header().Set("Content-Type", "application/json; charset=utf-8")
	w.Header().Set("Cache-Control", "no-store, max-age=0")
	w.Header().Set("Access-Control-Allow-Origin", "*")
	w.Header().Set("Access-Control-Allow-Methods", "GET, OPTIONS")
	w.WriteHeader(status)
	_ = json.NewEncoder(w).Encode(payload)
}

// Handler is the Vercel Go entrypoint. The filename maps to /api/go.
func Handler(w http.ResponseWriter, r *http.Request) {
	if r.Method == http.MethodOptions {
		w.WriteHeader(http.StatusNoContent)
		return
	}

	if r.Method != http.MethodGet {
		http.Error(w, "Method not allowed", http.StatusMethodNotAllowed)
		return
	}

	started := time.Now()
	n := 18
	if raw := r.URL.Query().Get("n"); raw != "" {
		if parsed, err := strconv.Atoi(raw); err == nil {
			n = parsed
		}
	}
	if n < 1 {
		n = 1
	}
	if n > 60 {
		n = 60
	}

	value := fibonacci(n)
	computeMS := float64(time.Since(started).Microseconds()) / 1000.0

	writeJSON(w, http.StatusOK, apiResponse{
		OK:        true,
		Language:  "Go",
		Runtime:   runtime.Version() + " · Vercel Function",
		Message:   "Small binary. Serious throughput.",
		ServedAt:  time.Now().UTC().Format(time.RFC3339Nano),
		ComputeMS: computeMS,
		Meta: map[string]any{
			"engine":      runtime.Version(),
			"algorithm":   "iterative_fibonacci",
			"n":           n,
			"value":       value,
			"goroutines":  runtime.NumGoroutine(),
			"goos":        runtime.GOOS,
			"goarch":      runtime.GOARCH,
			"serverless":  true,
		},
	})
}
