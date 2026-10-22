<?php

header('Content-Type: application/json; charset=utf-8');
header('Cache-Control: no-store');
header('Access-Control-Allow-Origin: *');

function fibonacci(int $n): int {
    $a = 0;
    $b = 1;
    for ($i = 0; $i < $n; $i++) {
        $next = $a + $b;
        $a = $b;
        $b = $next;
    }
    return $a;
}

$started = hrtime(true);
$value = fibonacci(18);
$computeMs = (hrtime(true) - $started) / 1_000_000;

echo json_encode([
    'ok' => true,
    'language' => 'PHP',
    'runtime' => 'PHP ' . PHP_VERSION . ' · Docker',
    'message' => 'Pragmatic, direct, everywhere.',
    'served_at' => gmdate('c'),
    'compute_ms' => round($computeMs, 3),
    'meta' => [
        'engine' => PHP_SAPI,
        'algorithm' => 'iterative_fibonacci',
        'n' => 18,
        'value' => $value,
        'containerized' => true,
    ],
], JSON_UNESCAPED_SLASHES);
