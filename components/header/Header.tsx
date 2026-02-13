"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const links = [
  { href: "/", label: "start" },
  { href: "/about", label: "about" },
  { href: "/projects", label: "projects" },
  { href: "/contacts", label: "contacts" },
];

export function Header() {
  const pathname = usePathname();
  return (
    <header className="fixed top-3 left-0 right-0 z-50">
      <div className="relative mx-auto flex items-center justify-center">
        <nav className="pointer-events-auto flex items-center gap-1 sm:gap-2 rounded-full border border-white/10 bg-black/40 px-2 py-1.5 sm:px-3 sm:py-2 backdrop-blur shadow-soft">
          {links.map((l) => {
            const active = pathname === l.href;
            return (
              <Link
                key={l.href}
                href={l.href}
                className={`rounded-full px-3 sm:px-4 py-1 text-[10px] xs:text-xs sm:text-sm tracking-[0.15em] transition ${active ? "bg-white/15 text-white" : "text-white/70 hover:bg-[hsl(var(--accent-purple))] hover:text-black hover:shadow-[0_0_24px_rgba(167,139,250,0.55)]"}`}
                aria-current={active ? "page" : undefined}
              >
                {l.label}
              </Link>
            );
          })}
        </nav>
      </div>
    </header>
  );
}
