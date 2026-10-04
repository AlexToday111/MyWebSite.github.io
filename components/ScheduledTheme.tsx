"use client";

import { useEffect } from "react";
import { useTheme } from "next-themes";
import { getNextThemeChange, getScheduledTheme } from "@/lib/theme-schedule";

export default function ScheduledTheme() {
  const { setTheme } = useTheme();

  useEffect(() => {
    let boundaryTimer: ReturnType<typeof setTimeout>;
    const synchronize = () => {
      const now = new Date();
      setTheme(getScheduledTheme(now));
      clearTimeout(boundaryTimer);
      boundaryTimer = setTimeout(
        synchronize,
        getNextThemeChange(now).getTime() - now.getTime(),
      );
    };
    const onVisible = () => {
      if (!document.hidden) synchronize();
    };

    synchronize();
    // Recover from sleep, time-zone changes, and adjustments to the device clock.
    const clockCheck = setInterval(synchronize, 60_000);
    window.addEventListener("focus", synchronize);
    document.addEventListener("visibilitychange", onVisible);
    return () => {
      clearTimeout(boundaryTimer);
      clearInterval(clockCheck);
      window.removeEventListener("focus", synchronize);
      document.removeEventListener("visibilitychange", onVisible);
    };
  }, [setTheme]);

  return null;
}
