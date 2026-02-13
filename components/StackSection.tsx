import Image from "next/image";
import { withBasePath } from "@/lib/paths";
import { RefreshCw, Workflow, KanbanSquare } from "lucide-react";

const PRIMARY = [
  { name: "Java", src: "/icons/java-original-8x.png", level: 5 },
  { name: "Spring", src: "/icons/spring-original-8x.png", level: 4 },
  { name: "Git", src: "/icons/git-icon-8x.png", level: 4 },
] as const;

const SECONDARY = [
  { name: "Kafka", src: "/icons/kafka.png" },
  { name: "Redis", src: "/icons/redis-original-8x.png" },
  { name: "Hibernate", src: "/icons/hibernate-8x.png" },
  { name: "JUnit", src: "/icons/junit-plain-8x.png" },
  { name: "Python", src: "/icons/python-8x.png" },
  { name: "C++", src: "/icons/c-plusplus-8x.png" },
] as const;

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

function Rating({ value }: { value: number }) {
  const cells = Array.from({ length: 5 }, (_, i) => i < value);
  return (
    <div className="flex items-center gap-1">
      {cells.map((on, i) => (
        <span
          key={i}
          className={`h-2.5 w-6 rounded-full border ${on ? "bg-[hsl(var(--accent-purple))] border-[hsl(var(--accent-purple))]" : "border-white/15 bg-white/5"}`}
        />
      ))}
    </div>
  );
}

export default function StackSection() {
  return (
    <section id="stack" className="container py-6 sm:py-8 md:py-10">
      <div className="mb-4 text-center reveal">
        <h2 className="text-[2rem] sm:text-[2.4rem] md:text-[3rem] font-extrabold tracking-tight [font-family:var(--ff-exotica)]">Технический стек</h2>
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        <div className="relative rounded-3xl border bg-card/95 p-4 sm:p-6 shadow-sm">
          <div className="text-xs sm:text-sm text-white/60">Образование</div>
          <div className="mt-2 text-base sm:text-lg font-semibold text-white/90">Университет Иннополис</div>
          <div className="text-xs sm:text-sm text-white/60">2024–2028</div>
        </div>
        <div
          className="relative rounded-3xl border bg-card/95 p-4 sm:p-6 shadow-sm"
          style={{
            borderColor: hexToRgba("#A78BFA", 0.55),
            boxShadow: `0 0 0 1px ${hexToRgba("#A78BFA", 0.55)} inset, 0 0 30px ${hexToRgba("#A78BFA", 0.25)}`,
          }}
        >
          <div className="text-xs sm:text-sm text-white/60">Владение процессами</div>
          <div className="mt-3 flex flex-wrap gap-2 sm:gap-3">
            <span className="inline-flex items-center gap-1.5 rounded-full border border-white/10 bg-white/5 px-3 py-1.5 text-xs sm:text-sm text-white/80">
              <RefreshCw className="h-4 w-4 text-[hsl(var(--accent-purple))]" aria-hidden />
              Scrum
            </span>
            <span className="inline-flex items-center gap-1.5 rounded-full border border-white/10 bg-white/5 px-3 py-1.5 text-xs sm:text-sm text-white/80">
              <Workflow className="h-4 w-4 text-[hsl(var(--accent-purple))]" aria-hidden />
              Agile
            </span>
            <span className="inline-flex items-center gap-1.5 rounded-full border border-white/10 bg-white/5 px-3 py-1.5 text-xs sm:text-sm text-white/80">
              <KanbanSquare className="h-4 w-4 text-[hsl(var(--accent-purple))]" aria-hidden />
              Kanban
            </span>
          </div>
        </div>
      </div>

      <div className="mt-5 grid gap-3 md:grid-cols-3">
        {PRIMARY.map((p) => {
          const rim = rimFor(p.name);
          const border = hexToRgba(rim, 0.55);
          const glow = hexToRgba(rim, 0.25);
          return (
            <div
              key={p.name}
              className="relative rounded-2xl border bg-card/95 p-3 sm:p-4 shadow-sm"
              style={{ borderColor: border, boxShadow: `0 0 0 1px ${border} inset, 0 0 24px ${glow}` }}
            >
              <div className="flex items-center gap-3">
                <div className="grid h-12 w-12 place-items-center rounded-xl border border-white/10 bg-white/5">
                  <Image
                    src={withBasePath(p.src)}
                    alt={p.name}
                    width={48}
                    height={48}
                    className="h-7 w-7"
                    draggable={false}
                  />
                </div>
                <div className="min-w-0">
                  <div className="text-sm sm:text-base font-semibold text-white/90">{p.name}</div>
                  <div className="mt-2">
                    <Rating value={p.level} />
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      <div className="mt-4 text-xs sm:text-sm text-white/60 text-center">Остальные навыки</div>
      <div className="mt-3 flex flex-wrap justify-center gap-3 sm:gap-4">
        {SECONDARY.map((p) => {
          const rim = rimFor(p.name);
          const border = hexToRgba(rim, 0.45);
          const glow = hexToRgba(rim, 0.2);
          return (
            <div key={p.name} className="relative rounded-2xl border bg-card/95 p-3 sm:p-4 text-center shadow-sm min-w-[90px] sm:min-w-[100px]" style={{ borderColor: border, boxShadow: `0 0 0 1px ${border} inset, 0 0 20px ${glow}` }}>
              <div className="mx-auto grid h-10 w-10 place-items-center">
                <Image
                  src={withBasePath(p.src)}
                  alt={p.name}
                  width={40}
                  height={40}
                  className="h-8 w-8"
                  style={p.name === "Kafka" ? { filter: "brightness(0) saturate(100%) invert(69%) sepia(36%) saturate(726%) hue-rotate(208deg) brightness(102%) contrast(103%)" } : undefined}
                  draggable={false}
                />
              </div>
              <div className="mt-2 text-[11px] sm:text-xs text-white/75">{p.name}</div>
            </div>
          );
        })}
      </div>
    </section>
  );
}
