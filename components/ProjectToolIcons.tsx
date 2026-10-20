import { withBasePath } from "@/lib/paths";
import { usePortfolioLanguage } from "./PortfolioLanguage";

const TOOL_ICONS: Record<string, string> = {
  jwt: "/icons/stack/jwt.svg",
  openapi: "/icons/stack/openapi.svg",
  java: "/icons/stack/java.svg",
  "java 21": "/icons/stack/java.svg",
  spring: "/icons/stack/spring.svg",
  "spring boot": "/icons/stack/spring.svg",
  python: "/icons/stack/python.svg",
  go: "/icons/stack/go.svg",
  grpc: "/icons/stack/grpc.svg",
  kotlin: "/icons/stack/kotlin.svg",
  typescript: "/icons/stack/typescript.svg",
  "next.js": "/icons/stack/nextjs.svg",
  "node.js": "/icons/stack/nodejs.svg",
  postgresql: "/icons/stack/postgres.svg",
  postgres: "/icons/stack/postgres.svg",
  rabbitmq: "/icons/stack/rabbitmq.svg",
  kafka: "/icons/stack/kafka.svg",
  docker: "/icons/stack/docker.svg",
  maven: "/icons/stack/maven.svg",
  flyway: "/icons/stack/flyway.svg",
  junit: "/icons/stack/junit.svg",
  "junit 5": "/icons/stack/junit.svg",
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

export default function ProjectToolIcons({ stack }: { stack: string[] }) {
  const { language } = usePortfolioLanguage();
  return (
    <ul
      className="project-stack"
      aria-label={
        language === "en" ? "Technology stack" : "Технологический стек"
      }
    >
      {stack.map((tool) => {
        const icon = TOOL_ICONS[tool.trim().toLowerCase()];
        return (
          <li key={tool} className="project-tool" title={tool}>
            {icon && (
              <img
                src={withBasePath(icon)}
                alt=""
                width={16}
                height={16}
                loading="lazy"
                draggable={false}
              />
            )}
            <span>{tool}</span>
          </li>
        );
      })}
    </ul>
  );
}
