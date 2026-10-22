"use client";

import { useEffect, useState } from "react";
import { formatTime } from "@/lib/utils";
import { siteConfig } from "@/data/site";

export function LocalTime({ showZone = true }: { showZone?: boolean }) {
  const [time, setTime] = useState<string | null>(null);

  useEffect(() => {
    const update = () => setTime(formatTime(new Date(), siteConfig.timeZone));
    update();
    const interval = window.setInterval(update, 15_000);
    return () => window.clearInterval(interval);
  }, []);

  return (
    <span
      suppressHydrationWarning
      aria-label={`Current time in ${siteConfig.location}`}
    >
      {time ?? "--:--"}
      {showZone ? " WIB" : ""}
    </span>
  );
}
