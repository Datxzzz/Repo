"use client";

import { AnimatePresence, motion } from "framer-motion";
import { Moon, Sun } from "lucide-react";
import type { MouseEvent } from "react";
import { useTheme } from "@/components/theme-provider";
import { cn } from "@/lib/utils";

export function ThemeToggle({ className }: { className?: string }) {
  const { theme, mounted, toggleTheme } = useTheme();
  const isDark = theme === "dark";

  function handleClick(event: MouseEvent<HTMLButtonElement>) {
    const rect = event.currentTarget.getBoundingClientRect();
    toggleTheme({
      x: rect.left + rect.width / 2,
      y: rect.top + rect.height / 2,
    });
  }

  return (
    <button
      type="button"
      onClick={handleClick}
      className={cn("icon-button group relative overflow-hidden", className)}
      aria-label={isDark ? "Switch to light mode" : "Switch to dark mode"}
      title={isDark ? "Light mode" : "Dark mode"}
    >
      <AnimatePresence initial={false} mode="wait">
        <motion.span
          key={mounted ? theme : "pending"}
          initial={{ opacity: 0, rotate: -35, scale: 0.7 }}
          animate={{ opacity: 1, rotate: 0, scale: 1 }}
          exit={{ opacity: 0, rotate: 35, scale: 0.7 }}
          transition={{ duration: 0.22, ease: [0.22, 1, 0.36, 1] }}
          className="flex items-center justify-center"
        >
          {isDark ? (
            <Sun className="size-[17px]" strokeWidth={1.7} />
          ) : (
            <Moon className="size-[16px]" strokeWidth={1.7} />
          )}
        </motion.span>
      </AnimatePresence>
    </button>
  );
}
