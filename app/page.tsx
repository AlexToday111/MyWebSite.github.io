"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { withBasePath } from "@/lib/paths";
import AuroraBackground from "@/components/AuroraBackground";
import Link from "next/link";
import ProjectHero from "@/components/ProjectHero";
import NeonProjectGrid from "@/components/NeonProjectGrid";
import StackSection from "@/components/StackSection";
import FinalCallout from "@/components/FinalCallout";
import { profile } from "@/data/profile";

export default function HomePage() {
  return (
    <main id="content" className="relative h-screen overflow-y-scroll overflow-x-hidden snap-y snap-mandatory scroll-smooth">
      {/* Раздел 1: Ник */}
      <section id="intro" className="snap-start snap-always min-h-screen grid place-items-center relative">
        <AuroraBackground />
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
          viewport={{ once: false, amount: 0.6 }}
          className="relative text-center"
        >
          {/* Background image below text */}
          <div aria-hidden className="pointer-events-none absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 opacity-20 w-[1200px] h-[1200px]">
            <Image src={withBasePath("/photos/profile.png")} alt="" fill priority sizes="1200px" className="object-contain" />
          </div>

          <motion.h1
            className="relative z-10 mt-3 sm:mt-5 text-7xl sm:text-9xl font-extrabold tracking-tight [font-family:var(--ff-exotica)]"
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.25 }}
          >
            {profile.name}
          </motion.h1>

          
        </motion.div>
      </section>

      {/* Раздел 2: Стек + проекты */}
      <section id="work" className="relative snap-start snap-always min-h-screen">
        {/* Фоновая аура: два фиолетовых круга по бокам */}
        <div aria-hidden className="pointer-events-none absolute inset-0 -z-10">
          <div className="absolute left-[-12%] top-[15%] h-[34rem] w-[34rem] rounded-full bg-gradient-to-tr from-violet-500/35 to-fuchsia-500/25 blur-3xl animate-soft-blink" />
          <div className="absolute right-[-14%] bottom-[-10%] h-[38rem] w-[38rem] rounded-full bg-gradient-to-bl from-fuchsia-500/30 to-purple-500/25 blur-3xl animate-soft-blink" />
        </div>
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
          viewport={{ once: false, amount: 0.4 }}
        >
          <StackSection />
        </motion.div>
        <section id="projects" className="container py-14 sm:py-16 relative">
          <div className="mb-6 text-center relative">
            <h2 className="text-2xl sm:text-3xl font-extrabold tracking-tight [font-family:var(--ff-exotica)]">Проекты</h2>
            <p className="mt-2 text-sm text-white/70 max-w-2xl mx-auto">Краткий обзор некоторых реализованных проектов. Подробнее в репозиториях и демо.</p>
          </div>
          
          {/* Hero tile removed as requested */}
          <div className="mt-6">
            <NeonProjectGrid />
          </div>
        </section>
      </section>

      {/* Раздел 3: Заключение */}
      <section id="final" className="relative snap-start snap-always min-h-screen grid place-items-center">
        <div aria-hidden className="pointer-events-none absolute inset-0 -z-10">
          <div className="absolute left-[-12%] top-[15%] h-[60rem] w-[60rem] rounded-full bg-gradient-to-tr from-violet-500/35 to-fuchsia-500/25 blur-3xl animate-soft-blink" />
          <div className="absolute right-[-14%] bottom-[-10%] h-[68rem] w-[68rem] rounded-full bg-gradient-to-bl from-fuchsia-500/30 to-purple-500/25 blur-3xl animate-soft-blink" />
        </div>
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
          viewport={{ once: false, amount: 0.5 }}
          className="w-full"
        >
          <FinalCallout />
        </motion.div>
      </section>
    </main>
  );
}
