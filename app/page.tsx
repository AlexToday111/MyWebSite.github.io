"use client";

import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import { withBasePath } from "@/lib/paths";
import AuroraBackground from "@/components/AuroraBackground";
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
    <main className="relative min-h-[100svh] overflow-visible">
      {/* Start */}
      <section id="intro" className="min-h-[100svh] grid place-items-center relative">
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

    </main>
  );
}
