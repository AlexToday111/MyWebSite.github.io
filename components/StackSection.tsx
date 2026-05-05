import { withBasePath } from "@/lib/paths";
import { profile } from "@/data/profile";
import {
  CheckCircle2,
  Gauge,
  KanbanSquare,
  Languages,
  RefreshCw,
  Workflow,
} from "lucide-react";

type StackItem = {
  id: string;
  name: string;
  icon: string;
  color: string;
};

type GraphNode = {
  id: string;
  x: number;
  y: number;
  size?: "hub" | "normal" | "small";
};

type GraphGroup = {
  title: string;
  accent: string;
  nodes: GraphNode[];
  edges: Array<[string, string]>;
};

const STACK: StackItem[] = [
  { id: "java", name: "Java", icon: "/icons/stack/java.svg", color: "#007396" },
  {
    id: "spring",
    name: "Spring",
    icon: "/icons/stack/spring.svg",
    color: "#6DB33F",
  },
  {
    id: "hibernate",
    name: "Hibernate",
    icon: "/icons/stack/hibernate.svg",
    color: "#BCAE79",
  },
  {
    id: "docker",
    name: "Docker",
    icon: "/icons/stack/docker.svg",
    color: "#2496ED",
  },
  {
    id: "github",
    name: "GitHub",
    icon: "/icons/stack/github.svg",
    color: "#F5F5F5",
  },
  { id: "git", name: "Git", icon: "/icons/stack/git.svg", color: "#F05032" },
  {
    id: "maven",
    name: "Maven",
    icon: "/icons/stack/maven.svg",
    color: "#C71A36",
  },
  {
    id: "kafka",
    name: "Kafka",
    icon: "/icons/stack/kafka.svg",
    color: "#A78BFA",
  },
  {
    id: "rabbitmq",
    name: "RabbitMQ",
    icon: "/icons/stack/rabbitmq.svg",
    color: "#FF6600",
  },
  {
    id: "junit",
    name: "JUnit",
    icon: "/icons/stack/junit.svg",
    color: "#25A162",
  },
  {
    id: "nginx",
    name: "Nginx",
    icon: "/icons/stack/nginx.svg",
    color: "#009639",
  },
  {
    id: "prometheus",
    name: "Prometheus",
    icon: "/icons/stack/prometheus.svg",
    color: "#E6522C",
  },
  {
    id: "grafana",
    name: "Grafana",
    icon: "/icons/stack/grafana.svg",
    color: "#F46800",
  },
  {
    id: "mysql",
    name: "MySQL",
    icon: "/icons/stack/mysql.svg",
    color: "#4479A1",
  },
  {
    id: "githubactions",
    name: "GitHub Actions",
    icon: "/icons/stack/githubactions.svg",
    color: "#2088FF",
  },
  {
    id: "postgres",
    name: "Postgres",
    icon: "/icons/stack/postgres.svg",
    color: "#4169E1",
  },
  {
    id: "mongodb",
    name: "MongoDB",
    icon: "/icons/stack/mongodb.svg",
    color: "#47A248",
  },
  {
    id: "redis",
    name: "Redis",
    icon: "/icons/stack/redis.svg",
    color: "#DC382D",
  },
  {
    id: "fastapi",
    name: "FastAPI",
    icon: "/icons/stack/fastapi.svg",
    color: "#009688",
  },
  { id: "grpc", name: "gRPC", icon: "/icons/stack/grpc.svg", color: "#4A7DFF" },
] as const;

const STACK_BY_ID = Object.fromEntries(STACK.map((item) => [item.id, item]));

