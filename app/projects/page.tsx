"use client";

import Image from "next/image";
import { useMemo, useState } from "react";
import { projects } from "@/data/projects";
import { motion } from "framer-motion";

function Tag({ label, active, onClick }: { label: string; active: boolean; onClick: () => void }) {
  return (
    <button
      onClick={onClick}
      className={`rounded-full border px-3 py-1 text-sm transition ${active ? "border-[hsl(var(--accent-green))] bg-[hsl(var(--accent-green))]/10" : "border-white/10 hover:border-white/20"}`}
      aria-pressed={active}
    >
      {label}
    </button>
  );
}

export default function ProjectsPage() {
  const [active, setActive] = useState<string | null>(null);
  const tags = useMemo(() => Array.from(new Set(projects.flatMap((p) => p.stack))).sort(), []);
  const sorted = useMemo(() => {
    const list = [...projects];
    list.sort((a, b) => Number(b.featured ?? 0) - Number(a.featured ?? 0));
    return active ? list.filter((p) => p.stack.includes(active)) : list;
  }, [active]);

  return (
    <main className="container py-16">
      <h1 className="text-3xl sm:text-4xl font-bold">Проекты</h1>
      <div className="mt-6 flex flex-wrap gap-2">
        <Tag label="Все" active={active === null} onClick={() => setActive(null)} />
        {tags.map((t) => (
          <Tag key={t} label={t} active={active === t} onClick={() => setActive(t)} />
        ))}
      </div>

      <div className="mt-8 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {sorted.map((p) => (
          <motion.article
            key={p.title}
            whileHover={{ y: -4 }}
            className="group rounded-2xl border border-white/10 bg-card/60 p-3 shadow-soft transition-shadow"
          >
            <div className="overflow-hidden rounded-xl">
              <Image
                src={p.image}
                alt={p.title}
                width={800}
                height={500}
                className="h-44 w-full object-cover transition-transform duration-200 will-change-transform group-hover:scale-[1.03]"
                priority={p.featured}
              />
            </div>
            <div className="p-3">
              <h3 className="text-lg font-semibold">{p.title}</h3>
              <p className="mt-1 text-sm text-muted">{p.description}</p>
              <div className="mt-3 flex flex-wrap gap-2">
                {p.stack.map((s) => (
                  <span key={s} className="rounded-md border border-white/10 bg-white/5 px-2 py-0.5 text-xs text-muted font-mono">
                    {s}
                  </span>
                ))}
              </div>
              <div className="mt-4 flex gap-3">
                {p.links?.demo && (
                  <a className="rounded-xl px-3 py-1.5 text-sm bg-[hsl(var(--accent-purple))]/15 hover:bg-[hsl(var(--accent-purple))]/25" href={p.links.demo} target="_blank" rel="noreferrer">
                    Demo
                  </a>
                )}
                {p.links?.repo && (
                  <a className="rounded-xl px-3 py-1.5 text-sm bg-[hsl(var(--accent-green))]/15 hover:bg-[hsl(var(--accent-green))]/25" href={p.links.repo} target="_blank" rel="noreferrer">
                    Repo
                  </a>
                )}
              </div>
            </div>
          </motion.article>
        ))}
      </div>
    </main>
  );
}


