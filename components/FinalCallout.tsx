"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { profile } from "@/data/profile";

export default function FinalCallout() {
  return (
    <div className="w-full py-24 sm:py-32">
      <div className="container">
        <motion.div
          initial={{ opacity: 0, y: 20, scale: 0.98 }}
          whileInView={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          viewport={{ once: true, amount: 0.5 }}
          className="group relative mx-auto max-w-md overflow-hidden rounded-3xl border bg-card/90 p-10 text-center shadow-sm transition-transform duration-300 hover:scale-[1.02]"
          style={{ borderColor: "rgba(167,139,250,.55)", boxShadow: "0 0 0 1px rgba(167,139,250,.55) inset, 0 0 36px rgba(167,139,250,.25)" }}
        >
          {/* violet soft glows on sides (like other sections) */}
          <div aria-hidden className="pointer-events-none absolute inset-0 z-0">
            <div className="absolute -left-10 top-1/4 h-[22rem] w-[22rem] rounded-full blur-[90px]" style={{ background: "radial-gradient(60% 60% at 50% 50%, rgba(167,139,250,0.45), transparent 70%)" }} />
            <div className="absolute -right-10 bottom-1/4 h-[22rem] w-[22rem] rounded-full blur-[90px]" style={{ background: "radial-gradient(60% 60% at 50% 50%, rgba(167,139,250,0.45), transparent 70%)" }} />
          </div>

          {/* corner labels */}
          <motion.span
            initial={{ opacity: 0, x: -12, y: 12 }}
            whileInView={{ opacity: 1, x: 0, y: 0 }}
            transition={{ delay: 0.15, duration: 0.5, ease: "easeOut" }}
            viewport={{ once: true, amount: 0.5 }}
            className="pointer-events-none absolute bottom-4 left-4 z-10 text-xs text-white/60"
          >
            Innopolis University
          </motion.span>
          <motion.span
            initial={{ opacity: 0, x: 12, y: -12 }}
            whileInView={{ opacity: 1, x: 0, y: 0 }}
            transition={{ delay: 0.2, duration: 0.5, ease: "easeOut" }}
            viewport={{ once: true, amount: 0.5 }}
            className="pointer-events-none absolute top-4 right-4 z-10 text-xs text-white/60"
          >
            54.7431, 55.9678
          </motion.span>

          <motion.h2
            initial={{ opacity: 0, y: 8 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.05, duration: 0.5, ease: "easeOut" }}
            viewport={{ once: true, amount: 0.6 }}
            className="relative z-10 text-4xl sm:text-5xl font-extrabold tracking-tight [font-family:var(--ff-exotica)]"
          >
            I can be your joker
          </motion.h2>
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.5, ease: "easeOut" }}
            viewport={{ once: true, amount: 0.6 }}
            className="relative z-10 mt-6 flex items-center justify-center"
          >
            <Link
              href={profile.links.telegram}
              aria-label="Open Telegram"
              className="group/icon inline-flex h-12 w-12 items-center justify-center rounded-full border border-white/10 bg-white/5 transition-all duration-200 hover:bg-sky-400 hover:scale-105 hover:ring-2 hover:ring-sky-400/60 hover:ring-offset-2 hover:ring-offset-[hsl(var(--bg))] hover:shadow-[0_0_24px_rgba(56,189,248,0.65)]"
            >
              <svg aria-hidden width="24" height="24" viewBox="0 0 24 24" fill="currentColor" className="text-sky-400 transition-colors duration-200 group-hover/icon:text-black">
                <path d="M9.036 15.47 8.87 20.5c.362 0 .52-.155.707-.341l3.392-3.278 4.99 3.655c.915.505 1.56.24 1.806-.848l3.273-15.34.001-.001c.291-1.355-.49-1.886-1.39-1.558L1.41 9.266c-1.33.518-1.31 1.26-.227 1.594l5.92 1.847 13.73-8.471c.647-.417 1.236-.186.751.232"/>
              </svg>
            </Link>
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
}
