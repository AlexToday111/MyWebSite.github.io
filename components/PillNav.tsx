"use client";

import { Home, Layers, Briefcase, Sparkles } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { LayoutGroup, motion } from "framer-motion";

const items = [
  { id: "home", label: "Home", icon: Home },
  { id: "stack", label: "Stack", icon: Layers },
  { id: "projects", label: "Projects", icon: Briefcase },
  { id: "final", label: "Final", icon: Sparkles },
] as const;

export default function PillNav() {
  const [active, setActive] = useState<string>("home");
  const [presentIds, setPresentIds] = useState<string[]>(items.map(i => i.id));
  const ticking = useRef(false);

  useEffect(() => {
    const computePresent = () => {
      const ids = items.map(i => i.id).filter(id => !!document.getElementById(id));
      setPresentIds(ids.length ? ids : items.map(i => i.id));
    };

    const updateActive = () => {
      const center = window.innerHeight * 0.5;
      let bestId = active;
      let bestDist = Number.POSITIVE_INFINITY;
      for (const id of items.map(i => i.id)) {
        const el = document.getElementById(id);
        if (!el) continue;
        const rect = el.getBoundingClientRect();
        const dist = Math.abs(rect.top - center);
        if (rect.bottom > 0 && rect.top < window.innerHeight) {
          if (dist < bestDist) {
            bestDist = dist;
            bestId = id;
          }
        }
      }
      if (bestId && bestId !== active) setActive(bestId);
    };

    const onScroll = () => {
      if (ticking.current) return;
      ticking.current = true;
      requestAnimationFrame(() => {
        updateActive();
        ticking.current = false;
      });
    };

    computePresent();
    updateActive();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", computePresent);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", computePresent);
    };
  }, []);

  const scrollTo = (id: string) => {
    const el = document.getElementById(id);
    if (!el) return;
    el.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  return (
    <nav className="fixed left-3 sm:left-8 top-1/2 z-40 -translate-y-1/2" aria-label="Section navigation" aria-orientation="vertical">
      <LayoutGroup>
        <div className="relative flex flex-col gap-2 rounded-full border border-white/10 bg-white/10 backdrop-blur-xl px-3 sm:px-4 py-2 shadow-[0_0_60px_rgba(251,191,36,.12)]">
          {presentIds.map((id) => {
            const meta = items.find(i => i.id === id)!;
            const isActive = active === id;
            const Icon = meta.icon;
            return (
              <button
                key={id}
                type="button"
                onClick={() => scrollTo(id)}
                aria-current={isActive}
                className="relative inline-flex items-center gap-2 rounded-full px-3 py-4 text-sm sm:text-base transition"
              >
                {isActive && (
                  <motion.span
                    layoutId="pill"
                    className="absolute inset-0 rounded-full bg-amber-400/20"
                    transition={{ type: "spring", stiffness: 400, damping: 35 }}
                  />
                )}
                <Icon className="relative z-10 h-5 w-5 text-amber-300" aria-hidden />
                <span className="relative z-10 hidden sm:inline">{meta.label}</span>
              </button>
            );
          })}
        </div>
      </LayoutGroup>
    </nav>
  );
}

