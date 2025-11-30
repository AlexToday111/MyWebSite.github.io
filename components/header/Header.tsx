"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { ThemeToggle } from "@/components/ThemeToggle";

const links = [
  { href: "/", label: "Главная" },
  { href: "/projects", label: "Проекты" },
  { href: "/education", label: "Образование" },
  { href: "/about", label: "Обо мне" },
  { href: "/contact", label: "Контакты" },
];

export function Header() {
  const pathname = usePathname();
  return (
    <header className="sticky top-0 z-50 backdrop-blur supports-[backdrop-filter]:bg-black/30">
      <nav className="container flex items-center justify-between py-2 sm:py-3 gap-2">
        <div className="flex items-center gap-2 sm:gap-4 md:gap-6 flex-wrap min-w-0">
          {links.map((l) => {
            const active = pathname === l.href;
            return (
              <Link
                key={l.href}
                href={l.href}
                className={`text-[10px] xs:text-xs sm:text-sm whitespace-nowrap transition hover:text-[hsl(var(--accent-green))] ${active ? "underline underline-offset-4" : ""}`}
              >
                {l.label}
              </Link>
            );
          })}
        </div>
        <div className="flex-shrink-0">
          <ThemeToggle />
        </div>
      </nav>
    </header>
  );
}
