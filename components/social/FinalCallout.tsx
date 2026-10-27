"use client";

import { profile } from "@/data/profile";
import { withBasePath } from "@/lib/paths";
import { usePortfolioLanguage } from "../providers/PortfolioLanguage";
import styles from "./FinalCallout.module.css";

const contactIcons = {
  Telegram: [
    "M9.036 15.47 8.87 20.5c.362 0 .52-.155.707-.341l3.392-3.278 4.99 3.655c.915.505 1.56.24 1.806-.848l3.273-15.34.001-.001c.291-1.355-.49-1.886-1.39-1.558L1.41 9.266c-1.33.518-1.31 1.26-.227 1.594l5.92 1.847 13.73-8.471c.647-.417 1.236-.186.751.232",
  ],
  GitHub: [
    "M12 .5C5.73.5.99 5.24.99 11.52c0 4.86 3.15 8.98 7.51 10.43.55.1.75-.24.75-.53 0-.26-.01-1.13-.02-2.05-3.05.66-3.7-1.3-3.7-1.3-.5-1.27-1.2-1.6-1.2-1.6-.98-.67.07-.66.07-.66 1.08.08 1.65 1.1 1.65 1.1.96 1.64 2.5 1.17 3.11.9.1-.7.37-1.17.67-1.44-2.43-.28-4.98-1.22-4.98-5.43 0-1.2.43-2.18 1.13-2.95-.11-.28-.49-1.4.11-2.93 0 0 .92-.3 3.02 1.13a10.5 10.5 0 0 1 5.5 0c2.1-1.43 3.02-1.13 3.02-1.13.6 1.53.22 2.65.11 2.93.7.77 1.13 1.75 1.13 2.95 0 4.22-2.56 5.15-4.99 5.43.38.33.72.97.72 1.96 0 1.41-.01 2.55-.01 2.9 0 .29.2.64.76.53 4.35-1.45 7.5-5.57 7.5-10.43C23.01 5.24 18.27.5 12 .5Z",
  ],
  LinkedIn: [
    "M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.049c.476-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 1 1 0-4.124 2.062 2.062 0 0 1 0 4.124zM7.119 20.452H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z",
  ],
} as const;

export default function FinalCallout() {
  const { language } = usePortfolioLanguage();
  return (
    <footer className="contact-footer" lang={language}>
      <div className="contact-heading">
        <h2>
          {language === "en" ? "My social profiles" : "Мои социальные профили"}
        </h2>
        <p className="contact-lead">
          {language === "en"
            ? "I'd be glad to join your team!"
            : "Буду рад стать частью вашей команды!"}
        </p>
      </div>
      <nav
        aria-label={
          language === "en" ? "Social profiles" : "Социальные профили"
        }
      >
        {(
          [
            ["Telegram", profile.links.telegram],
            ["GitHub", profile.links.github],
            ["LeetCode", profile.links.leetcode],
            ["LinkedIn", profile.links.linkedin],
          ] as const
        ).map(([name, href]) => (
          <a
            key={name}
            data-social={name}
            href={href}
            target="_blank"
            rel="noreferrer"
          >
            <span className="contact-social-icon" aria-hidden="true">
              {name === "LeetCode" ? (
                <span
                  className={styles.leetcodeIcon}
                  style={{
                    maskImage: `url("${withBasePath("/icons/social/leetcode.svg")}")`,
                    WebkitMaskImage: `url("${withBasePath("/icons/social/leetcode.svg")}")`,
                  }}
                />
              ) : (
                <svg
                  viewBox="0 0 24 24"
                  fill="currentColor"
                  fillRule="evenodd"
                  focusable="false"
                >
                  {contactIcons[name].map((path) => (
                    <path key={path} d={path} />
                  ))}
                </svg>
              )}
            </span>
            <strong>{name}</strong>
          </a>
        ))}
      </nav>
    </footer>
  );
}
