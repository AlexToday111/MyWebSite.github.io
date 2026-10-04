import { runInNewContext } from "node:vm";
import { afterEach, describe, expect, it, vi } from "vitest";
import {
  getNextThemeChange,
  getScheduledTheme,
  themeBootstrapScript,
} from "./theme-schedule";

afterEach(() => vi.useRealTimers());

describe("daily theme schedule", () => {
  it.each([
    [0, 0, 0, "dark", 9, 4],
    [8, 59, 59, "dark", 9, 4],
    [9, 0, 0, "light", 17, 4],
    [16, 59, 59, "light", 17, 4],
    [17, 0, 0, "dark", 9, 5],
    [23, 59, 59, "dark", 9, 5],
  ])(
    "switches correctly at %i:%i:%i",
    (hour, minute, second, theme, nextHour, nextDay) => {
      const now = new Date(
        2026,
        9,
        4,
        Number(hour),
        Number(minute),
        Number(second),
      );
      expect(getScheduledTheme(now)).toBe(theme);
      expect(getNextThemeChange(now)).toEqual(
        new Date(2026, 9, Number(nextDay), Number(nextHour)),
      );
      expect(getNextThemeChange(now).getTime()).toBeGreaterThan(now.getTime());
    },
  );

  it.each([false, true])(
    "applies the correct initial theme even if storage is blocked: %s",
    (blocked) => {
      vi.useFakeTimers();
      const names = new Set(["dark"]);
      const root = {
        classList: {
          remove: (...items: string[]) =>
            items.forEach((item) => names.delete(item)),
          add: (item: string) => names.add(item),
        },
        style: { colorScheme: "dark" },
      };
      const setItem = vi.fn(() => {
        if (blocked) throw new Error("Storage blocked");
      });
      const context = {
        Date,
        document: { documentElement: root },
        localStorage: { setItem },
      };
      vi.setSystemTime(new Date(2026, 9, 4, 9));
      runInNewContext(themeBootstrapScript, context);
      expect([...names]).toEqual(["light"]);
      expect(root.style.colorScheme).toBe("light");
      expect(setItem).toHaveBeenCalledWith("theme", "light");
      vi.setSystemTime(new Date(2026, 9, 4, 17));
      runInNewContext(themeBootstrapScript, context);
      expect([...names]).toEqual(["dark"]);
      expect(root.style.colorScheme).toBe("dark");
    },
  );
});
