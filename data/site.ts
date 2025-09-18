export const site = {
  name: "Эрнест Кудакаев",
  role: "Java Backend Developer",
  tagline: "Молодой Java‑разработчик: Spring Boot, многопоточность, CI/CD. Развиваюсь как backend‑инженер.",
  email: "me@example.com",
  socials: [
    { id: "github", label: "GitHub", href: "https://github.com/AlexToday666" },
    { id: "gitlab", label: "GitLab", href: "https://gitlab.com/e.kudakaev" },
    { id: "leetcode", label: "LeetCode", href: "https://leetcode.com/AlexToday666" },
    { id: "email", label: "Email", href: "mailto:me@example.com" }
  ]
} as const;

export type Site = typeof site;


