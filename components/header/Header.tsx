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
        <nav
          className="pointer-events-auto flex items-center gap-0.5 sm:gap-0.5 rounded-md bg-black/20 px-1.5 py-1.5 sm:px-2 sm:py-2 translate-x-60"
        >
          {links.map((l) => {
            const active = pathname === l.href;
            return (
              <Link
                key={l.href}
                href={l.href}
                className={`px-2 sm:px-2.5 py-1 text-[15px] xs:text-[17px] sm:text-[19px] tracking-[0.06em] transition rounded-md ${active ? "text-[#b48eeb]" : "text-[#b48eeb] hover:bg-[rgba(180,142,236,0.12)] hover:text-[#f3e9ff] hover:shadow-[0_0_18px_rgba(180,142,236,0.55)]"}`}
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
