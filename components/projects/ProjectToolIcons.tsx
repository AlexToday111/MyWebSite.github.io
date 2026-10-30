import { withBasePath } from "@/lib/paths";
import { usePortfolioLanguage } from "../providers/PortfolioLanguage";

const TOOL_ICONS: Record<string, string> = {
  jwt: "/icons/project-stack/jwt.svg",
  openapi: "/icons/project-stack/openapi.svg",
  java: "/icons/project-stack/java.svg",
  "java 21": "/icons/project-stack/java.svg",
  spring: "/icons/project-stack/spring.svg",
  "spring boot": "/icons/project-stack/spring.svg",
  python: "/icons/project-stack/python.svg",
  go: "/icons/project-stack/go.svg",
  grpc: "/icons/project-stack/grpc.svg",
  kotlin: "/icons/project-stack/kotlin.svg",
  typescript: "/icons/project-stack/typescript.svg",
  "next.js": "/icons/project-stack/nextjs.svg",
  "node.js": "/icons/project-stack/nodejs.svg",
  postgresql: "/icons/project-stack/postgres.svg",
  postgres: "/icons/project-stack/postgres.svg",
  rabbitmq: "/icons/project-stack/rabbitmq.svg",
  kafka: "/icons/project-stack/kafka.svg",
  docker: "/icons/project-stack/docker.svg",
  maven: "/icons/project-stack/maven.svg",
  gradle: "/icons/project-stack/gradle.svg",
  flyway: "/icons/project-stack/flyway.svg",
  junit: "/icons/project-stack/junit.svg",
  "junit 5": "/icons/project-stack/junit.svg",
  nginx: "/icons/project-stack/nginx.svg",
  fastapi: "/icons/project-stack/fastapi.svg",
  "github actions": "/icons/project-stack/githubactions.svg",
  redis: "/icons/project-stack/redis.svg",
  mongodb: "/icons/project-stack/mongodb.svg",
  mysql: "/icons/project-stack/mysql.svg",
  clickhouse: "/icons/project-stack/clickhouse.svg",
  prometheus: "/icons/project-stack/prometheus.svg",
  grafana: "/icons/project-stack/grafana.svg",
  react: "/icons/project-stack/react.svg",
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
        const darkIcon =
          icon && /\/(kafka|jwt)\.svg$/.test(icon)
            ? icon.replace(".svg", "-dark.svg")
            : undefined;
        return (
          <li key={tool} className="project-tool" title={tool}>
            {icon && (
              <img
                src={withBasePath(icon)}
                alt=""
                width={18}
                height={18}
                className={darkIcon ? "project-tool-icon-light" : undefined}
                loading="lazy"
                draggable={false}
              />
            )}
            {darkIcon && (
              <img
                src={withBasePath(darkIcon)}
                alt=""
                width={18}
                height={18}
                className="project-tool-icon-dark"
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
