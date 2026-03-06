"use client";

import Image from "next/image";
import { withBasePath } from "@/lib/paths";
import { useState, useEffect } from "react";

export default function HomePage() {
  const [time, setTime] = useState("");

  useEffect(() => {
    const update = () => {
      setTime(
        new Date().toLocaleTimeString("en-US", {
          hour: "2-digit",
          minute: "2-digit",
          hour12: true,
        })
      );
    };
    update();
    const interval = setInterval(update, 1000);
    return () => clearInterval(interval);
  }, []);

  return (
    <main className="relative min-h-[100svh] overflow-visible text-[#b48eec]">
      {/* Start */}
      <section id="intro" className="min-h-[100svh] grid place-items-center relative">
        <div className="relative w-full min-h-[100svh]">
          {/* Фоновое изображение под текстом с плавным затуханием снизу */}
          <div
            aria-hidden
            className="pointer-events-none absolute w-full max-w-[720px] sm:max-w-[960px] md:max-w-[1200px] lg:max-w-[1440px] aspect-square"
            style={{
              opacity: 0.2,
              transform: "translate(-50%, -50%) scale(1.2)",
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
          </div>

          <h1
            className="absolute bottom-5 left-3 sm:bottom-6 sm:left-6 z-10 text-[5.5rem] xs:text-[8.5rem] sm:text-[13.5rem] md:text-[20rem] lg:text-[24.5rem] font-extrabold tracking-tight [font-family:var(--ff-exotica)] select-none leading-none"
            style={{
              userSelect: "none",
              WebkitUserSelect: "none",
            }}
          >
            <span>ba</span>
            <span>6</span>
            <span>kir</span>
          </h1>

          <div className="pointer-events-none fixed left-[35%] top-6 text-[0.95rem] sm:text-lg tracking-[0.35em]">
            {time}
          </div>

          <span className="pointer-events-none fixed bottom-3 right-3 z-50 text-[0.95rem] sm:text-[1.05rem] tracking-[0.08em] drop-shadow-[0_2px_8px_rgba(0,0,0,0.55)] text-right leading-snug">
            Backend
            <br />
            Java Developer
          </span>
        </div>
      </section>

    </main>
  );
}
