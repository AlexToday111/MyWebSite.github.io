export type ProjectCategory = "pet" | "university" | "hackathon" | "ai-bots";

export type Project = {
  title: string;
  description: string;
  stack: string[];
  image: string;
  category: ProjectCategory;
  logo?: string;
  logoClassName?: string;
  logoTone?: "light";
  links?: { demo?: string; repo?: string };
  featured?: boolean;
};

export const projectCategories: ProjectCategory[] = [
  "pet",
  "university",
  "hackathon",
  "ai-bots",
];

export const projects: Project[] = [
  {
    title: "FlashSale Tickets",
    description:
      "Микросервисная система бронирования с истечением резервов и управлением заказами. События RabbitMQ связывают заказ, симулятор платежей и уведомления.",
    stack: [
      "Java",
      "Spring Boot",
      "PostgreSQL",
      "RabbitMQ",
      "Redis",
      "Docker",
      "Prometheus",
      "Grafana",
    ],
    image: "/Logos/projects/flashsale-tickets.png",
    logo: "/Logos/projects/flashsale-tickets.png",
    category: "pet",
    links: { repo: "https://github.com/AlexToday111/FlashSale-Tickets" },
  },
  {
    title: "High-performance API Gateway",
    description:
      "Обратный прокси на Go с балансировкой нагрузки и ограничением конкурентных запросов. Атомарные снимки конфигурации позволяют обновлять маршруты без перезапуска.",
    stack: ["Go", "HTTP", "Docker", "Prometheus", "Grafana", "Jaeger"],
    image: "/Logos/projects/highPerf.png",
    logo: "/Logos/projects/highPerf.png",
    category: "pet",
    links: {
      repo: "https://github.com/AlexToday111/High-performance-API-Gateway",
    },
    featured: true,
  },
  {
    title: "FlagForge",
    description:
      "Платформа feature flags с локальным вычислением правил в Go SDK. Конфигурация доставляется через SSE, а SDK сохраняет последний снимок при потере связи.",
    stack: ["Go", "PostgreSQL", "Redis", "SSE", "Docker", "Prometheus"],
    image: "/Logos/projects/flagforge.png",
    logo: "/Logos/projects/flagforge.png",
    category: "pet",
    links: { repo: "https://github.com/AlexToday111/FlagForge" },
    featured: true,
  },
  {
    title: "SaveOps",
    description:
      "Микросервисная платформа накопительных счетов с журналом операций и целями. gRPC связывает сервисы, а Redis обеспечивает идемпотентность денежных операций.",
    stack: [
      "Java 21",
      "Spring Boot",
      "PostgreSQL",
      "RabbitMQ",
      "Redis",
      "gRPC",
      "Docker",
      "Grafana",
    ],
    image: "/Logos/projects/saveops.png",
    logo: "/Logos/projects/saveops.png",
    category: "pet",
    links: { repo: "https://github.com/AlexToday111/SaveOps" },
    featured: true,
  },
  {
    title: "Notification Subscription Platform",
    description:
      "Платформа уведомлений с JSON-правилами подписок и дедупликацией событий. Transactional outbox связывает сохранение события с его публикацией в RabbitMQ.",
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
    category: "pet",
    links: {
      repo: "https://github.com/AlexToday111/Notification-Subscription-Platform",
    },
    featured: true,
  },
  {
    title: "Distributed Job Processing Platform",
    description:
      "Распределённая платформа фоновых задач с gRPC-воркерами и транзакционной очередью в PostgreSQL. Аренды и проверка токенов защищают задания от устаревших исполнителей.",
    stack: [
      "Go",
      "PostgreSQL",
      "gRPC",
      "Docker",
      "Prometheus",
      "Grafana",
      "Jaeger",
    ],
    image: "/Logos/projects/distributedJob.png",
    logo: "/Logos/projects/distributedJob.png",
    category: "pet",
    links: {
      repo: "https://github.com/AlexToday111/Distributed-Job-Processing-Platform",
    },
    featured: true,
  },
  {
    title: "Trade360Lab",
    description:
      "Платформа исследования торговых стратегий с Java API и Python-движком. Запуски бэктестов, их статусы и результаты сохраняются в PostgreSQL для последующего сравнения.",
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
    category: "ai-bots",
    links: { repo: "https://github.com/Trade360Lab/Trade360Lab" },
    featured: true,
  },
  {
    title: "Link2Action",
    description:
      "Telegram-платформа расшифровки видео и аудио с отдельным Python-воркером. Готовит транскрипты и структурированные пакеты для ручной работы с LLM.",
    stack: [
      "Kotlin",
      "Spring Boot",
      "Python",
      "PostgreSQL",
      "RabbitMQ",
      "Docker",
      "Whisper",
    ],
    image: "/Logos/projects/link2action.png",
    logo: "/Logos/projects/link2action.png",
    category: "ai-bots",
    links: { repo: "https://github.com/AlexToday111/Link2Action" },
  },
  {
    title: "Smart Activity Tracker",
    description:
      "Сервис приёма событий с идемпотентной записью и JSONB-метаданными. Рассчитывает retention, когорты и воронки, поддерживает пакетную загрузку.",
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
    category: "pet",
    links: { repo: "https://github.com/AlexToday111/Smart-Activity-Tracker" },
  },
  {
    title: "Porta Trading System",
    description:
      "Распределённый торговый MVP с Java BFF и событиями Kafka. Сервис trading-core оркестрирует заказы и сохраняет состояние портфеля в PostgreSQL.",
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
    category: "university",
    links: {
      repo: "https://github.com/AlexToday111/DNP-proj.-Trading-system-",
    },
    featured: true,
  },
  {
    title: "Anti-Fraud Detector",
    description:
      "Система выявления подозрительных операций возврата. Анализирует CSV-данные, строит граф связей между операциями и рассчитывает объяснимые оценки риска для расследования потенциального мошенничества.",
    stack: [
      "Go",
      "Kotlin",
      "Spring Boot",
      "React",
      "TypeScript",
      "PostgreSQL",
      "RabbitMQ",
      "MinIO",
      "Docker",
      "Nginx",
    ],
    image: "/Logos/projects/anti-fraud-logo-mark.png",
    logo: "/Logos/projects/anti-fraud-logo-mark.png",
    category: "university",
    links: { repo: "https://github.com/suxarikiii/Anti-Fraud-Detector" },
  },
  {
    title: "Language Compiler",
    description:
      "Фронтенд компилятора с ручным лексером и рекурсивным спуском. Строит неизменяемый типизированный AST и сообщает позицию первой синтаксической ошибки.",
    stack: ["Java", "Maven", "JUnit"],
    image: "/Logos/projects/language-compiler.svg",
    logo: "/Logos/projects/language-compiler.svg",
    category: "university",
    links: { repo: "https://github.com/AlexToday111/language-compiler" },
  },
  {
    title: "Visual Circuit Designer",
    description:
      "Браузерный редактор цифровых схем с интерактивной сборкой и симуляцией. Сохранение через backend API восстанавливает структуру схемы, входы и расположение элементов.",
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
    category: "university",
    links: { repo: "https://github.com/AlexToday111/Visual-Circuit-Designer" },
  },
  {
    title: "Secure DevOps Pipeline",
    description:
      "Конвейер GitHub Actions для контейнерного Go-приложения с gosec и Trivy. Проверки безопасности блокируют уязвимый образ, а отчёты сохраняются как артефакты.",
    stack: ["Go", "GitHub Actions", "Docker", "gosec", "Trivy", "ELK"],
    image: "/Logos/projects/secure-devops.png",
    logo: "/Logos/projects/secure-devops.png",
    category: "university",
    links: { repo: "https://github.com/AlexToday111/SNA-proj.-DevSecOps" },
  },
  {
    title: "PingTower",
    description:
      "Мониторинг сайтов и API с расписаниями проверок и оповещениями. PostgreSQL хранит актуальные результаты, ClickHouse используется для истории и аналитики временных рядов.",
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
    logoTone: "light",
    category: "hackathon",
    links: { repo: "https://github.com/AlexToday111/T1-Hackathon" },
    featured: true,
  },
  {
    title: "DatsPulse",
    description:
      "Python-бот с отдельными модулями ядра, стратегий и конфигурации. Сценарии расширяются через bot_strat.py без объединения всей логики в точке входа.",
    stack: ["Python"],
    image: "/projects/flowstate.jpg",
    logo: "/DatsPulse.png",
    logoClassName: "h-full w-full scale-110",
    category: "hackathon",
    links: { repo: "https://github.com/AlexToday111/DatsPulse" },
  },
  {
    title: "PortIQ",
    description:
      "Telegram-помощник для инвестиционных исследований: анализ акций, сравнение финансовых показателей и отслеживание инвестиционных портфелей.",
    stack: ["Java", "Spring Boot", "PostgreSQL", "Telegram", "T-Invest API"],
    image: "/Logos/projects/portiq-logo.png",
    logo: "/Logos/projects/portiq-logo.png",
    category: "ai-bots",
    links: { repo: "https://github.com/AlexToday111/PortIQ" },
  },
  {
    title: "Liftory",
    description:
      "Telegram-трекер тренировок для планирования тренировочных сессий, записи упражнений и анализа прогресса в фитнесе.",
    stack: ["Java", "Spring Boot", "PostgreSQL", "Flyway", "Docker"],
    image: "/Logos/projects/liftory-logo.png",
    logo: "/Logos/projects/liftory-logo.png",
    category: "ai-bots",
    links: { repo: "https://github.com/AlexToday111/Liftory" },
  },
  {
    title: "Divergence Trading Bot",
    description:
      "Торговый бот с поиском дивергенций RSI, управлением риском и бэктестами торговой стратегии.",
    stack: ["Python", "Pandas", "MetaTrader 5", "Backtrader"],
    image: "/icons/stack/python.svg",
    category: "ai-bots",
    links: { repo: "https://github.com/AlexToday111/MT5-Divergence-Bot" },
  },
];
