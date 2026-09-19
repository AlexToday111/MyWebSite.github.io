"use client";

import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import { withBasePath } from "@/lib/paths";
import AuroraBackground from "@/components/AuroraBackground";
import Link from "next/link";
import ProjectHero from "@/components/ProjectHero";
import NeonProjectGrid from "@/components/NeonProjectGrid";
import StackSection from "@/components/StackSection";
import FinalCallout from "@/components/FinalCallout";
import { profile } from "@/data/profile";
import { useState, useEffect } from "react";

export default function HomePage() {
  const [showImage, setShowImage] = useState(false);
  const [showAurora, setShowAurora] = useState(false);

  useEffect(() => {
    // Последовательная анимация: текст -> изображение -> подсветка
    const imageTimer = setTimeout(() => setShowImage(true), 800); // После появления текста
    const auroraTimer = setTimeout(() => setShowAurora(true), 1600); // После появления изображения

    return () => {
      clearTimeout(imageTimer);
      clearTimeout(auroraTimer);
    };
  }, []);

  return (
    <main
      id="content"
      className="relative h-screen overflow-y-scroll overflow-x-hidden scroll-smooth"
    >
      {/* Раздел 1: Ник */}
      <section id="intro" className="min-h-screen grid place-items-center relative">
        <AnimatePresence>
          {showAurora && <AuroraBackground key="aurora" />}
        </AnimatePresence>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
          viewport={{ once: false, amount: 0.6 }}
          className="relative text-center"
        >
          {/* Фоновое изображение под текстом с плавным затуханием снизу */}
          <motion.div
            aria-hidden
            className="pointer-events-none absolute w-full max-w-[720px] sm:max-w-[960px] md:max-w-[1200px] lg:max-w-[1440px] aspect-square"
            initial={{ opacity: 0, scale: 0.95, x: "-50%", y: "-50%" }}
            animate={
              showImage
                ? { opacity: 0.2, scale: 1.2, x: "-50%", y: "-50%" }
                : { opacity: 0, scale: 0.95, x: "-50%", y: "-50%" }
            }
            transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
            style={{
              willChange: "opacity, transform",
              left: "50%",
              top: "50%",
            }}
          >
            <div
              className="relative w-full h-full"
              style={{
                WebkitMaskImage:
                  "linear-gradient(to bottom, rgba(0,0,0,1) 0%, rgba(0,0,0,1) 65%, rgba(0,0,0,0) 100%)",
                maskImage:
                  "linear-gradient(to bottom, rgba(0,0,0,1) 0%, rgba(0,0,0,1) 65%, rgba(0,0,0,0) 100%)",
              }}
            >
              <Image
                src={withBasePath("/photos/profile.png")}
                alt=""
                fill
                priority
                sizes="(max-width: 640px) 720px, (max-width: 768px) 960px, (max-width: 1024px) 1200px, 1440px"
                className="object-contain"
              />
            </div>
          </motion.div>

          <motion.h1
            className="relative z-10 mt-12 sm:mt-16 text-[8rem] xs:text-[12rem] sm:text-[20rem] md:text-[28rem] lg:text-[35rem] font-extrabold tracking-tight [font-family:var(--ff-exotica)] select-none leading-none"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
            style={{
              userSelect: "none",
              WebkitUserSelect: "none",
              willChange: "opacity, transform",
            }}
          >
            <motion.span
              initial={{ color: "hsl(var(--accent-purple))" }}
              animate={{
                color: showImage
                  ? "hsl(var(--fg))"
                  : "hsl(var(--accent-purple))",
              }}
              transition={{ duration: 7, ease: [0.25, 0.46, 0.45, 0.95] }}
              style={{ willChange: "color" }}
            >
              ba
            </motion.span>
            <motion.span
              initial={{ color: "hsl(var(--accent-purple))" }}
              animate={{
                color: "hsl(var(--accent-purple))",
              }}
              transition={{ duration: 7, ease: [0.25, 0.46, 0.45, 0.95] }}
              style={{ willChange: "color" }}
            >
              6
            </motion.span>
            <motion.span
              initial={{ color: "hsl(var(--accent-purple))" }}
              animate={{
                color: showImage
                  ? "hsl(var(--fg))"
                  : "hsl(var(--accent-purple))",
              }}
              transition={{ duration: 7, ease: [0.25, 0.46, 0.45, 0.95] }}
              style={{ willChange: "color" }}
            >
              kir
            </motion.span>
          </motion.h1>
        </motion.div>
      </section>

      {/* Раздел 2: Стек + проекты */}
      <section id="work" className="relative min-h-screen">
        {/* Шар слева сверху от Technical Stack */}
        <AnimatePresence>
          <motion.div
            key="orb-left"
            aria-hidden
            className="stack-ambient pointer-events-none absolute left-[25%] top-[13%] -z-10"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 1.5, ease: [0.22, 1, 0.36, 1] }}
          >
            <div className="h-[64rem] w-[64rem] rounded-full bg-gradient-to-br from-violet-500/40 to-fuchsia-500/30 blur-3xl animate-soft-blink animate-orb-1" />
          </motion.div>
        </AnimatePresence>

        {/* Шар справа от Projects */}
        <AnimatePresence>
          <motion.div
            key="orb-right"
            aria-hidden
            className="pointer-events-none absolute right-[30%] top-[50%] -z-10"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{
              duration: 1.5,
              ease: [0.22, 1, 0.36, 1],
              delay: 0.2,
            }}
          >
            <div
              className="h-[64rem] w-[64rem] rounded-full bg-gradient-to-bl from-fuchsia-500/35 to-purple-500/30 blur-3xl animate-soft-blink animate-orb-2"
              style={{ animationDelay: "0.5s" }}
            />
          </motion.div>
        </AnimatePresence>

        <StackSection />

        <section id="projects" className="container py-10 sm:py-14 md:py-16 relative">
          <div className="mb-4 sm:mb-6 text-center relative">
            <h2 className="text-[2rem] sm:text-[2.5rem] md:text-[3.75rem] font-extrabold tracking-tight [font-family:var(--ff-exotica)]">
              Проекты
            </h2>
          </div>

          {/* Hero tile removed as requested */}
          <div className="mt-6">
            <NeonProjectGrid />
          </div>
        </section>
      </section>

      {/* Раздел 3: Заключение */}
      <section id="final" className="relative min-h-[100svh] grid place-items-center overflow-hidden">
      <div aria-hidden className="pointer-events-none absolute inset-0 -z-10 overflow-hidden">
        <div className="absolute left-[-10%] top-[15%] h-[85rem] w-[85rem] rounded-full bg-gradient-to-tr from-violet-500/35 to-fuchsia-500/25 blur-3xl animate-soft-blink" />
        <div
          className="absolute right-[-10%] bottom-[-15%] h-[85rem] w-[85rem] rounded-full bg-gradient-to-bl from-fuchsia-500/30 to-purple-500/25 blur-3xl animate-soft-blink"
        />
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
