"use client";

import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import Link from "next/link";
import { FolderOpen } from "lucide-react";

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
        "Веб-сервис, предоставляющий оптимизированную платформу для проектирования, компиляции и отладки цифровых схем непосредственно в браузере.",
      href: "https://github.com/AlexToday666/Visual-Circuit-Designer",
    },
    {
      title: "Торговая система",
      text:
        "Реализация стратегии дивергенций цены и RSI: живой сканер и торговля через MetaTrader 5, бэктест на Backtrader, HTML-отчёты QuantStats, утилиты для выгрузки данных и списка инструментов",
      href: "https://github.com/AlexToday666/MT5-Divergence-Bot",
    },
    {
      title: "Rating My Spot",
      text:
        "REST API сервис для поиска лучших мест работы (кафе, коворкинги, библиотеки) с фильтрацией по уровню шума, скорости Wi‑Fi и количеству розеток",
      href: "https://github.com/AlexToday666/RMS",
    },
    {
      title: "Notes API",
      text:
        "это простой REST-сервис для хранения заметок с тегами, поддержкой поиска и архивирования.",
      href: "https://github.com/AlexToday666/Notes-API",
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
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
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
              className="relative h-40 rounded-2xl border bg-card/90 p-4 pr-12 text-left shadow-sm flex flex-col"
              style={{ borderColor: border, boxShadow: `0 0 0 1px ${border} inset, 0 0 30px ${glow}` }}
            >
              {/* Per-card folder icon button */}
              <Link
                href={href}
                target="_blank"
                rel="noreferrer"
                aria-label="Open project on GitHub"
                className="absolute right-3 top-1/2 -translate-y-1/2 inline-flex h-8 w-8 items-center justify-center rounded-md border border-white/10 bg-white/5 text-violet-400 transition-colors duration-200 hover:bg-violet-500 hover:text-black"
              >
                <FolderOpen className="h-4 w-4" strokeWidth={2.2} aria-hidden />
              </Link>
              <span className="inline-flex w-fit items-center rounded-full border border-white/10 bg-white/5 px-3 py-1 text-sm text-white/90 font-semibold">
                {title}
              </span>
              <p className="mt-2 text-sm text-white/70 font-readable clamp-2">
                {text}
              </p>
              <span className="mt-auto text-xs text-white/40">&nbsp;</span>
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
