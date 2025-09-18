"use client";

import { Moon, Sun } from "lucide-react";
import { useTheme } from "next-themes";

export function ThemeToggle() {
  const { theme, setTheme, systemTheme } = useTheme();
  const effective = theme === "system" ? systemTheme : theme;
  const isDark = effective !== "light";
  return (
    <button
      aria-label="Переключить тему"
      className="inline-flex items-center gap-2 rounded-xl border border-white/10 bg-card/60 px-3 py-1.5 text-sm hover:border-white/20"
      onClick={() => setTheme(isDark ? "light" : "dark")}
    >
      {isDark ? <Sun className="h-4 w-4" aria-hidden /> : <Moon className="h-4 w-4" aria-hidden />}
      <span className="hidden sm:inline">{isDark ? "Светлая" : "Тёмная"}</span>
    </button>
  );
}


