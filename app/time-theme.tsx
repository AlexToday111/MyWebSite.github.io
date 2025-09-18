"use client";

import { useEffect, useRef } from "react";
import { useTheme } from "next-themes";

function msUntil(date: Date) {
  const now = new Date();
  return Math.max(0, date.getTime() - now.getTime());
}

function nextBoundary(now = new Date()): Date {
  const hour = now.getHours();
  const next = new Date(now);
  if (hour >= 8 && hour < 18) {
    // Currently in light window → next boundary is 18:00 today
    next.setHours(18, 0, 0, 0);
  } else if (hour < 8) {
    // Before 08:00 → next boundary is 08:00 today
    next.setHours(8, 0, 0, 0);
  } else {
    // After 18:00 → next boundary is 08:00 tomorrow
    next.setDate(next.getDate() + 1);
    next.setHours(8, 0, 0, 0);
  }
  return next;
}

export default function TimeTheme() {
  const { setTheme } = useTheme();
  const timerRef = useRef<number | null>(null);

  useEffect(() => {
    const applyThemeForNow = () => {
      const now = new Date();
      const hour = now.getHours();
      const isLight = hour >= 8 && hour < 18;
      setTheme(isLight ? "light" : "dark");
    };

    const scheduleNext = () => {
      const target = nextBoundary();
      const delay = msUntil(target);
      // Fallback cap in case of very long delays (shouldn't happen)
      const timeout = Math.min(delay, 2147483647); // ~24.8 days
      timerRef.current = window.setTimeout(() => {
        applyThemeForNow();
        scheduleNext();
      }, timeout);
    };

    applyThemeForNow();
    scheduleNext();

    return () => {
      if (timerRef.current) window.clearTimeout(timerRef.current);
    };
  }, [setTheme]);

  return null;
}