const GRAPH_GROUPS: GraphGroup[] = [
  {
    title: "Backend Core",
    accent: "#A78BFA",
    nodes: [
      { id: "java", x: 50, y: 50, size: "hub" },
      { id: "spring", x: 31, y: 28 },
      { id: "hibernate", x: 22, y: 68 },
      { id: "maven", x: 73, y: 25 },
      { id: "junit", x: 78, y: 68 },
      { id: "grpc", x: 51, y: 17, size: "small" },
      { id: "fastapi", x: 52, y: 84, size: "small" },
    ],
    edges: [
      ["java", "spring"],
      ["spring", "hibernate"],
      ["java", "maven"],
      ["java", "junit"],
      ["spring", "grpc"],
      ["java", "fastapi"],
      ["hibernate", "junit"],
    ],
  },
  {
    title: "Data & Messaging",
    accent: "#34D399",
    nodes: [
      { id: "postgres", x: 50, y: 50, size: "hub" },
      { id: "mysql", x: 24, y: 28 },
      { id: "mongodb", x: 78, y: 30 },
      { id: "redis", x: 26, y: 72 },
      { id: "kafka", x: 73, y: 72 },
      { id: "rabbitmq", x: 50, y: 18, size: "small" },
    ],
    edges: [
      ["postgres", "mysql"],
      ["postgres", "mongodb"],
      ["postgres", "redis"],
      ["postgres", "kafka"],
      ["kafka", "rabbitmq"],
      ["redis", "kafka"],
    ],
  },
  {
    title: "Delivery & Observability",
    accent: "#38BDF8",
    nodes: [
      { id: "docker", x: 50, y: 50, size: "hub" },
      { id: "git", x: 22, y: 27 },
      { id: "github", x: 50, y: 18, size: "small" },
      { id: "githubactions", x: 78, y: 30 },
      { id: "nginx", x: 23, y: 72 },
      { id: "prometheus", x: 73, y: 72 },
      { id: "grafana", x: 50, y: 84, size: "small" },
    ],
    edges: [
      ["git", "github"],
      ["github", "githubactions"],
      ["githubactions", "docker"],
      ["docker", "nginx"],
      ["docker", "prometheus"],
      ["prometheus", "grafana"],
      ["nginx", "grafana"],
    ],
  },
] as const;

const PROCESS_ITEMS = [
  {
    name: "Scrum",
    description: "спринты, ретро, планирование",
    icon: RefreshCw,
    color: "#A78BFA",
  },
  {
    name: "Agile",
    description: "итеративная поставка ценности",
    icon: Workflow,
    color: "#38BDF8",
  },
  {
    name: "Kanban",
    description: "прозрачный поток задач",
    icon: KanbanSquare,
    color: "#34D399",
  },
] as const;

function hexToRgba(hex: string, alpha = 1) {
  const h = hex.replace("#", "");
  const bigint = parseInt(
    h.length === 3
      ? h
          .split("")
          .map((c) => c + c)
          .join("")
      : h,
    16,
  );
  const r = (bigint >> 16) & 255;
  const g = (bigint >> 8) & 255;
  const b = bigint & 255;
  return `rgba(${r}, ${g}, ${b}, ${alpha})`;
}

function nodeSizeClass(size: GraphNode["size"]) {
  if (size === "hub") return "h-[4.75rem] w-[4.75rem] sm:h-24 sm:w-24";
  if (size === "small") return "h-14 w-14 sm:h-16 sm:w-16";
  return "h-16 w-16 sm:h-[4.5rem] sm:w-[4.5rem]";
}

