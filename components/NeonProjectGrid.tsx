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
  const cards: { title: string; text: string; href: string }[] = [
    {
      title: "Visual Curcuit Designer",
      text:
        "Веб-сервис, предоставляющий оптимизированную платформу для проектирования, компиляции и отладки цифровых схем.",
      href: "https://github.com/AlexToday111/Visual-Circuit-Designer",
    },
    {
      title: "Trading System",
      text:
        "Реализация стратегии дивергенций цены и RSI: живой сканер и торговля через MetaTrader 5, бэктест на Backtrader, HTML-отчёты QuantStats.",
      href: "https://github.com/AlexToday111/MT5-Divergence-Bot",
    },
    {
      title: "Rating My Spot",
      text:
        "REST API сервис для поиска лучших мест работы (кафе, коворкинги, библиотеки) с фильтрацией по уровню шума, скорости Wi‑Fi.",
      href: "https://github.com/AlexToday111/RMS",
    },
    {
      title: "Notes API",
      text:
        "REST-сервис для хранения заметок с тегами, поддержкой поиска и архивирования.",
      href: "https://github.com/AlexToday111/Notes-API",
    },
  ];

  const hexToRgba = (hex: string, a = 1) => {
    const h = hex.replace('#','');
    const n = parseInt(h.length === 3 ? h.split('').map(c=>c+c).join('') : h, 16);
    const r = (n >> 16) & 255, g = (n >> 8) & 255, b = n & 255;
    return `rgba(${r}, ${g}, ${b}, ${a})`;
  };

  const dir = useScrollDirection();
  const variants = {
    hidden: (d: "down" | "up") => ({ opacity: 0, y: d === "down" ? 40 : -40 }),
    show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] } },
  };

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6 md:gap-7">
      {cards.map(({ title, text, href }) => {
        const violet = "#A78BFA";
        const border = hexToRgba(violet, 0.55);
        const glow = hexToRgba(violet, 0.25);
        return (
          <motion.div
            key={title}
            className="group relative rounded-2xl h-full"
            custom={dir}
            initial="hidden"
            whileInView="show"
            viewport={{ amount: 0.4, once: false }}
            variants={variants}
          >
            <div
              className="relative min-h-[200px] sm:h-60 rounded-2xl border bg-card/95 p-4 sm:p-6 text-center shadow-sm flex flex-col items-center justify-center"
              style={{ borderColor: border, boxShadow: `0 0 0 1px ${border} inset, 0 0 30px ${glow}` }}
            >
              <Link
                href={href}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center justify-center rounded-full border border-white/10 bg-white/5 px-4 py-2 sm:px-5 text-base sm:text-lg text-white/90 font-semibold transition-all duration-200 hover:bg-violet-500 hover:text-black hover:scale-105 hover:ring-2 hover:ring-violet-500/60 hover:ring-offset-2 hover:ring-offset-[hsl(var(--bg))]"
              >
                {title}
              </Link>
              <p className="mt-3 sm:mt-4 text-sm sm:text-base md:text-lg text-white/70 font-readable clamp-2 text-center px-2">
                {text}
              </p>
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
