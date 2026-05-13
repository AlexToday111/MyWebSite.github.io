"use client";

import { withBasePath } from "@/lib/paths";
import { useMemo, useState } from "react";
import { projectCategories, projects, type Project } from "@/data/projects";
import { motion } from "framer-motion";
import ProjectToolIcons from "@/components/ProjectToolIcons";

function Tag({
  label,
  active,
  onClick,
}: {
  label: string;
  active: boolean;
  onClick: () => void;
}) {
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

function projectInitials(title: string) {
  return title
    .split(/\s+/)
    .filter(Boolean)
    .slice(0, 3)
    .map((word) => word[0])
    .join("")
    .toUpperCase();
}

function ProjectLogo({ project }: { project: Project }) {
  return (
    <div className="grid h-24 w-24 shrink-0 place-items-center rounded-3xl border border-violet-300/25 bg-black/25 p-2">
      {project.logo ? (
        <img
          src={withBasePath(project.logo)}
          alt={`${project.title} logo`}
          className={`object-contain ${project.logoClassName ?? "h-full w-full"}`}
          draggable={false}
        />
      ) : (
        <div className="text-center">
          <div className="text-xl font-black text-white">
            {projectInitials(project.title)}
          </div>
          <div className="mt-1 text-[0.55rem] uppercase tracking-[0.18em] text-white/35">
            logo
          </div>
        </div>
      )}
    </div>
  );
}

export default function ProjectsPage() {
  const [active, setActive] = useState<string | null>(null);
  const tags = useMemo(
    () => Array.from(new Set(projects.flatMap((p) => p.stack))).sort(),
    [],
  );
  const sorted = useMemo(() => {
    const list = [...projects];
    list.sort((a, b) => {
      const categoryDiff =
        projectCategories.indexOf(a.category) -
        projectCategories.indexOf(b.category);
      if (categoryDiff !== 0) return categoryDiff;
      return Number(b.featured ?? 0) - Number(a.featured ?? 0);
    });
    return active ? list.filter((p) => p.stack.includes(active)) : list;
  }, [active]);

  return (
    <main
      id="projects-page"
      className="container py-8 sm:py-12 md:py-16 reveal"
    >
      <h1 className="text-2xl font-bold sm:text-3xl md:text-4xl">Проекты</h1>
      <div className="mt-4 flex flex-wrap gap-2 sm:mt-6">
        <Tag
          label="Все"
          active={active === null}
          onClick={() => setActive(null)}
        />
        {tags.map((t) => (
          <Tag
            key={t}
            label={t}
            active={active === t}
            onClick={() => setActive(t)}
          />
        ))}
      </div>

      <div className="mt-6 grid grid-cols-1 gap-4 sm:mt-8 sm:grid-cols-2 sm:gap-6 lg:grid-cols-3 reveal-grid">
        {sorted.map((p) => {
          const repo = p.links?.repo;
          const content = (
            <>
              <div className="flex items-start gap-4">
                <ProjectLogo project={p} />
                <div className="min-w-0 flex-1">
                  <span className="rounded-full border border-white/10 bg-white/5 px-2.5 py-1 text-[0.65rem] font-semibold uppercase tracking-[0.16em] text-white/45">
                    {p.category}
                  </span>
                  <h3 className="mt-3 text-lg font-semibold leading-tight">
                    {p.title}
                  </h3>
                </div>
              </div>

              <p className="mt-4 min-h-[4.5rem] text-sm text-muted font-readable">
                {p.description}
              </p>
              <div className="mt-auto pt-4">
                <ProjectToolIcons stack={p.stack} />
              </div>
            </>
          );

          if (repo) {
            return (
              <motion.a
                key={p.title}
                href={repo}
                target="_blank"
                rel="noreferrer"
                aria-label={`Open ${p.title} repository`}
                whileHover={{ y: -4 }}
                className="group flex h-full flex-col rounded-3xl border border-white/10 bg-card/75 p-4 shadow-soft transition-shadow hover:border-violet-300/35 focus:outline-none focus:ring-2 focus:ring-violet-300/70"
              >
                {content}
              </motion.a>
            );
          }

          return (
            <motion.article
              key={p.title}
              whileHover={{ y: -4 }}
              className="group flex h-full flex-col rounded-3xl border border-white/10 bg-card/75 p-4 shadow-soft transition-shadow"
            >
              {content}
            </motion.article>
          );
        })}
      </div>
    </main>
  );
}