function GraphCard({ group }: { group: GraphGroup }) {
  return (
    <div className="group/card relative rounded-[2rem] transition-transform duration-300 hover:-translate-y-1">
      <div
        className="relative overflow-hidden rounded-[2rem] border bg-card/95 p-4 shadow-sm sm:p-5"
        style={{
          borderColor: hexToRgba(group.accent, 0.45),
          boxShadow: `0 0 0 1px ${hexToRgba(group.accent, 0.28)} inset, 0 0 40px ${hexToRgba(group.accent, 0.16)}`,
        }}
      >
        <div
          className="pointer-events-none absolute inset-0 opacity-70"
          style={{
            background: `radial-gradient(circle at 50% 42%, ${hexToRgba(group.accent, 0.2)}, transparent 42%), radial-gradient(circle at 20% 10%, rgba(255,255,255,0.08), transparent 24%)`,
          }}
        />

        <div className="relative z-10">
          <h3 className="text-xl font-bold text-white">{group.title}</h3>
        </div>

        <div className="relative z-10 mt-5 h-[22rem] sm:h-[24rem]">
          <svg
            className="absolute inset-0 h-full w-full"
            viewBox="0 0 100 100"
            preserveAspectRatio="none"
            aria-hidden
          >
            <defs>
              <filter
                id={`glow-${group.title.replace(/\W/g, "-")}`}
                x="-60%"
                y="-60%"
                width="220%"
                height="220%"
              >
                <feGaussianBlur stdDeviation="1.2" result="coloredBlur" />
                <feMerge>
                  <feMergeNode in="coloredBlur" />
                  <feMergeNode in="SourceGraphic" />
                </feMerge>
              </filter>
            </defs>
            {group.edges.map(([from, to]) => {
              const source = group.nodes.find((node) => node.id === from);
              const target = group.nodes.find((node) => node.id === to);
              const sourceItem = STACK_BY_ID[from];

              if (!source || !target || !sourceItem) return null;

              return (
                <line
                  key={`${from}-${to}`}
                  x1={source.x}
                  y1={source.y}
                  x2={target.x}
                  y2={target.y}
                  stroke={hexToRgba(sourceItem.color, 0.42)}
                  strokeWidth="0.45"
                  strokeDasharray="1.2 1.6"
                  filter={`url(#glow-${group.title.replace(/\W/g, "-")})`}
                />
              );
            })}
          </svg>

          {group.nodes.map((node) => {
            const item = STACK_BY_ID[node.id];
            if (!item) return null;

            return (
              <div
                key={node.id}
                className="absolute flex -translate-x-1/2 -translate-y-1/2 flex-col items-center"
                style={{ left: `${node.x}%`, top: `${node.y}%` }}
              >
                <div
                  className={`grid place-items-center rounded-[1.35rem] border bg-[#11101b]/95 p-2 shadow-lg transition-transform duration-300 group-hover/card:scale-[1.03] ${nodeSizeClass(node.size)}`}
                  style={{
                    borderColor: hexToRgba(item.color, 0.5),
                    boxShadow: `0 0 0 1px ${hexToRgba(item.color, 0.24)} inset, 0 0 24px ${hexToRgba(item.color, 0.24)}`,
                  }}
                >
                  <img
                    src={withBasePath(item.icon)}
                    alt={`${item.name} logo`}
                    className="h-4/5 w-4/5 object-contain drop-shadow-[0_0_12px_rgba(255,255,255,0.18)]"
                    draggable={false}
                  />
                </div>
                <span className="mt-2 max-w-24 rounded-full border border-white/10 bg-black/40 px-2 py-1 text-center text-[0.68rem] font-semibold leading-none text-white/75 backdrop-blur sm:text-xs">
                  {item.name}
                </span>
              </div>
            );
          })}
        </div>
      </div>
      <span
        aria-hidden
        className="pointer-events-none absolute -inset-2 -z-10 rounded-[2.25rem] blur-2xl opacity-30 transition-opacity duration-300 group-hover/card:opacity-50"
        style={{
          background: `radial-gradient(60% 60% at 50% 85%, ${hexToRgba(group.accent, 0.22)}, transparent 65%)`,
        }}
      />
    </div>
  );
}

