export type Project = {
  title: string;
  description: string;
  stack: string[];
  image: string;
  links?: { demo?: string; repo?: string };
  featured?: boolean;
};

export const projects: Project[] = [
  {
    title: "Visual Circuit Designer (VCD)",
    description: "Веб‑приложение для визуального проектирования электрических цепей: моделирование, сохранение и загрузка схем.",
    stack: ["Golang", "React", "PostgreSQL", "REST API"],
    image: "/projects/flowstate.jpg",
    links: { repo: "https://github.com/your-org/vcd" },
    featured: true,
  },
  {
    title: "Визуализация учебных метрик",
    description: "Интерактивные дашборды для анализа успеваемости студентов (Seaborn, Matplotlib). Повышена наглядность анализа на 50%+.",
    stack: ["Python", "Pandas", "Seaborn", "Matplotlib"],
    image: "/photos/last.png",
  },
  {
    title: "RMS (Rating My Spot)",
    description: "Сервис поиска мест для работы с фильтрацией по шуму, Wi‑Fi и розеткам. MVP с авторизацией и геопоиском.",
    stack: ["Java 17", "Spring Boot 3", "PostgreSQL", "JWT", "Docker", "GitLab CI"],
    image: "/photos/last.png",
  },
];

