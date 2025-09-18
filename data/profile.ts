export const profile = {
  name: "Ernest Kudakaev",
  role: "Backend Java Developer",
  summary: "Молодой Java-разработчик: Spring Boot, многопоточность, CI/CD.",
  location: "KZ / RU (remote)",
  email: "ernest@example.com",
  links: {
    github: "https://github.com/placeholder",
    gitlab: "https://gitlab.com/placeholder",
    leetcode: "https://leetcode.com/placeholder"
  },
  skills: [
    { name: "Java 17+", level: "В проде" },
    { name: "Spring Boot", level: "В проде" },
    { name: "PostgreSQL", level: "Уверенно" },
    { name: "Docker", level: "В проде" },
    { name: "Kubernetes", level: "Учусь" },
    { name: "Redis", level: "Уверенно" },
    { name: "RabbitMQ", level: "Уверенно" },
    { name: "Git / CI/CD", level: "В проде" }
  ],
  languages: [
    { name: "Russian", level: "Native", value: 100 },
    { name: "English", level: "B2", value: 70 }
  ],
  education: [
    { place: "Университет Иннополис", title: "Информатика и вычислительная техника", period: "2024—2028" },
    { place: "Google Cloud", title: "Associate Cloud Engineer (курс)", period: "2024" }
  ],
  projects: [
    {
      title: "Flowstate",
      description: "Микросервисное приложение: Spring + PostgreSQL + Redis. Горизонтальная масштабируемость, очереди, метрики Prometheus.",
      results: ["−30% latency", "+40% throughput"],
      stack: ["Java", "Spring Boot", "PostgreSQL", "Redis", "Docker"],
      repo: "https://github.com/placeholder/flowstate",
      demo: "#",
      image: "/projects/flowstate.jpg"
    },
    {
      title: "RMS (Rating My Spot)",
      description: "Поиск рабочих мест по шуму/Wi‑Fi/розеткам. JWT, геопоиск, Docker, GitLab CI.",
      results: ["MVP за 3 недели", "20+ тестовых пользователей"],
      stack: ["Java", "Spring Boot", "PostgreSQL", "Docker"],
      repo: "#",
      demo: "#",
      image: "/projects/rms.jpg"
    }
  ],
  skillsSections: [
    {
      title: "Языки программирования",
      items: [
        "Java (StdLib)",
        "Python (StdLib, Pandas, NumPy, Seaborn, Matplotlib)",
        "Базовый C++",
      ],
    },
    {
      title: "Инструменты",
      items: [
        "Spring Framework", "Spring Boot", "SQL", "PostgreSQL", "Git", "LaTeX", "MS Excel", "MS PowerPoint",
      ],
    },
    {
      title: "Технические знания",
      items: [
        "Алгоритмы и структуры данных",
        "Высшая математика",
        "ООП и SOLID (архитектура и чистый код)",
        "Многопоточность и конкурентность (потоки, synchronized, ExecutorService, CompletableFuture)",
        "JVM и управление памятью (GC, стек/куча, профилирование)",
        "Spring/Spring Boot (DI, REST API, аннотации, Spring Data JPA)",
        "Паттерны проектирования (GoF)",
        "Тестирование (JUnit 5, Mockito, TDD)",
        "CI/CD (GitLab CI, Docker)",
        "Основы классического ML",
      ],
    },
    {
      title: "Иностранные языки",
      items: ["Английский (B1)"],
    },
  ]
} as const;

export type Profile = typeof profile;


