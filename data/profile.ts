export const profile = {
  name: "ba6kir",
  role: "Backend Java Developer",
  summary:
    "Разрабатываю бэкенд на Java: Spring Boot, PostgreSQL, Docker, CI/CD. Люблю чистую архитектуру и надёжные сервисы.",
  location: "RU / KZ (remote)",
  email: "ernest@example.com",
  links: {
    github: "https://github.com/AlexToday666",
    gitlab: "https://gitlab.com/placeholder",
    leetcode: "https://leetcode.com/u/AlexToday666/",
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
    { title: "Фреймворки и базы", items: ["Spring Boot", "SQL", "PostgreSQL", "Redis"] },
    {
      title: "Инфраструктура и инструменты",
      items: ["Docker", "Git", "Kubernetes", "RabbitMQ", "GitLab CI/CD"],
    },
    {
      title: "Принципы и подходы",
      items: ["SOLID, Clean Architecture", "Параллелизм и потоки", "Тестирование (JUnit, Mockito, TDD)"],
    },
  ],
} as const;

export type Profile = typeof profile;
