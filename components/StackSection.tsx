import { withBasePath } from "@/lib/paths";
import { profile } from "@/data/profile";
import {
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
  labelPosition?: "top" | "right" | "bottom" | "left";
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
    id: "kotlin",
    name: "Kotlin",
    icon: "/icons/stack/kotlin.svg",
    color: "#A97BFF",
  },
  {
    id: "spring",
    name: "Spring",
    icon: "/icons/stack/spring.svg",
    color: "#6DB33F",
  },
  {
    id: "springsecurity",
    name: "Spring Security",
    icon: "/icons/stack/springsecurity.svg",
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
    id: "kubernetes",
    name: "Kubernetes",
    icon: "/icons/stack/kubernetes.svg",
    color: "#326CE5",
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
    id: "gradle",
    name: "Gradle",
    icon: "/icons/stack/gradle.svg",
    color: "#02303A",
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
    id: "swagger",
    name: "Swagger",
    icon: "/icons/stack/swagger.svg",
    color: "#85EA2D",
  },
  {
    id: "websocket",
    name: "WebSocket",
    icon: "/icons/stack/websocket.svg",
    color: "#F59E0B",
  },
  {
    id: "fastapi",
    name: "FastAPI",
    icon: "/icons/stack/fastapi.svg",
    color: "#009688",
  },
  { id: "grpc", name: "gRPC", icon: "/icons/stack/grpc.svg", color: "#4A7DFF" },
  {
    id: "clickhouse",
    name: "ClickHouse",
    icon: "/icons/stack/clickhouse.svg",
    color: "#FFCC01",
  },
  {
    id: "linux",
    name: "Linux",
    icon: "/icons/stack/linux.svg",
    color: "#FCC624",
  },
  {
    id: "postman",
    name: "Postman",
    icon: "/icons/stack/postman.svg",
    color: "#FF6C37",
  },
  {
    id: "jira",
    name: "Jira",
    icon: "/icons/stack/jira.svg",
    color: "#0052CC",
  },
] as const;

const STACK_BY_ID = Object.fromEntries(STACK.map((item) => [item.id, item]));

