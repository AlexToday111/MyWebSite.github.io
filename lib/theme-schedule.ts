export const LIGHT_START_HOUR = 9;
export const LIGHT_END_HOUR = 17;

export function getScheduledTheme(date: Date): "light" | "dark" {
  const hour = date.getHours();
  return hour >= LIGHT_START_HOUR && hour < LIGHT_END_HOUR ? "light" : "dark";
}

export function getNextThemeChange(date: Date): Date {
  const next = new Date(date);
  const hour = date.getHours();
  if (hour >= LIGHT_END_HOUR) next.setDate(next.getDate() + 1);
  next.setHours(
    hour >= LIGHT_START_HOUR && hour < LIGHT_END_HOUR
      ? LIGHT_END_HOUR
      : LIGHT_START_HOUR,
    0,
    0,
    0,
  );
  return next;
}

// Runs before the page content paints, including on static GitHub Pages exports.
export const themeBootstrapScript = `(() => {
  const hour = new Date().getHours();
  const theme = hour >= ${LIGHT_START_HOUR} && hour < ${LIGHT_END_HOUR} ? 'light' : 'dark';
  const root = document.documentElement;
  root.classList.remove('light', 'dark');
  root.classList.add(theme);
  root.style.colorScheme = theme;
  try { localStorage.setItem('theme', theme); } catch {}
})();`;
