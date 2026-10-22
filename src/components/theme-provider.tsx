"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from "react";

type Theme = "dark" | "light";
type ToggleOrigin = { x: number; y: number };

type ThemeContextValue = {
  theme: Theme;
  mounted: boolean;
  toggleTheme: (origin?: ToggleOrigin) => void;
};

const ThemeContext = createContext<ThemeContextValue | null>(null);
const STORAGE_KEY = "yun-theme";

type ViewTransitionDocument = Document & {
  startViewTransition?: (callback: () => void) => {
    finished: Promise<void>;
  };
};

export function ThemeProvider({ children }: { children: ReactNode }) {
  const [theme, setTheme] = useState<Theme>("dark");
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    const frame = window.requestAnimationFrame(() => {
      const stored = window.localStorage.getItem(STORAGE_KEY);
      const nextTheme: Theme = stored === "light" ? "light" : "dark";
      document.documentElement.dataset.theme = nextTheme;
      document.documentElement.style.colorScheme = nextTheme;
      setTheme(nextTheme);
      setMounted(true);
    });

    return () => window.cancelAnimationFrame(frame);
  }, []);

  const toggleTheme = useCallback(
    (origin?: ToggleOrigin) => {
      const nextTheme: Theme = theme === "dark" ? "light" : "dark";

      const commit = () => {
        document.documentElement.dataset.theme = nextTheme;
        document.documentElement.style.colorScheme = nextTheme;
        window.localStorage.setItem(STORAGE_KEY, nextTheme);
        setTheme(nextTheme);
      };

      const viewDocument = document as ViewTransitionDocument;
      const shouldReduceMotion = window.matchMedia(
        "(prefers-reduced-motion: reduce)",
      ).matches;

      if (!viewDocument.startViewTransition || shouldReduceMotion) {
        commit();
        return;
      }

      if (origin) {
        document.documentElement.style.setProperty(
          "--theme-x",
          `${origin.x}px`,
        );
        document.documentElement.style.setProperty(
          "--theme-y",
          `${origin.y}px`,
        );
      }

      document.documentElement.classList.add("theme-transition");
      const transition = viewDocument.startViewTransition(commit);
      transition.finished.finally(() => {
        document.documentElement.classList.remove("theme-transition");
      });
    },
    [theme],
  );

  const value = useMemo(
    () => ({ theme, mounted, toggleTheme }),
    [theme, mounted, toggleTheme],
  );

  return (
    <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>
  );
}

export function useTheme() {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error("useTheme must be used within a ThemeProvider");
  }
  return context;
}