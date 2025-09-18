"use client";

import { Mail, Github, Gitlab, MapPin, Code2 } from "lucide-react";
import { profile } from "@/data/profile";

const items = [
  { icon: Mail, label: profile.email, href: `mailto:${profile.email}` },
  { icon: Github, label: "GitHub", href: profile.links.github },
  { icon: Gitlab, label: "GitLab", href: profile.links.gitlab },
  { icon: Code2, label: "LeetCode", href: profile.links.leetcode ?? "#" },
  { icon: MapPin, label: profile.location, href: "#" },
];

export default function ContactRow() {
  return (
    <div className="flex flex-wrap gap-2">
      {items.map(({ icon: Icon, label, href }) => (
        <a key={label} href={href} target={href.startsWith("http") ? "_blank" : undefined} rel="noreferrer"
           className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-3 py-1.5 text-sm backdrop-blur hover:border-white/20 transition">
          <Icon className="h-4 w-4 text-amber-400" aria-hidden />
          <span>{label}</span>
        </a>
      ))}
    </div>
  );
}


