"use client";

import { motion } from "framer-motion";
import { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import { projectCategories, projects, type Project } from "@/data/projects";
import { withBasePath } from "@/lib/paths";
import ProjectToolIcons from "./ProjectToolIcons";

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

const hexToRgba = (hex: string, a = 1) => {
  const h = hex.replace("#", "");
  const n = parseInt(
    h.length === 3
      ? h
          .split("")
          .map((c) => c + c)
          .join("")
      : h,
    16,
  );
  const r = (n >> 16) & 255;
  const g = (n >> 8) & 255;
  const b = n & 255;
  return `rgba(${r}, ${g}, ${b}, ${a})`;
};

function projectInitials(title: string) {
  return title
    .split(/\s+/)
    .filter(Boolean)
    .slice(0, 3)
    .map((word) => word[0])
    .join("")
    .toUpperCase();
}

function LogoSlot({ project }: { project: Project }) {
  return (
    <div className="relative mx-auto grid h-28 w-28 place-items-center rounded-3xl border border-violet-300/25 bg-black/25 p-2 shadow-[0_0_30px_rgba(167,139,250,0.2)] backdrop-blur sm:h-32 sm:w-32">
      {project.logo ? (
        <img
          src={withBasePath(project.logo)}
          alt={`${project.title} logo`}
          className={`object-contain ${project.logoClassName ?? "h-full w-full"}`}
          draggable={false}
        />
      ) : (
        <div className="text-center">
          <div className="text-xl font-black tracking-tight text-white sm:text-2xl">
            {projectInitials(project.title)}
          </div>
          <div className="mt-1 text-[0.55rem] uppercase tracking-[0.18em] text-white/35">
            logo
          </div>
        </div>
      )}
      <span className="pointer-events-none absolute -inset-1 -z-10 rounded-[1.7rem] bg-violet-400/20 blur-xl" />
    </div>
  );
}

function ProjectMiniCard({ project }: { project: Project }) {
  const repo = project.links?.repo;
  const content = (
    <>
      <div className="pointer-events-none absolute inset-x-6 top-0 h-px bg-gradient-to-r from-transparent via-violet-300/70 to-transparent" />
      <LogoSlot project={project} />

      <h4 className="mt-6 flex min-h-[2.75rem] items-center justify-center text-base font-bold leading-tight text-white sm:text-lg">
        {project.title}
      </h4>
      <p className="mt-3 min-h-[5.5rem] text-sm leading-relaxed text-white/58 font-readable">
        {project.description}
      </p>

      <div className="mt-auto pt-4">
        <ProjectToolIcons stack={project.stack} limit={8} />
      </div>
    </>
  );

  const className =
    "group/project relative flex h-full min-h-[23rem] flex-col overflow-hidden rounded-3xl border border-white/10 bg-white/[0.045] p-4 text-center transition-all duration-300 hover:-translate-y-1 hover:border-violet-300/35 hover:bg-white/[0.065] focus:outline-none focus:ring-2 focus:ring-violet-300/70 sm:p-5";

  if (repo) {
    return (
      <Link
        href={repo}
        target="_blank"
        rel="noreferrer"
        className={className}
        aria-label={`Open ${project.title} repository`}
      >
        {content}
      </Link>
    );
  }

  return <article className={className}>{content}</article>;
}

export default function NeonProjectGrid() {
  const dir = useScrollDirection();
  const grouped = useMemo(
    () =>
      projectCategories.map((category) => ({
        category,
        items: projects.filter((project) => project.category === category),
      })),
    [],
  );

  const variants = {
    hidden: (d: "down" | "up") => ({ opacity: 0, y: d === "down" ? 40 : -40 }),
    show: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] },
    },
  };

  return (
    <div className="relative">
      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 xl:grid-cols-4">
        {grouped.map(({ category, items }) => {
          const violet = "#A78BFA";
          const border = hexToRgba(violet, 0.5);
          const glow = hexToRgba(violet, 0.22);

          return (
            <motion.section
              key={category}
              className="group relative rounded-[2rem]"
              custom={dir}
              initial="hidden"
              whileInView="show"
              viewport={{ amount: 0.22, once: false }}
              variants={variants}
            >
              <div
                className="h-full rounded-[2rem] border bg-card/90 p-4 shadow-sm sm:p-5"
                style={{
                  borderColor: border,
                  boxShadow: `0 0 0 1px ${border} inset, 0 0 34px ${glow}`,
                }}
              >
                <div className="mb-5 text-center">
                  <h3 className="text-lg font-black text-white sm:text-xl">
                    {category}
                  </h3>
                </div>

                <div className="space-y-4">
                  {items.map((project) => (
                    <ProjectMiniCard key={project.title} project={project} />
                  ))}
                </div>
              </div>
              <span
                aria-hidden
                className="pointer-events-none absolute -inset-2 -z-10 rounded-[2.2rem] blur-2xl opacity-25 transition-opacity duration-300 group-hover:opacity-45"
                style={{
                  background: `radial-gradient(60% 60% at 50% 85%, ${glow}, transparent 62%)`,
                }}
              />
            </motion.section>
          );
        })}
      </div>
    </div>
  );
}