export default function StackSection() {
  return (
    <section id="stack" className="container py-10 sm:py-14 md:py-16">
      <div className="mb-5 text-center reveal sm:mb-8">
        <p className="text-xs uppercase tracking-[0.34em] text-white/35">
          connected skills
        </p>
        <h2 className="mt-2 text-[2rem] font-extrabold tracking-tight [font-family:var(--ff-exotica)] sm:text-[2.5rem] md:text-[3.75rem]">
          Стэк
        </h2>
      </div>

      <div className="mx-auto grid max-w-7xl grid-cols-1 gap-5 reveal-grid lg:grid-cols-3">
        {GRAPH_GROUPS.map((group) => (
          <GraphCard key={group.title} group={group} />
        ))}
      </div>

      <div className="mx-auto mt-8 grid max-w-5xl grid-cols-1 gap-4 sm:mt-10 sm:gap-6 md:grid-cols-2 md:gap-8">
        <div className="group relative rounded-3xl transition-transform duration-300 hover:-translate-y-1">
          <div
            className="h-full overflow-hidden rounded-3xl border bg-card/95 p-5 shadow-sm sm:p-7"
            style={{
              borderColor: hexToRgba("#A78BFA", 0.55),
              boxShadow: `0 0 0 1px ${hexToRgba("#A78BFA", 0.45)} inset, 0 0 38px ${hexToRgba("#A78BFA", 0.22)}`,
            }}
          >
            <div className="flex items-start justify-between gap-4">
              <div>
                <p className="text-xs uppercase tracking-[0.28em] text-white/40">
                  Communication
                </p>
                <h3 className="mt-2 text-xl font-bold text-white sm:text-2xl">
                  Владение языками
                </h3>
              </div>
              <div className="grid h-12 w-12 shrink-0 place-items-center rounded-2xl border border-violet-300/25 bg-violet-300/10 text-violet-200">
                <Languages className="h-6 w-6" aria-hidden />
              </div>
            </div>

            <div className="mt-6 space-y-4">
              {profile.languages.map((language) => (
                <div
                  key={language.name}
                  className="rounded-2xl border border-white/10 bg-white/[0.04] p-4"
                >
                  <div className="flex items-center justify-between gap-3 text-sm">
                    <div>
                      <p className="font-semibold text-white">
                        {language.name}
                      </p>
                      <p className="mt-1 text-xs text-white/45">
                        уровень владения
                      </p>
                    </div>
                    <span className="rounded-full border border-white/10 bg-white/10 px-3 py-1 text-xs font-semibold text-white/75">
                      {language.level}
                    </span>
                  </div>
                  <div className="mt-4 h-2.5 overflow-hidden rounded-full bg-white/10">
                    <div
                      className="h-full rounded-full bg-gradient-to-r from-violet-300 via-fuchsia-300 to-sky-300"
                      style={{ width: `${language.value}%` }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>
          <span
            aria-hidden
            className="pointer-events-none absolute -inset-2 -z-10 rounded-[2rem] bg-violet-400/20 blur-2xl opacity-30 transition-opacity duration-300 group-hover:opacity-50"
          />
        </div>

        <div className="group relative rounded-3xl transition-transform duration-300 hover:-translate-y-1">
          <div
            className="h-full overflow-hidden rounded-3xl border bg-card/95 p-5 shadow-sm sm:p-7"
            style={{
              borderColor: hexToRgba("#38BDF8", 0.5),
              boxShadow: `0 0 0 1px ${hexToRgba("#38BDF8", 0.35)} inset, 0 0 38px ${hexToRgba("#38BDF8", 0.18)}`,
            }}
          >
            <div className="flex items-start justify-between gap-4">
              <div>
                <p className="text-xs uppercase tracking-[0.28em] text-white/40">
                  Delivery
                </p>
                <h3 className="mt-2 text-xl font-bold text-white sm:text-2xl">
                  Владение процессами
                </h3>
              </div>
              <div className="grid h-12 w-12 shrink-0 place-items-center rounded-2xl border border-sky-300/25 bg-sky-300/10 text-sky-200">
                <Gauge className="h-6 w-6" aria-hidden />
              </div>
            </div>

            <div className="mt-6 space-y-3">
              {PROCESS_ITEMS.map((process) => {
                const Icon = process.icon;
                return (
                  <div
                    key={process.name}
                    className="flex items-center gap-3 rounded-2xl border border-white/10 bg-white/[0.04] p-4"
                  >
                    <div
                      className="grid h-11 w-11 shrink-0 place-items-center rounded-2xl border"
                      style={{
                        borderColor: hexToRgba(process.color, 0.35),
                        background: hexToRgba(process.color, 0.12),
                      }}
                    >
                      <Icon
                        className="h-5 w-5"
                        style={{ color: process.color }}
                        aria-hidden
                      />
                    </div>
                    <div className="min-w-0 flex-1">
                      <div className="flex items-center gap-2">
                        <p className="font-semibold text-white">
                          {process.name}
                        </p>
                        <CheckCircle2
                          className="h-4 w-4 text-emerald-300"
                          aria-hidden
                        />
                      </div>
                      <p className="mt-1 text-xs text-white/50 sm:text-sm">
                        {process.description}
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
          <span
            aria-hidden
            className="pointer-events-none absolute -inset-2 -z-10 rounded-[2rem] bg-sky-400/20 blur-2xl opacity-25 transition-opacity duration-300 group-hover:opacity-45"
          />
        </div>
      </div>
    </section>
  );
}
