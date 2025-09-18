"use client";

import Link from "next/link";
import { Github, Gitlab, Mail, Linkedin, Code2, TentTree } from "lucide-react";
import { clsx } from "clsx";

export type SocialLink = {
  id: string;
  label: string;
  href: string;
  rel?: string;
  target?: string;
};

function getIcon(id: string) {
  switch (id) {
    case "github":
      return Github;
    case "gitlab":
      return Gitlab;
    case "linkedin":
      return Linkedin;
    case "email":
      return Mail;
    case "leetcode":
      return Code2;
    case "codeforces":
      return TentTree;
    default:
      return Code2;
  }
}

export default function SocialLinks({
  links,
  variant = "expanded",
}: {
  links: SocialLink[];
  variant?: "compact" | "expanded";
}) {
  return (
    <ul className={clsx("grid gap-2", variant === "expanded" ? "grid-cols-2 sm:grid-cols-3" : "grid-cols-3")}
      role="list"
    >
      {links.map(({ id, label, href, rel, target }) => {
        const Icon = getIcon(id);
        return (
          <li key={id}>
            <Link
              href={href}
              aria-label={label}
              rel={rel ?? (href.startsWith("http") ? "noopener noreferrer" : undefined)}
              target={target ?? (href.startsWith("http") ? "_blank" : undefined)}
              className={clsx(
                "group inline-flex w-full items-center gap-3 rounded-xl border border-white/10 bg-card/60 p-3 transition",
                "hover:border-white/20 hover:bg-white/10",
                "focus-visible:ring-[hsl(var(--accent-green))]"
              )}
            >
              <span className="inline-flex h-8 w-8 items-center justify-center rounded-lg bg-white/5">
                <Icon className="h-4 w-4 text-[hsl(var(--accent-purple))] group-hover:rotate-6 group-hover:scale-105 transition" aria-hidden="true" />
              </span>
              <span className="text-sm font-medium">{label}</span>
            </Link>
          </li>
        );
      })}
    </ul>
  );
}


