import type { ProjectCategory } from "./projects";

export const projectCategoryLabels: Record<
  "en" | "ru",
  Record<ProjectCategory, string>
> = {
  en: {
    "Pet Projects": "Pet Projects",
    "University Projects": "University Projects",
    Hackathons: "Hackathons",
    "Commercial Experience": "Commercial Experience",
  },
  ru: {
    "Pet Projects": "pet-проекты",
    "University Projects": "Университетские проекты",
    Hackathons: "Хакатоны",
    "Commercial Experience": "Коммерческий опыт",
  },
};

export const projectDescriptionsEn: Record<string, string> = {
  "Distributed Job Processing Platform":
    "A distributed job platform with gRPC workers and a transactional PostgreSQL queue. Renewable leases and fencing tokens reject stale worker results.",
  "High-performance API Gateway":
    "A Go reverse proxy with load balancing and concurrency limits. Atomic configuration snapshots allow routes to change without restarting the gateway.",
  FlagForge:
    "A feature flag platform with local rule evaluation in its Go SDK. SSE delivers configuration while the SDK retains its last snapshot during disconnections.",
  SaveOps:
    "A savings platform with microservices, transaction ledgers, and goals. gRPC connects services while Redis provides idempotency for money operations.",
  "FlashSale Tickets":
    "A ticket reservation system with expiring holds and order management. RabbitMQ events connect orders, simulated payments, and notifications.",
  Link2Action:
    "A Telegram media transcription platform with a separate Python worker. Produces transcripts and structured packages for manual use with LLMs.",
  "Notification Subscription Platform":
    "A notification platform with JSON subscription rules and event deduplication. A transactional outbox links persisted events to RabbitMQ publication.",
  "Smart Activity Tracker":
    "An event ingestion service with idempotent writes and JSONB metadata. Supports batch ingestion, retention analysis, cohorts, and funnels.",
  "Porta Trading System":
    "A distributed trading MVP with a Java BFF and Kafka events. The trading-core service orchestrates orders and persists portfolio state in PostgreSQL.",
  "Language Compiler":
    "A compiler front-end with a handwritten lexer and recursive descent parser. Builds an immutable typed AST and reports the location of the first syntax error.",
  "Visual Circuit Designer":
    "A browser-based digital circuit editor with interactive construction and simulation. Backend persistence restores circuit structure, inputs, and component positions.",
  "Secure DevOps Pipeline":
    "A GitHub Actions pipeline for a containerized Go application using gosec and Trivy. Security gates block vulnerable images and export scan reports as artifacts.",
  PingTower:
    "Scheduled website and API monitoring with alerts. PostgreSQL holds current results while ClickHouse serves historical data and time-series analytics.",
  DatsPulse:
    "A Python bot separating its core, strategies, and configuration. Scenarios extend through bot_strat.py without concentrating all logic in the entry point.",
  ATLAS:
    "A Telegram product for planning, habits, and exercise built as a modular monolith. Separates use cases and dialogue state with a deterministic fallback when the LLM is unavailable.",
  Trade360Lab:
    "A trading strategy research platform with a Java API and Python engine. Persists backtest runs, statuses, and results in PostgreSQL for comparison.",
};

export const projectHighlights: Record<string, { en: string; ru: string }> = {
  "Distributed Job Processing Platform": {
    en: "Renewable leases · Retries · Dead-letter queue",
    ru: "Продление аренд · Повторы · Очередь неуспешных задач",
  },
  "High-performance API Gateway": {
    en: "Token bucket · Circuit breaker · Health checks",
    ru: "Token bucket · Circuit breaker · Проверки доступности",
  },
  FlagForge: {
    en: "Local evaluation · Percentage rollouts · Audit history",
    ru: "Локальные правила · Процентные rollout-ы · Аудит",
  },
  SaveOps: {
    en: "Transaction ledger · Idempotency · Distributed locks",
    ru: "Журнал операций · Идемпотентность · Распределённые блокировки",
  },
  "FlashSale Tickets": {
    en: "Reservation expiry · Saga orchestration · Retry / DLQ",
    ru: "Истечение резервов · Оркестрация саги · Повторы / DLQ",
  },
  Link2Action: {
    en: "Worker isolation · Async processing · LLM-ready packages",
    ru: "Отдельный воркер · Асинхронная обработка · Пакеты для LLM",
  },
  "Notification Subscription Platform": {
    en: "Transactional outbox · Rule matching · Delivery attempts",
    ru: "Transactional outbox · Правила подписок · История доставки",
  },
  "Smart Activity Tracker": {
    en: "Event deduplication · Cohorts · Funnel analysis",
    ru: "Дедупликация событий · Когорты · Анализ воронок",
  },
  "Porta Trading System": {
    en: "Backend for frontend · Event streaming · Portfolio state",
    ru: "Backend for frontend · Потоки событий · Состояние портфеля",
  },
  "Language Compiler": {
    en: "Recursive descent · Immutable AST · Source diagnostics",
    ru: "Рекурсивный спуск · Неизменяемый AST · Диагностика ошибок",
  },
  "Visual Circuit Designer": {
    en: "Interactive editing · Circuit persistence",
    ru: "Интерактивный редактор · Сохранение структуры схем",
  },
  "Secure DevOps Pipeline": {
    en: "SAST · Image scanning · Security gates",
    ru: "SAST · Сканирование образов · Проверки безопасности",
  },
  PingTower: {
    en: "Scheduled checks · Time-series storage · Retention policies",
    ru: "Проверки по расписанию · Временные ряды · Политики хранения",
  },
  DatsPulse: {
    en: "Modular strategies · Shared configuration",
    ru: "Модульные стратегии · Общая конфигурация",
  },
  ATLAS: {
    en: "Bounded contexts · Dialogue state · Deterministic fallback",
    ru: "Границы контекстов · Состояние диалогов · Детерминированный fallback",
  },
  Trade360Lab: {
    en: "Backtest orchestration · Persisted run results",
    ru: "Оркестрация бэктестов · Сохранение результатов запусков",
  },
};
