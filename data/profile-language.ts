import { homeProfile } from "./profile";

export type ProfileLanguage = "en" | "ru";

const russianProfile = {
  ...homeProfile,
  role: "Разработчик Java / Go",
  bio: "Пишу бэкенд на Java и Go: API, запросы к базе данных и взаимодействие между сервисами.",
  approach:
    "Нравится разбираться, как устроен сервис целиком — от бизнес-логики до деплоя и логов.",
  experiences: [
    {
      ...homeProfile.experiences[0],
      role: "Java Backend Developer",
      company: "Т-Банк",
      highlights: [
        "Мигрировал 7 сервисов на обновлённый стек Java и Spring Boot, адаптировал Helm-чарты и Kubernetes-конфигурации.",
        "Устранил дефекты бизнес-логики и валидации, блокировавшие переход с устаревшей платформы.",
        "Доработал BPMN-процессы и расчётную логику под новые бизнес-требования и требования регуляторов.",
      ],
    },
    {
      ...homeProfile.experiences[1],
      signal: "B2B-стартап",
      result:
        "Сократил среднее время отклика сервисов в 3–5 раз (с 800–1000 мс до 200–300 мс), оптимизировав SQL-запросы и бизнес-логику.",
      highlights: [
        "Разрабатывал и поддерживал backend-сервисы и REST API в системе на Java и Go.",
        "Участвовал в разработке микросервиса для преобразования и визуализации данных.",
        "Покрыл критичную бизнес-логику unit-тестами и участвовал в code review.",
      ],
    },
    {
      ...homeProfile.experiences[2],
      role: "Бэкенд-разработчик / автор проекта",
      signal: "Исследование алгоритмических стратегий",
      highlights: [
        "Создал платформу из нескольких сервисов для исследования алгоритмических стратегий и их тестирования на исторических данных.",
        "Спроектировал API на Spring Boot для наборов данных, версионирования стратегий и воспроизводимых запусков.",
        "Интегрировал сервисы на Java и Python с PostgreSQL для оркестрации бэктестов и сохранения результатов.",
        "Настроил автоматический CI и интеграционные проверки в Docker.",
      ],
    },
  ],
  achievements: [
    {
      title: "1 и 2 место",
      description: "Научно-практическая конференция по информатике",
    },
    {
      title: "Призёр",
      description: "Хакатоны от Т1",
    },
    { title: "Победитель", description: "Хакатон от МТС" },
  ],
  interests: [
    "Распределённые системы",
    "Go",
    "System Design",
    "Kubernetes",
    "Observability",
  ],
  toolbox: homeProfile.toolbox.map((group, index) => ({
    ...group,
    category: [
      "Языки",
      "Бэкенд",
      "Данные и обмен сообщениями",
      "Инфраструктура",
    ][index],
  })),
};

export const profileContent = { en: homeProfile, ru: russianProfile };

export const profileLabels = {
  en: {
    heading: "WHO IS",
    experience: "Experience",
    education: "Education",
    university: "Innopolis University",
    degree: "Information Systems Engineering",
    subjects: [
      "Algorithms · Databases",
      "Computer Networks · Software Architecture",
      "Programming Paradigms · Compilers",
      "System Design Patterns",
    ],
    achievements: "Competitions",
    focus: "Currently diving deeper into",
    toolbox: "What I work with",
    companies: "Experience by company",
    result: "Result",
  },
  ru: {
    heading: "КТО ТАКОЙ",
    experience: "Опыт",
    education: "Образование",
    university: "Университет Иннополис",
    degree: "Инженерия информационных систем",
    subjects: [
      "Алгоритмы · Базы данных",
      "Компьютерные сети · Архитектура ПО",
      "Парадигмы программирования · Компиляторы",
      "Паттерны проектирования систем",
    ],
    achievements: "Конкурсы и олимпиады",
    focus: "Сейчас углубляюсь в",
    toolbox: "С чем работаю",
    companies: "Опыт работы по компаниям",
    result: "Результат",
  },
};