const GRAPH_GROUPS: GraphGroup[] = [
  {
    title: "Backend Core",
    accent: "#A78BFA",
    nodes: [
      { id: "java", x: 50, y: 50, size: "hub", labelPosition: "bottom" },
      { id: "websocket", x: 50, y: 13, size: "small", labelPosition: "bottom" },
      { id: "kotlin", x: 14, y: 18, size: "small", labelPosition: "right" },
      { id: "fastapi", x: 86, y: 18, size: "small", labelPosition: "bottom" },
      { id: "spring", x: 27, y: 36, labelPosition: "bottom" },
      { id: "springsecurity", x: 73, y: 36, size: "small", labelPosition: "bottom" },
      { id: "hibernate", x: 16, y: 60, labelPosition: "bottom" },
      { id: "maven", x: 84, y: 60, labelPosition: "bottom" },
      { id: "swagger", x: 16, y: 86, size: "small", labelPosition: "bottom" },
      { id: "grpc", x: 38, y: 86, size: "small", labelPosition: "bottom" },
      { id: "junit", x: 62, y: 86, labelPosition: "bottom" },
      { id: "gradle", x: 86, y: 86, size: "small", labelPosition: "bottom" },
    ],
    edges: [
      ["java", "spring"],
      ["java", "kotlin"],
      ["spring", "hibernate"],
      ["spring", "springsecurity"],
      ["java", "maven"],
      ["java", "gradle"],
      ["java", "junit"],
      ["spring", "grpc"],
      ["spring", "swagger"],
      ["java", "websocket"],
      ["java", "fastapi"],
      ["hibernate", "junit"],
    ],
  },
  {
    title: "Data & Messaging",
    accent: "#34D399",
    nodes: [
      { id: "postgres", x: 50, y: 50, size: "hub", labelPosition: "bottom" },
      { id: "rabbitmq", x: 50, y: 17, size: "small", labelPosition: "bottom" },
      { id: "mysql", x: 21, y: 35, labelPosition: "bottom" },
      { id: "mongodb", x: 79, y: 35, labelPosition: "bottom" },
      { id: "redis", x: 22, y: 74, labelPosition: "bottom" },
      { id: "kafka", x: 78, y: 74, labelPosition: "bottom" },
      { id: "clickhouse", x: 50, y: 88, size: "small", labelPosition: "bottom" },
    ],
    edges: [
      ["postgres", "mysql"],
      ["postgres", "mongodb"],
      ["postgres", "redis"],
      ["postgres", "kafka"],
      ["kafka", "rabbitmq"],
      ["postgres", "clickhouse"],
      ["redis", "kafka"],
    ],
  },
  {
    title: "Delivery & Observability",
    accent: "#38BDF8",
    nodes: [
      { id: "docker", x: 50, y: 50, size: "hub", labelPosition: "bottom" },
      { id: "kubernetes", x: 50, y: 14, labelPosition: "bottom" },
      { id: "git", x: 15, y: 22, labelPosition: "right" },
      { id: "githubactions", x: 85, y: 22, labelPosition: "bottom" },
      { id: "github", x: 23, y: 45, size: "small", labelPosition: "bottom" },
      { id: "jira", x: 77, y: 45, size: "small", labelPosition: "bottom" },
      { id: "linux", x: 16, y: 72, size: "small", labelPosition: "bottom" },
      { id: "postman", x: 84, y: 72, size: "small", labelPosition: "top" },
      { id: "nginx", x: 30, y: 89, labelPosition: "bottom" },
      { id: "grafana", x: 53, y: 89, size: "small", labelPosition: "bottom" },
      { id: "prometheus", x: 76, y: 89, labelPosition: "bottom" },
    ],
    edges: [
      ["git", "github"],
      ["github", "githubactions"],
      ["githubactions", "docker"],
      ["docker", "kubernetes"],
      ["docker", "linux"],
      ["docker", "nginx"],
      ["docker", "prometheus"],
      ["githubactions", "jira"],
      ["docker", "postman"],
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
  if (size === "hub") return "h-20 w-20 sm:h-24 sm:w-24";
  if (size === "small") return "h-14 w-14 sm:h-16 sm:w-16";
  return "h-16 w-16 sm:h-[4.5rem] sm:w-[4.5rem]";
}

function labelPositionClass(position: GraphNode["labelPosition"]) {
  if (position === "top") {
    return "bottom-full left-1/2 mb-1.5 -translate-x-1/2";
  }
  if (position === "left") {
    return "right-full top-1/2 mr-2 -translate-y-1/2";
  }
  if (position === "right") {
    return "left-full top-1/2 ml-2 -translate-y-1/2";
  }
  return "left-1/2 top-full mt-1.5 -translate-x-1/2";
}

function graphTitleClass(title: GraphGroup["title"]) {
  if (title === "Data & Messaging") return "text-center";
  if (title === "Delivery & Observability") return "text-right";
  return "text-left";
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

        <div className={`relative z-10 ${graphTitleClass(group.title)}`}>
          <h3 className="text-xl font-bold text-white">{group.title}</h3>
        </div>

        <div className="relative z-10 mt-5 h-[27rem] sm:h-[29rem]">
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
                className="absolute -translate-x-1/2 -translate-y-1/2"
                style={{ left: `${node.x}%`, top: `${node.y}%` }}
              >
                <div
                  className={`relative grid place-items-center rounded-[1.35rem] border bg-[#11101b]/95 p-2 shadow-lg transition-transform duration-300 group-hover/card:scale-[1.03] ${nodeSizeClass(node.size)}`}
                >
                  <span
                    className={`pointer-events-none absolute z-20 w-max max-w-[5.6rem] rounded-full border border-white/10 bg-black/55 px-2 py-1 text-center text-[0.62rem] font-semibold leading-tight text-white/80 backdrop-blur sm:max-w-[6.5rem] sm:text-[0.68rem] ${labelPositionClass(node.labelPosition)}`}
                  >
                    {item.name}
                  </span>
                  <span
                    aria-hidden
                    className="absolute inset-0 rounded-[1.35rem] border"
                    style={{
                      borderColor: hexToRgba(item.color, 0.5),
                      boxShadow: `0 0 0 1px ${hexToRgba(item.color, 0.24)} inset, 0 0 24px ${hexToRgba(item.color, 0.24)}`,
                    }}
                  />
                  <img
                    src={withBasePath(item.icon)}
                    alt={`${item.name} logo`}
                    className="relative h-4/5 w-4/5 object-contain drop-shadow-[0_0_12px_rgba(255,255,255,0.18)]"
                    draggable={false}
                  />
                </div>
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
        <h2 className="text-[2rem] font-extrabold tracking-tight [font-family:var(--ff-exotica)] sm:text-[2.5rem] md:text-[3.75rem]">
          Стэк
        </h2>
      </div>

      <div className="mx-auto grid w-full max-w-[92rem] grid-cols-1 gap-5 reveal-grid lg:grid-cols-3">
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
