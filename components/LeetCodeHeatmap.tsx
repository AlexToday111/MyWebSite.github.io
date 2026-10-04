"use client";

import { useEffect, useRef } from "react";
import snapshot from "@/data/leetcode.json";
import type { ProfileLanguage } from "@/data/profile-language";
import styles from "./LeetCodeHeatmap.module.css";

const DAY = 86_400_000;
const STEP = 19;
const LEFT = 36;
const TOP = 24;
const COLORS = Array.from(
  { length: 5 },
  (_, level) => `var(--heatmap-${level})`,
);
const submissions: Record<string, number> = snapshot.submissions;
const end = Date.parse(`${snapshot.updatedAt.slice(0, 10)}T00:00:00Z`);
const start = end - 364 * DAY;
const gridStart = start - new Date(start).getUTCDay() * DAY;
const columns = Math.ceil(((end - gridStart) / DAY + 1) / 7);
const days = Array.from({ length: 365 }, (_, index) => {
  const time = start + index * DAY;
  const date = new Date(time);
  const key = date.toISOString().slice(0, 10);
  const count = submissions[key] ?? 0;
  const offset = (time - gridStart) / DAY;
  return {
    date,
    key,
    count,
    column: Math.floor(offset / 7),
    row: offset % 7,
    level:
      count === 0 ? 0 : count <= 2 ? 1 : count <= 5 ? 2 : count <= 10 ? 3 : 4,
  };
});
const total = days.reduce((sum, day) => sum + day.count, 0);
const activeDays = days.filter((day) => day.count > 0).length;
let streak = 0;
let longestStreak = 0;
for (const day of days) {
  streak = day.count > 0 ? streak + 1 : 0;
  longestStreak = Math.max(longestStreak, streak);
}
// Only label a month when it starts, plus the first visible partial month.
const months = days.filter(
  (day, index) => index === 0 || day.date.getUTCDate() === 1,
);
const copy = {
  en: {
    heading: "Algorithm practice",
    solved: "Solved · all time",
    submissions: "submissions",
    activeDays: "active days",
    streak: "days · longest streak",
    period: "Last 12 months",
    updated: "Updated",
    less: "Less",
    more: "More",
    weekdays: ["Mon", "Wed", "Fri"],
  },
  ru: {
    heading: "Практика алгоритмов",
    solved: "Решено · за всё время",
    submissions: "отправок решений",
    activeDays: "активных дней",
    streak: "дней · максимальная серия",
    period: "Последние 12 месяцев",
    updated: "Обновлено",
    less: "Меньше",
    more: "Больше",
    weekdays: ["Пн", "Ср", "Пт"],
  },
};

export default function LeetCodeHeatmap({
  language,
}: {
  language: ProfileLanguage;
}) {
  const scrollRef = useRef<HTMLDivElement>(null);
  const labels = copy[language];
  const locale = language === "ru" ? "ru-RU" : "en-US";
  const monthFormat = new Intl.DateTimeFormat(locale, {
    month: "short",
    timeZone: "UTC",
  });
  const dateFormat = new Intl.DateTimeFormat(locale, {
    day: "numeric",
    month: "short",
    year: "numeric",
    timeZone: "UTC",
  });

  useEffect(() => {
    const element = scrollRef.current;
    if (element) element.scrollLeft = element.scrollWidth - element.clientWidth;
  }, []);

  return (
    <section
      id="leetcode"
      className={styles.section}
      aria-labelledby="leetcode-title"
    >
      <header className={styles.header}>
        <h3 id="leetcode-title">{labels.heading}</h3>
        <a
          href={`https://leetcode.com/u/${snapshot.username}/`}
          target="_blank"
          rel="noreferrer"
        >
          <span className={styles.brand}>LeetCode</span>
          <span>{snapshot.username}</span>
        </a>
      </header>
      <dl className={styles.solved}>
        <div>
          <dt>{labels.solved}</dt>
          <dd>{snapshot.solved.total.toLocaleString(locale)}</dd>
        </div>
        <div>
          <dt className={styles.easy}>Easy</dt>
          <dd>{snapshot.solved.easy.toLocaleString(locale)}</dd>
        </div>
        <div>
          <dt className={styles.medium}>Medium</dt>
          <dd>{snapshot.solved.medium.toLocaleString(locale)}</dd>
        </div>
        <div>
          <dt className={styles.hard}>Hard</dt>
          <dd>{snapshot.solved.hard.toLocaleString(locale)}</dd>
        </div>
      </dl>
      <dl className={styles.stats}>
        <div>
          <dt>{labels.submissions}</dt>
          <dd>{total.toLocaleString(locale)}</dd>
        </div>
        <div>
          <dt>{labels.activeDays}</dt>
          <dd>{activeDays}</dd>
        </div>
        <div>
          <dt>{labels.streak}</dt>
          <dd>{longestStreak}</dd>
        </div>
      </dl>
      <div
        ref={scrollRef}
        className={styles.scroll}
        tabIndex={0}
        role="region"
        aria-label={`${labels.period}: LeetCode`}
      >
        <svg
          className={styles.calendar}
          viewBox={`0 0 ${LEFT + columns * STEP} ${TOP + 7 * STEP}`}
          role="img"
          aria-labelledby="leetcode-calendar-title"
        >
          <title id="leetcode-calendar-title">
            {`${dateFormat.format(start)} — ${dateFormat.format(end)}: ${total} ${labels.submissions}, ${activeDays} ${labels.activeDays}`}
          </title>
          {months.map((day, index) =>
            // The final partial month may share a column with the previous label.
            index > 0 && day.column - months[index - 1].column < 2 ? null : (
              <text
                key={day.key}
                x={LEFT + day.column * STEP}
                y={12}
                className={styles.axis}
              >
                {monthFormat.format(day.date).replace(".", "")}
              </text>
            ),
          )}
          {labels.weekdays.map((label, index) => (
            <text
              key={label}
              x={0}
              y={TOP + (index * 2 + 1) * STEP + 12}
              className={styles.axis}
            >
              {label}
            </text>
          ))}
          {days.map((day) => (
            <rect
              key={day.key}
              data-date={day.key}
              data-count={day.count}
              x={LEFT + day.column * STEP}
              y={TOP + day.row * STEP}
              width={15}
              height={15}
              rx={3}
              fill={COLORS[day.level]}
              className={styles.day}
            >
              <title>{`${dateFormat.format(day.date)} · ${day.count} ${labels.submissions}`}</title>
            </rect>
          ))}
        </svg>
      </div>
      <footer className={styles.footer}>
        <p>
          {labels.period}
          <span aria-hidden="true"> · </span>
          {labels.updated}{" "}
          <time dateTime={snapshot.updatedAt}>{dateFormat.format(end)}</time>
        </p>
        <div className={styles.legend} aria-hidden="true">
          <span>{labels.less}</span>
          {COLORS.map((color) => (
            <i key={color} style={{ backgroundColor: color }} />
          ))}
          <span>{labels.more}</span>
        </div>
      </footer>
    </section>
  );
}
