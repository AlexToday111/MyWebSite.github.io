"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { profile } from "@/data/profile";

export default function FinalCallout() {
  return (
    <div className="w-full py-12 sm:py-24 md:py-32 relative">
      <div className="container px-4 sm:px-6">
        <motion.div
          initial={{ opacity: 0, y: 20, scale: 0.98 }}
          whileInView={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          viewport={{ once: false, amount: 0.5 }}
          className="contact-card group relative mx-auto max-w-[42rem] w-full overflow-hidden rounded-2xl sm:rounded-3xl border p-6 pt-10 pb-12 sm:p-8 sm:pt-12 sm:pb-14 md:p-12 lg:p-[4.5rem] text-center shadow-sm transition-transform duration-300 hover:scale-[1.02] final-callout-border-glow"
          style={{ borderColor: "rgba(167,139,250,.55)", boxShadow: "0 0 0 1px rgba(167,139,250,.55) inset" }}
        >
          {/* Боковое свечение ЗА плашкой */}
          <div aria-hidden className="pointer-events-none absolute -left-[15rem] top-1/2 -translate-y-1/2 -z-10 hidden md:block">
            <div className="h-[64rem] w-[28rem] rounded-full bg-gradient-to-r from-violet-500/40 to-fuchsia-500/30 blur-3xl animate-soft-blink" />
          </div>
          <div aria-hidden className="pointer-events-none absolute -right-[15rem] top-1/2 -translate-y-1/2 -z-10 hidden md:block">
            <div className="h-[28rem] w-[28rem] rounded-full bg-gradient-to-l from-fuchsia-500/35 to-purple-500/30 blur-3xl animate-soft-blink" style={{ animationDelay: '0.5s' }} />
          </div>
          {/* violet soft glows on sides (like other sections) */}
          <div aria-hidden className="contact-ambient pointer-events-none absolute inset-0 z-0">
            <div className="absolute -left-10 top-1/4 h-[22rem] w-[22rem] rounded-full blur-[90px] hidden sm:block" style={{ background: "radial-gradient(60% 60% at 50% 50%, rgba(167,139,250,0.45), transparent 70%)" }} />
            <div className="absolute -right-10 bottom-1/4 h-[22rem] w-[22rem] rounded-full blur-[90px] hidden sm:block" style={{ background: "radial-gradient(60% 60% at 50% 50%, rgba(167,139,250,0.45), transparent 70%)" }} />
          </div>

          {/* corner labels */}
          <motion.span
            initial={{ opacity: 0, x: -12, y: 12 }}
            whileInView={{ opacity: 1, x: 0, y: 0 }}
            transition={{ delay: 0.15, duration: 0.5, ease: "easeOut" }}
            viewport={{ once: false, amount: 0.5 }}
            className="contact-caption pointer-events-none absolute bottom-3 left-3 sm:bottom-5 sm:left-6 z-10 text-xs sm:text-sm"
          >
            From Ufa, Republic of <strong>Bashkortostan</strong>
          </motion.span>
          <motion.span
            initial={{ opacity: 0, x: 12, y: -12 }}
            whileInView={{ opacity: 1, x: 0, y: 0 }}
            transition={{ delay: 0.15, duration: 0.5, ease: "easeOut" }}
            viewport={{ once: false, amount: 0.5 }}
            className="contact-caption pointer-events-none absolute top-3 right-3 sm:top-5 sm:right-5 z-10 text-xs sm:text-sm"
          >
            54.7431, 55.9678
          </motion.span>

          <motion.div
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.5, ease: "easeOut" }}
            viewport={{ once: false, amount: 0.6 }}
            className="relative z-10 flex items-center justify-center gap-3 sm:gap-4 md:gap-5"
          >
            {/* Telegram */}
            <Link
              href={profile.links.telegram}
              aria-label="Open Telegram"
              className="contact-link group/icon inline-flex h-12 w-12 sm:h-14 sm:w-14 md:h-16 md:w-16 lg:h-[4rem] lg:w-[4rem] items-center justify-center rounded-full border text-[var(--telegram)] transition-all duration-200 hover:bg-sky-400 hover:scale-110 hover:ring-2 hover:ring-sky-400/60 hover:ring-offset-2 hover:ring-offset-[hsl(var(--bg))] hover:shadow-[0_0_28px_rgba(56,189,248,0.85)]"
            >
              <svg
                aria-hidden
                className="w-6 h-6 sm:w-7 sm:h-7 md:w-8 md:h-8 transition-colors duration-200 group-hover/icon:text-black"
                viewBox="0 0 24 24"
                fill="currentColor"
              >
                <path d="M9.036 15.47 8.87 20.5c.362 0 .52-.155.707-.341l3.392-3.278 4.99 3.655c.915.505 1.56.24 1.806-.848l3.273-15.34.001-.001c.291-1.355-.49-1.886-1.39-1.558L1.41 9.266c-1.33.518-1.31 1.26-.227 1.594l5.92 1.847 13.73-8.471c.647-.417 1.236-.186.751.232"/>
              </svg>
            </Link>

            {/* GitHub: idle чёрный, hover белый + свечение */}
            <Link
              href={profile.links.github}
              aria-label="Open GitHub"
              className="contact-link inline-flex h-12 w-12 sm:h-14 sm:w-14 md:h-16 md:w-16 lg:h-[4rem] lg:w-[4rem] items-center justify-center rounded-full border text-[hsl(var(--fg))] transition-all duration-200 hover:bg-white hover:text-black hover:scale-110 hover:ring-2 hover:ring-white/70 hover:ring-offset-2 hover:ring-offset-[hsl(var(--bg))] hover:shadow-[0_0_28px_rgba(255,255,255,0.9)]"
              target="_blank"
              rel="noreferrer"
            >
              <svg
                aria-hidden
                className="w-6 h-6 sm:w-7 sm:h-7 md:w-8 md:h-8"
                viewBox="0 0 24 24"
                fill="currentColor"
              >
                <path
                  fillRule="evenodd"
                  d="M12 .5C5.73.5.99 5.24.99 11.52c0 4.86 3.15 8.98 7.51 10.43.55.1.75-.24.75-.53 0-.26-.01-1.13-.02-2.05-3.05.66-3.7-1.3-3.7-1.3-.5-1.27-1.2-1.6-1.2-1.6-.98-.67.07-.66.07-.66 1.08.08 1.65 1.1 1.65 1.1.96 1.64 2.5 1.17 3.11.9.1-.7.37-1.17.67-1.44-2.43-.28-4.98-1.22-4.98-5.43 0-1.2.43-2.18 1.13-2.95-.11-.28-.49-1.4.11-2.93 0 0 .92-.3 3.02 1.13a10.5 10.5 0 0 1 5.5 0c2.1-1.43 3.02-1.13 3.02-1.13.6 1.53.22 2.65.11 2.93.7.77 1.13 1.75 1.13 2.95 0 4.22-2.56 5.15-4.99 5.43.38.33.72.97.72 1.96 0 1.41-.01 2.55-.01 2.9 0 .29.2.64.76.53 4.35-1.45 7.5-5.57 7.5-10.43C23.01 5.24 18.27.5 12 .5Z"
                  clipRule="evenodd"
                />
              </svg>
            </Link>

            {/* LeetCode: idle чёрный фон + оранжевый, hover оранжевая кнопка + свечение */}
            <Link
              href={profile.links.leetcode}
              aria-label="Open LeetCode"
              className="contact-link group inline-flex h-12 w-12 sm:h-14 sm:w-14 md:h-16 md:w-16 lg:h-[4rem] lg:w-[4rem] items-center justify-center rounded-full border text-[var(--leetcode)] transition-all duration-200 hover:bg-[#FFA116] hover:text-black hover:scale-110 hover:ring-2 hover:ring-[#FFA116]/70 hover:ring-offset-2 hover:ring-offset-[hsl(var(--bg))] hover:shadow-[0_0_28px_rgba(255,161,22,0.85)]"
              target="_blank"
              rel="noreferrer"
            >
              <svg
              aria-hidden
              className="w-6 h-6 sm:w-7 sm:h-7 md:w-8 md:h-8 transition-colors duration-200"
              viewBox="0 0 24 24"
              fill="currentColor"
            >
              <path d="M13.483 2.5a1.25 1.25 0 0 1 .884.366l.767.768a1.25 1.25 0 0 1 0 1.768l-6.59 6.59 6.59 6.59a1.25 1.25 0 0 1 0 1.768l-.767.768a1.25 1.25 0 0 1-1.768 0l-7.947-7.947a1.25 1.25 0 0 1 0-1.768L12.599 2.866a1.25 1.25 0 0 1 .884-.366Z" />
              <path d="M17.25 10h-5.5a2 2 0 1 0 0 4h5.5a2 2 0 1 0 0-4Z" />
            </svg>
            </Link>
            {/* LinkedIn */}
            <Link
              href={profile.links.linkedin}
              aria-label="Open LinkedIn"
              title="LinkedIn"
              target="_blank"
              rel="noreferrer"
              className="contact-link inline-flex h-12 w-12 sm:h-14 sm:w-14 md:h-16 md:w-16 lg:h-[4rem] lg:w-[4rem] items-center justify-center rounded-full border text-[var(--linkedin)] transition-all duration-200 hover:bg-[#0A66C2] hover:text-white hover:scale-110 hover:ring-2 hover:ring-[#0A66C2]/70 hover:ring-offset-2 hover:ring-offset-[hsl(var(--bg))] hover:shadow-[0_0_28px_rgba(10,102,194,0.85)]"
            >
              <svg
                aria-hidden
                className="w-6 h-6 sm:w-7 sm:h-7 md:w-8 md:h-8"
                viewBox="0 0 24 24"
                fill="currentColor"
              >
                <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.049c.476-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 1 1 0-4.124 2.062 2.062 0 0 1 0 4.124zM7.119 20.452H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
              </svg>
            </Link>
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
}
