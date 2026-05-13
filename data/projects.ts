export type ProjectCategory =
  | "Pet Projects"
  | "University Projects"
  | "Hackathons"
  | "Commercial Experience";

export type Project = {
  title: string;
  description: string;
  stack: string[];
  image: string;
  category: ProjectCategory;
  logo?: string;
  logoClassName?: string;
  links?: { demo?: string; repo?: string };
  featured?: boolean;
};

export const projectCategories: ProjectCategory[] = [
  "Pet Projects",
  "University Projects",
  "Hackathons",
  "Commercial Experience",
];

export const projects: Project[] = [
  {
    title: "ATLAS",
    description:
      "Персональная AI-система для управления режимом, спортом, восстановлением, привычками, питанием и прогрессом.",
    stack: [
      "Java 21",
      "Spring Boot",
      "PostgreSQL",
      "Flyway",
      "Maven",
      "Docker",
      "Telegram Bot API",
      "JUnit 5",
    ],
    image: "/projects/flowstate.jpg",
    logo: "/Logos/projects/atlas.svg",
    category: "Commercial Experience",
    links: {
      repo: "https://github.com/ATLAS-lifeops/ATLAS",
    },
    featured: true,
  },
  {
    title: "Notification Subscription Platform",
    description:
      "Событийная платформа уведомлений с подписками и доставкой через несколько каналов.",
    stack: [
      "Java",
      "Spring Boot",
      "PostgreSQL",
      "RabbitMQ",
      "JWT",
      "Prometheus",
      "Grafana",
      "Zipkin",
    ],
    image: "/projects/flowstate.jpg",
    logo: "/Notification.png",
    category: "Pet Projects",
    links: {
      repo: "https://github.com/AlexToday111/Notification-Subscription-Platform",
    },
    featured: true,
  },
  {
    title: "Smart Activity Tracker",
    description:
      "Сервис для сбора пользовательских событий и расчёта базовой продуктовой аналитики.",
    stack: [
      "Java",
      "Spring Boot",
      "PostgreSQL",
      "Flyway",
      "OpenAPI",
      "Prometheus",
      "Grafana",
      "Testcontainers",
    ],
    image: "/projects/flowstate.jpg",
    logo: "/SmartActivity.png",
    category: "Pet Projects",
    links: { repo: "https://github.com/AlexToday111/Smart-Activity-Tracker" },
  },
  {
    title: "Porta Trading System",
    description:
      "Распределённая MVP-система для трейдинга с дашбордом, Kafka-событиями и состоянием портфеля.",
    stack: [
      "Java",
      "Spring Boot",
      "Kafka",
      "PostgreSQL",
      "Go",
      "React",
      "TypeScript",
      "Docker",
    ],
    image: "/projects/flowstate.jpg",
    logo: "/porta-logo.svg",
    category: "University Projects",
    links: {
      repo: "https://github.com/AlexToday111/DNP-proj.-Trading-system-",
    },
    featured: true,
  },
  {
    title: "Visual Circuit Designer",
    description:
      "Веб-инструмент для проектирования, симуляции и управления цифровыми логическими схемами.",
    stack: [
      "Next.js",
      "React",
      "Node.js",
      "Express",
      "Python",
      "PostgreSQL",
      "Docker",
      "Grafana",
      "Loki",
    ],
    image: "/projects/flowstate.jpg",
    logo: "/VisualCircuit.svg",
    logoClassName: "h-1/3 w-1/3",
    category: "University Projects",
    links: { repo: "https://github.com/AlexToday111/Visual-Circuit-Designer" },
  },
  {
    title: "PingTower",
    description:
      "Система мониторинга сайтов и сервисов с дашбордом, алертами и статистикой надёжности.",
    stack: [
      "Java 21",
      "Spring Boot",
      "React",
      "PostgreSQL",
      "ClickHouse",
      "Docker",
      "Nginx",
    ],
    image: "/projects/flowstate.jpg",
    logo: "/PingTower.png",
    category: "Hackathons",
    links: { repo: "https://github.com/AlexToday111/T1-Hackathon" },
    featured: true,
  },
  {
    title: "DatsPulse",
    description:
      "Python-бот с модульной архитектурой для автоматизации и реализации пользовательских стратегий.",
    stack: ["Python"],
    image: "/projects/flowstate.jpg",
    logo: "/DatsPulse.png",
    logoClassName: "h-full w-full scale-110",
    category: "Hackathons",
    links: { repo: "https://github.com/AlexToday111/DatsPulse" },
  },
  {
    title: "Trade360Lab",
    description:
      "Платформа для исследования, подготовки данных, запуска и сравнения торговых сценариев.",
    stack: [
      "Java",
      "Spring Boot",
      "Python",
      "FastAPI",
      "PostgreSQL",
      "Next.js",
      "Docker",
      "GitHub Actions",
    ],
    image: "/projects/flowstate.jpg",
    logo: "/T360.png",
    category: "Commercial Experience",
    links: { repo: "https://github.com/Trade360Lab/Trade360Lab" },
    featured: true,
  },
];
