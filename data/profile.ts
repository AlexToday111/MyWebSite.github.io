export const profile = {
  name: "ba6kir",
  role: "Backend Java Developer",
  summary:
    "Разрабатываю бэкенд на Java: Spring Boot, PostgreSQL, Docker, CI/CD. Люблю чистую архитектуру и надёжные сервисы.",
  location: "RU / KZ (remote)",
  email: "ernest@example.com",
  links: {
    github: "https://github.com/AlexToday111",
    gitlab: "https://gitlab.com/placeholder",
    leetcode: "https://leetcode.com/u/AlexToday111/",
    linkedin: "https://www.linkedin.com/in/ernest-kudakaev-dev/",
    telegram: "https://t.me/ba6kir",
  },
  languages: [
    { name: "Русский", level: "Родной", value: 100 },
    { name: "English", level: "B2", value: 70 },
  ],
  projects: [
    {
      title: "Flowstate",
      description:
        "Высоконагруженный сервис: Spring + PostgreSQL + Redis. Мониторинг, кэширование, алерты, метрики Prometheus.",
      results: ["-30% latency", "+40% throughput"],
      stack: ["Java", "Spring Boot", "PostgreSQL", "Redis", "Docker"],
      repo: "https://github.com/placeholder/flowstate",
      demo: "#",
      image: "/projects/flowstate.jpg",
    },
  ],
  skillsSections: [
    {
      title: "Языки программирования",
      items: ["Java (17+)", "C++ (база)", "Python (Pandas, NumPy, Matplotlib)"],
    },
    {
      title: "Фреймворки и базы",
      items: ["Spring Boot", "SQL", "PostgreSQL", "Redis"],
    },
    {
      title: "Инфраструктура и инструменты",
      items: ["Docker", "Git", "Kubernetes", "RabbitMQ", "GitLab CI/CD"],
    },
    {
      title: "Принципы и подходы",
      items: [
        "SOLID, Clean Architecture",
        "Параллелизм и потоки",
        "Тестирование (JUnit, Mockito, TDD)",
      ],
    },
  ],
} as const;

export type Profile = typeof profile;

export const homeProfile = {
  role: "Java / Go developer",
  bio: "I write backend services in Java and Go: APIs, database queries and communication between services.",
  approach:
    "I like working through how a service fits together, from business logic to deployment and logs.",
  experiences: [
    {
      id: "tbank",
      role: "Java Backend Developer",
      company: "T-Bank",
      signal: "FinTech",
      result: null,
      stack: ["Java 25", "Spring Boot 3.5.16", "Helm", "Kubernetes", "BPMN"],
      highlights: [
        "Migrated 7 services to an updated Java and Spring Boot stack, adapting Helm charts and Kubernetes configurations.",
        "Resolved business logic and validation defects that blocked migration from a legacy platform.",
        "Updated BPMN workflows and calculation logic to meet new business and regulatory requirements.",
      ],
    },
    {
      id: "inno",
      role: "Backend",
      company: "Inno Chip Design",
      signal: "B2B startup",
      result:
        "Reduced average service response time by 3–5 times (from 800–1000 ms to 200–300 ms) by optimizing SQL queries and business logic.",
      stack: ["Java", "Go", "Spring Boot", "PostgreSQL", "JSON"],
      highlights: [
        "Developed and maintained backend services and REST APIs in a Java and Go system.",
        "Contributed to a microservice for data transformation and visualization.",
        "Covered critical business logic with unit tests and participated in code reviews.",
      ],
    },
    {
      id: "trade360lab",
      role: "Backend Engineer / Creator",
      company: "Trade360Lab",
      signal: "Algorithmic strategy research",
      result: null,
      stack: ["Java", "Spring Boot", "PostgreSQL", "FastAPI", "Docker"],
      highlights: [
        "Built a multi-service platform for algorithmic strategy research and backtesting.",
        "Designed the Spring Boot API for datasets, versioned strategies and reproducible executions.",
        "Integrated Java, Python and PostgreSQL services for backtest orchestration and result persistence.",
        "Set up automated CI and Docker-based integration checks.",
      ],
    },
  ],
  achievements: [
    {
      title: "1st and 2nd place",
      description: "Scientific & Practical Conference in Informatics",
    },
    {
      title: "Prize winner",
      description: "T1 hackathons",
    },
    { title: "Winner", description: "MTS hackathon" },
  ],
  interests: [
    "Distributed Systems",
    "Go",
    "System Design",
    "Kubernetes",
    "Observability",
  ],
  toolbox: [
    {
      category: "Languages",
      tools: ["Java", "Go", "Kotlin", "Haskell"],
    },
    {
      category: "Backend",
      tools: ["Spring Boot", "Spring Security", "Hibernate", "REST", "gRPC"],
    },
    {
      category: "Data & Messaging",
      tools: ["PostgreSQL", "Redis", "Kafka", "RabbitMQ", "ClickHouse"],
    },
    {
      category: "Infrastructure",
      tools: [
        "Docker",
        "Kubernetes",
        "GitHub Actions",
        "Prometheus",
        "Grafana",
      ],
    },
  ],
} as const;
