import { withBasePath } from "@/lib/paths";

const TOOL_ICONS: Record<string, string> = {
  java: "/icons/stack/java.svg",
  "java 21": "/icons/stack/java.svg",
  spring: "/icons/stack/spring.svg",
  "spring boot": "/icons/stack/spring.svg",
  python: "/icons/stack/python.svg",
  go: "/icons/stack/go.svg",
  typescript: "/icons/stack/typescript.svg",
  "next.js": "/icons/stack/nextjs.svg",
  "node.js": "/icons/stack/nodejs.svg",
  postgresql: "/icons/stack/postgres.svg",
  postgres: "/icons/stack/postgres.svg",
  rabbitmq: "/icons/stack/rabbitmq.svg",
  kafka: "/icons/stack/kafka.svg",
  docker: "/icons/stack/docker.svg",
  nginx: "/icons/stack/nginx.svg",
  fastapi: "/icons/stack/fastapi.svg",
  "github actions": "/icons/stack/githubactions.svg",
  redis: "/icons/stack/redis.svg",
  mongodb: "/icons/stack/mongodb.svg",
  mysql: "/icons/stack/mysql.svg",
  clickhouse: "/icons/stack/clickhouse.svg",
  prometheus: "/icons/stack/prometheus.svg",
  grafana: "/icons/stack/grafana.svg",
  react: "/icons/stack/react.svg",
};

const CORE_TOOL_PRIORITY = [
  "java",
  "java 21",
  "spring boot",
  "spring",
  "fastapi",
  "python",
  "go",
  "kafka",
  "rabbitmq",
  "postgresql",
  "postgres",
  "mongodb",
  "mysql",
  "redis",
  "clickhouse",
  "docker",
  "react",
  "next.js",
  "typescript",
  "node.js",
  "nginx",
  "prometheus",
  "grafana",
  "github actions",
] as const;

function normalizeTool(tool: string) {
  return tool.trim().toLowerCase();
}

function selectCoreTools(stack: string[], limit: number) {
  const indexed = stack.map((tool, index) => ({
    tool,
    index,
    normalized: normalizeTool(tool),
  }));

  return indexed
    .filter(({ normalized }) => TOOL_ICONS[normalized])
    .sort((a, b) => {
      const aPriority = CORE_TOOL_PRIORITY.indexOf(
        a.normalized as (typeof CORE_TOOL_PRIORITY)[number],
      );
      const bPriority = CORE_TOOL_PRIORITY.indexOf(
        b.normalized as (typeof CORE_TOOL_PRIORITY)[number],
      );
      const safeA = aPriority === -1 ? Number.MAX_SAFE_INTEGER : aPriority;
      const safeB = bPriority === -1 ? Number.MAX_SAFE_INTEGER : bPriority;

      if (safeA !== safeB) return safeA - safeB;
      return a.index - b.index;
    })
    .slice(0, limit)
    .map(({ tool }) => tool);
}

export default function ProjectToolIcons({
  stack,
  limit = 4,
}: {
  stack: string[];
  limit?: number;
}) {
  const visible = selectCoreTools(stack, limit);

  return (
    <div
      className="flex flex-wrap justify-center gap-3"
      aria-label="Project stack"
    >
      {visible.map((tool) => {
        const icon = TOOL_ICONS[normalizeTool(tool)];

        return (
          <span
            key={tool}
            title={tool}
            className="grid h-10 w-10 place-items-center transition duration-200 hover:scale-110 sm:h-12 sm:w-12"
          >
            <img
              src={withBasePath(icon)}
              alt=""
              className="h-8 w-8 object-contain drop-shadow-[0_0_12px_rgba(255,255,255,0.18)] sm:h-10 sm:w-10"
              draggable={false}
            />
            <span className="sr-only">{tool}</span>
          </span>
        );
      })}
    </div>
  );
}
