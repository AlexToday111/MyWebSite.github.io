"use client";

import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import Link from "next/link";

function useScrollDirection() {
  const [dir, setDir] = useState<"down" | "up">("down");
  useEffect(() => {
    let lastY = window.scrollY;
    const onScroll = () => {
      const y = window.scrollY;
      if (Math.abs(y - lastY) > 2) {
        setDir(y > lastY ? "down" : "up");
        lastY = y;
      }
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);
  return dir;
}

export default function NeonProjectGrid() {
  const cards: { title: string; text: string }[] = [
    { title: "Сервис на Spring", text: "REST API, аутентификация, права доступа, кеширование. Миграции, мониторинг, контейнеризация." },
    { title: "Streaming с Kafka", text: "Топики, группы потребителей, ретраи/партиции, DLQ и мониторинг пайплайнов." },
    { title: "Кэш Redis", text: "Ключи c TTL, rate limiting, pub/sub, репликация." },
    { title: "CI/CD", text: "Git, тесты (JUnit/Mockito), сборка, контейнеризация и деплой." },
  ];

  const hexToRgba = (hex: string, a = 1) => {
    const h = hex.replace('#','');
    const n = parseInt(h.length === 3 ? h.split('').map(c=>c+c).join('') : h, 16);
    const r = (n >> 16) & 255, g = (n >> 8) & 255, b = n & 255;
    return `rgba(${r}, ${g}, ${b}, ${a})`;
  };

  // unified violet style, same as skills/process cards
  const dir = useScrollDirection();
  const variants = {
    hidden: (d: "down" | "up") => ({ opacity: 0, y: d === "down" ? 40 : -40 }),
    show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] } },
  };

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
      {cards.map(({ title, text }) => {
        const violet = "#A78BFA";
        const border = hexToRgba(violet, 0.55);
        const glow = hexToRgba(violet, 0.25);
        return (
          <motion.div
            key={title}
            className="group relative rounded-2xl"
            custom={dir}
            initial="hidden"
            whileInView="show"
            viewport={{ amount: 0.4, once: false }}
            variants={variants}
          >
            <div
              className="relative rounded-2xl border bg-card/90 p-5 pr-14 text-left shadow-sm"
              style={{ borderColor: border, boxShadow: `0 0 0 1px ${border} inset, 0 0 30px ${glow}` }}
            >
              {/* Per-card folder icon button */}
              <Link
                href="/projects"
                aria-label="Open project"
                className="absolute right-3 top-1/2 -translate-y-1/2 inline-flex h-8 w-8 items-center justify-center rounded-md border border-white/10 bg-white/5 text-violet-400 transition-colors duration-200 hover:bg-violet-500 hover:text-black"
              >
                <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" aria-hidden>
                  <path d="M10 4H4a2 2 0 0 0-2 2v2h20V9a2 2 0 0 1-2 2H4v5a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V8H12l-2-4z" />
                </svg>
              </Link>
              <h3 className="text-base font-semibold">{title}</h3>
              <p className="mt-2 text-sm text-white/70">{text}</p>
            </div>
            <span
              aria-hidden
              className="pointer-events-none absolute -inset-2 -z-10 rounded-3xl blur-2xl opacity-30 transition-opacity duration-300 group-hover:opacity-50"
              style={{ background: `radial-gradient(60% 60% at 50% 85%, ${glow}, transparent 60%)` }}
            />
          </motion.div>
        );
      })}
    </div>
  );
}
