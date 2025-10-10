import Image from "next/image";
import { withBasePath } from "@/lib/paths";
import GlassCard from "./GlassCard";
import { profile } from "@/data/profile";
import { RefreshCw, Workflow, KanbanSquare } from "lucide-react";

const PRIMARY = [
  { name: "Java", src: "/icons/java-original-8x.png", color: "#007396" },
  { name: "Spring", src: "/icons/spring-original-8x.png", color: "#6DB33F" },
  { name: "C++", src: "/icons/c-plusplus-8x.png", color: "#00599C" },
  { name: "Python", src: "/icons/python-8x.png", color: "#3776AB" },
] as const;

const SECONDARY = [
  { name: "Kafka", src: "/icons/kafka.png", color: "#231F20" },
  { name: "Redis", src: "/icons/redis-original-8x.png", color: "#DC382D" },
  { name: "Hibernate", src: "/icons/hibernate-8x.png", color: "#59666C" },
  { name: "Git", src: "/icons/git-icon-8x.png", color: "#F05032" },
  { name: "JUnit", src: "/icons/junit-plain-8x.png", color: "#25A162" },
] as const;

function LangBars() {
  return (
    <div className="mt-4 space-y-3">
      {profile.languages.map((l) => (
        <div key={l.name}>
          <div className="flex items-center justify-between text-sm">
            <span>{l.name}</span>
            <span className="text-white/60">{l.level}</span>
          </div>
          <div className="mt-1 h-2 w-full rounded-full bg-white/10">
            <div className="h-2 rounded-full bg-[hsl(var(--accent-purple))]" style={{ width: `${l.value}%` }} />
          </div>
        </div>
      ))}
    </div>
  );
}

function rimFor(name: string): string {
  const n = name.toLowerCase();
  if (n.includes("java")) return "#3B82F6"; // blue
  if (n.includes("spring")) return "#22C55E"; // green
  if (n.includes("c++")) return "#3B82F6"; // blue
  if (n.includes("python")) return "#FBBF24"; // yellow/amber
  if (n.includes("kafka")) return "#A78BFA"; // violet
  if (n.includes("redis")) return "#EF4444"; // red
  if (n.includes("hibernate")) return "#D6C59A"; // sand
  if (n.includes("git")) return "#EF4444"; // red
  if (n.includes("junit")) return "#EF4444"; // red (as requested)
  return "#8B5CF6"; // default violet
}

function hexToRgba(hex: string, alpha = 1) {
  const h = hex.replace('#','');
  const bigint = parseInt(h.length === 3 ? h.split('').map(c=>c+c).join('') : h, 16);
  const r = (bigint >> 16) & 255;
  const g = (bigint >> 8) & 255;
  const b = bigint & 255;
  return `rgba(${r}, ${g}, ${b}, ${alpha})`;
}

