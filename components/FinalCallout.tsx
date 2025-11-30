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
          className="group relative mx-auto max-w-[31.25rem] w-full overflow-hidden rounded-2xl sm:rounded-3xl border bg-card/90 p-4 sm:p-6 md:p-8 lg:p-[3.125rem] text-center shadow-sm transition-transform duration-300 hover:scale-[1.02] final-callout-border-glow"
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
          <div aria-hidden className="pointer-events-none absolute inset-0 z-0">
            <div className="absolute -left-10 top-1/4 h-[22rem] w-[22rem] rounded-full blur-[90px] hidden sm:block" style={{ background: "radial-gradient(60% 60% at 50% 50%, rgba(167,139,250,0.45), transparent 70%)" }} />
            <div className="absolute -right-10 bottom-1/4 h-[22rem] w-[22rem] rounded-full blur-[90px] hidden sm:block" style={{ background: "radial-gradient(60% 60% at 50% 50%, rgba(167,139,250,0.45), transparent 70%)" }} />
          </div>

          {/* corner labels */}
          <motion.span
            initial={{ opacity: 0, x: -12, y: 12 }}
            whileInView={{ opacity: 1, x: 0, y: 0 }}
            transition={{ delay: 0.15, duration: 0.5, ease: "easeOut" }}
            viewport={{ once: false, amount: 0.5 }}
            className="pointer-events-none absolute bottom-3 left-3 sm:bottom-5 sm:left-6 z-10 text-xs sm:text-sm text-white/60"
          >
            Innopolis University
          </motion.span>
          <motion.span
            initial={{ opacity: 0, x: 12, y: -12 }}
            whileInView={{ opacity: 1, x: 0, y: 0 }}
            transition={{ delay: 0.15, duration: 0.5, ease: "easeOut" }}
            viewport={{ once: false, amount: 0.5 }}
            className="pointer-events-none absolute top-3 right-3 sm:top-5 sm:right-5 z-10 text-xs sm:text-sm text-white/60"
          >
            54.7431, 55.9678
          </motion.span>

          <motion.h2
            initial={{ opacity: 0, y: 8 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.05, duration: 0.5, ease: "easeOut" }}
            viewport={{ once: false, amount: 0.6 }}
            className="relative z-10 text-xl sm:text-2xl md:text-[3rem] lg:text-[3.75rem] font-extrabold tracking-[-0.09em] [font-family:var(--ff-exotica)] leading-tight"
          >
            I can be your joker
          </motion.h2>
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.5, ease: "easeOut" }}
            viewport={{ once: false, amount: 0.6 }}
            className="relative z-10 mt-4 sm:mt-[0.5rem] flex items-center justify-center gap-2 sm:gap-3 md:gap-4"
          >
            {/* Telegram */}
            <Link
              href={profile.links.telegram}
              aria-label="Open Telegram"
              className="group/icon inline-flex h-10 w-10 sm:h-12 sm:w-12 md:h-14 md:w-14 lg:h-[3.75rem] lg:w-[3.75rem] items-center justify-center rounded-full border border-white/10 bg-white/5 transition-all duration-200 hover:bg-sky-400 hover:scale-105 hover:ring-2 hover:ring-sky-400/60 hover:ring-offset-2 hover:ring-offset-[hsl(var(--bg))] hover:shadow-[0_0_24px_rgba(56,189,248,0.65)]"
            >
              <svg aria-hidden className="w-4 h-4 sm:w-5 sm:h-5 md:w-6 md:h-6 text-sky-400 transition-colors duration-200 group-hover/icon:text-black" viewBox="0 0 24 24" fill="currentColor">
                <path d="M9.036 15.47 8.87 20.5c.362 0 .52-.155.707-.341l3.392-3.278 4.99 3.655c.915.505 1.56.24 1.806-.848l3.273-15.34.001-.001c.291-1.355-.49-1.886-1.39-1.558L1.41 9.266c-1.33.518-1.31 1.26-.227 1.594l5.92 1.847 13.73-8.471c.647-.417 1.236-.186.751.232"/>
              </svg>
            </Link>

            {/* GitHub: idle black button + white icon; hover white button + black icon */}
            <Link
              href={profile.links.github}
              aria-label="Open GitHub"
              className="inline-flex h-10 w-10 sm:h-12 sm:w-12 md:h-14 md:w-14 lg:h-[3.75rem] lg:w-[3.75rem] items-center justify-center rounded-full border border-white/10 bg-white/5 text-white transition-all duration-200 hover:bg-white hover:text-black hover:scale-105 hover:ring-2 hover:ring-white/60 hover:ring-offset-2 hover:ring-offset-[hsl(var(--bg))]"
              target="_blank"
              rel="noreferrer"
            >
              <svg aria-hidden className="w-4 h-4 sm:w-5 sm:h-5 md:w-6 md:h-6" viewBox="0 0 24 24" fill="currentColor">
                <path fillRule="evenodd" d="M12 .5C5.73.5.99 5.24.99 11.52c0 4.86 3.15 8.98 7.51 10.43.55.1.75-.24.75-.53 0-.26-.01-1.13-.02-2.05-3.05.66-3.7-1.3-3.7-1.3-.5-1.27-1.2-1.6-1.2-1.6-.98-.67.07-.66.07-.66 1.08.08 1.65 1.1 1.65 1.1.96 1.64 2.5 1.17 3.11.9.1-.7.37-1.17.67-1.44-2.43-.28-4.98-1.22-4.98-5.43 0-1.2.43-2.18 1.13-2.95-.11-.28-.49-1.4.11-2.93 0 0 .92-.3 3.02 1.13a10.5 10.5 0 0 1 5.5 0c2.1-1.43 3.02-1.13 3.02-1.13.6 1.53.22 2.65.11 2.93.7.77 1.13 1.75 1.13 2.95 0 4.22-2.56 5.15-4.99 5.43.38.33.72.97.72 1.96 0 1.41-.01 2.55-.01 2.9 0 .29.2.64.76.53 4.35-1.45 7.5-5.57 7.5-10.43C23.01 5.24 18.27.5 12 .5Z" clipRule="evenodd"/>
              </svg>
            </Link>

            {/* LeetCode: idle black button + orange icon; hover orange button + black icon */}
            <Link
              href={profile.links.leetcode}
              aria-label="Open LeetCode"
              className="group inline-flex h-10 w-10 sm:h-12 sm:w-12 md:h-14 md:w-14 lg:h-[3.75rem] lg:w-[3.75rem] items-center justify-center rounded-full border border-white/10 bg-white/5 text-[#FFA116] transition-all duration-200 hover:bg-[#FFA116] hover:text-black hover:scale-105 hover:ring-2 hover:ring-[#FFA116]/60 hover:ring-offset-2 hover:ring-offset-[hsl(var(--bg))]"
              target="_blank"
              rel="noreferrer"
            >
              <svg aria-hidden className="w-4 h-4 sm:w-5 sm:h-5 md:w-6 md:h-6 transition-colors duration-200" viewBox="0 0 24 24" fill="currentColor">
                <path d="M14.9 3.2a1.2 1.2 0 0 1 1.7 0l.3.3a1.2 1.2 0 0 1 0 1.7l-6.4 6.4 6.4 6.4a1.2 1.2 0 0 1 0 1.7l-.3.3a1.2 1.2 0 0 1-1.7 0l-7.5-7.5a1.2 1.2 0 0 1 0-1.7l7.5-7.6Z"/>
                <path d="M18.5 10.5h-5a1.5 1.5 0 1 0 0 3h5a1.5 1.5 0 1 0 0-3Z"/>
              </svg>
            </Link>
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
}
