"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { ThemeToggle } from "@/components/ThemeToggle";

const links = [
  { href: "/", label: "Главная" },
  { href: "/projects", label: "Проекты" },
  { href: "/education", label: "Обучение" },
  { href: "/about", label: "Обо мне" },
  { href: "/contact", label: "Контакты" },
];

export function Header() {
  const pathname = usePathname();
  return (
    <header className="sticky top-0 z-50 backdrop-blur supports-[backdrop-filter]:bg-black/30">
      <nav className="container flex items-center justify-between py-3">
        <div className="flex items-center gap-6">
          {links.map((l) => {
            const active = pathname === l.href;
            return (
              <Link
                key={l.href}
                href={l.href}
                className={`text-sm transition hover:text-[hsl(var(--accent-blue))] ${active ? "underline underline-offset-4" : ""}`}
              >
                {l.label}
              </Link>
            );
          })}
        </div>
        <ThemeToggle />
      </nav>
    </header>
  );
}