export default function StackSection() {
  return (
    <section id="stack" className="container py-14 sm:py-16">
      <div className="mb-6 text-center reveal">
        <h2 className="text-2xl sm:text-3xl font-extrabold tracking-tight [font-family:var(--ff-exotica)]">Стэк</h2>
        <p className="mt-2 text-sm text-white/70 max-w-2xl mx-auto">Основные технологии и инструменты, с которыми я работаю.</p>
      </div>

      {/* Primary icons */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 reveal-grid">
        {PRIMARY.map((p) => {
          const rim = rimFor(p.name);
          const border = hexToRgba(rim, 0.55);
          const glow = hexToRgba(rim, 0.25);
          return (
            <div key={p.name} className="group relative rounded-2xl transition-transform duration-300 hover:scale-[1.02]">
              <div
                className="rounded-2xl border bg-card/90 p-5 text-center shadow-sm"
                style={{ borderColor: border, boxShadow: `0 0 0 1px ${border} inset, 0 0 30px ${glow}` }}
              >
                <div className="mx-auto grid h-14 w-14 place-items-center">
                  <Image
                    src={withBasePath(p.src)}
                    alt={p.name}
                    width={56}
                    height={56}
                    className="transition-transform duration-200 group-hover:scale-110"
                    draggable={false}
                  />
                </div>
                <div className="mt-3 text-sm text-white/80">{p.name}</div>
              </div>
              <span
                aria-hidden
                className="pointer-events-none absolute -inset-2 -z-10 rounded-3xl blur-2xl opacity-30 transition-opacity duration-300 group-hover:opacity-50"
                style={{ background: `radial-gradient(60% 60% at 50% 85%, ${glow}, transparent 60%)` }}
              />
            </div>
          );
        })}
      </div>

      {/* Secondary brand tiles */}
      <div className="mt-4 grid grid-cols-3 sm:grid-cols-5 gap-4 reveal-grid">
        {SECONDARY.map((p) => {
          const rim = rimFor(p.name);
          const border = hexToRgba(rim, 0.55);
          const glow = hexToRgba(rim, 0.25);
          return (
            <div key={p.name} className="group relative rounded-2xl transition-transform duration-300 hover:scale-[1.02]">
              <div
                className="rounded-2xl border bg-card/90 p-4 text-center shadow-sm"
                style={{ borderColor: border, boxShadow: `0 0 0 1px ${border} inset, 0 0 26px ${glow}` }}
              >
                <div className="mx-auto grid h-10 w-10 place-items-center">
                  <Image
                    src={withBasePath(p.src)}
                    alt={p.name}
                    width={40}
                    height={40}
                    className="transition-transform duration-200 group-hover:scale-110"
                    style={p.name === 'Kafka' ? { filter: 'brightness(0) saturate(100%) invert(69%) sepia(36%) saturate(726%) hue-rotate(208deg) brightness(102%) contrast(103%)' } : undefined}
                    draggable={false}
                  />
                </div>
                <div className="mt-2 text-xs text-white/75">{p.name}</div>
              </div>
              <span
                aria-hidden
                className="pointer-events-none absolute -inset-2 -z-10 rounded-3xl blur-2xl opacity-30 transition-opacity duration-300 group-hover:opacity-50"
                style={{ background: `radial-gradient(60% 60% at 50% 85%, ${glow}, transparent 60%)` }}
              />
            </div>
          );
        })}
      </div>

      {/* Владение языками */}
      <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Languages card: dark rim style */}
        <div className="group relative rounded-3xl h-full transition-transform duration-300 hover:scale-[1.02]">
          <div
            className="rounded-3xl border bg-card/90 p-5 md:p-6 shadow-sm h-full"
            style={{
              borderColor: hexToRgba('#A78BFA', 0.55),
              boxShadow: `0 0 0 1px ${hexToRgba('#A78BFA', 0.55)} inset, 0 0 36px ${hexToRgba('#A78BFA', 0.25)}`,
            }}
          >
            <h3 className="text-sm font-semibold text-white/80">Владение языками</h3>
            <div className="mt-3">
              {profile.languages.slice(0, 3).map((l) => (
                <div key={l.name} className="mt-2 first:mt-0">
                  <div className="flex items-center justify-between text-xs">
                    <span className="text-white/80">{l.name}</span>
                    <span className="text-white/60">{l.level}</span>
                  </div>
                  <div className="mt-1 h-2 w-full rounded-full bg-white/10">
                    <div className="h-2 rounded-full bg-[hsl(var(--accent-purple))]" style={{ width: `${l.value}%` }} />
                  </div>
                </div>
              ))}
            </div>
            {/* decorative chart removed by request */}
          </div>
          <span
            aria-hidden
            className="pointer-events-none absolute -inset-2 -z-10 rounded-[2rem] blur-2xl opacity-30 transition-opacity duration-300 group-hover:opacity-50"
            style={{ background: `radial-gradient(60% 60% at 50% 85%, ${hexToRgba('#A78BFA', 0.25)}, transparent 60%)` }}
          />
        </div>

        {/* Processes card: dark rim style */}
        <div className="group relative rounded-3xl h-full transition-transform duration-300 hover:scale-[1.02]">
          <div
            className="rounded-3xl border bg-card/90 p-5 md:p-6 shadow-sm h-full"
            style={{
              borderColor: hexToRgba('#A78BFA', 0.55),
              boxShadow: `0 0 0 1px ${hexToRgba('#A78BFA', 0.55)} inset, 0 0 36px ${hexToRgba('#A78BFA', 0.25)}`,
            }}
          >
            <h3 className="text-sm font-semibold text-white/80">Владение процессами</h3>
            <p className="mt-1.5 text-xs text-white/70">Командные методологии и планирование</p>
            <div className="mt-5 mb-2 min-h-16 flex flex-wrap gap-3 justify-center items-center">
              <span className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-1.5 text-sm sm:text-base text-white/80">
                <RefreshCw className="h-5 w-5 text-[hsl(var(--accent-purple))]" aria-hidden />
                Scrum
              </span>
              <span className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-1.5 text-sm sm:text-base text-white/80">
                <Workflow className="h-5 w-5 text-[hsl(var(--accent-purple))]" aria-hidden />
                Agile
              </span>
              <span className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-1.5 text-sm sm:text-base text-white/80">
                <KanbanSquare className="h-5 w-5 text-[hsl(var(--accent-purple))]" aria-hidden />
                Kanban
              </span>
            </div>
          </div>
          <span
            aria-hidden
            className="pointer-events-none absolute -inset-2 -z-10 rounded-[2rem] blur-2xl opacity-30 transition-opacity duration-300 group-hover:opacity-50"
            style={{ background: `radial-gradient(60% 60% at 50% 85%, ${hexToRgba('#A78BFA', 0.25)}, transparent 60%)` }}
          />
        </div>
      </div>
    </section>
  );
}
