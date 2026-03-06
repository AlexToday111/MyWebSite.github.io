"use client";

import Image from "next/image";
import { useState } from "react";
import { withBasePath } from "@/lib/paths";
import { ChevronLeft, ChevronRight, RefreshCw, Workflow, KanbanSquare } from "lucide-react";

const PRIMARY = [
  { name: "Java", src: "/icons/java-original-8x.png", level: 5 },
  { name: "Spring", src: "/icons/spring-original-8x.png", level: 4 },
  { name: "Git", src: "/icons/git-icon-8x.png", level: 4 },
] as const;

const SECONDARY = [
  { name: "Kafka", src: "/icons/kafka.png" },
  { name: "Redis", src: "/icons/redis-original-8x.png" },
  { name: "Hibernate", src: "/icons/hibernate-8x.png" },
  { name: "JUnit", src: "/icons/junit-plain-8x.png" },
  { name: "Python", src: "/icons/python-8x.png" },
  { name: "C++", src: "/icons/c-plusplus-8x.png" },
];

const STACK_CAROUSEL = [...PRIMARY, ...SECONDARY];

export default function StackSection() {
  const [start, setStart] = useState(0);
  const visibleCount = 5;
  const total = STACK_CAROUSEL.length;
  const visible = Array.from({ length: visibleCount }, (_, i) => STACK_CAROUSEL[(start + i) % total]);

  return (
    <section id="stack" className="container relative py-12 sm:py-14 md:py-16 text-[#b48eeb]">
      <div className="pointer-events-none absolute right-0 bottom-0 reveal">
        <img
          src={withBasePath("/gifs/star.gif")}
          alt="About gif"
          className="h-64 w-64 sm:h-80 sm:w-80 md:h-96 md:w-96 rounded-2xl object-cover"
        />
      </div>

      <div className="relative max-w-5xl text-center">
        <div className="reveal text-[3rem] sm:text-[3.6rem] md:text-[4.3rem] font-extrabold tracking-tight [font-family:var(--ff-exotica)] leading-none text-[#b48eeb]">
          Technical Stack
        </div>

        <div className="relative mt-7 pr-24 sm:pr-28 md:pr-36">
          <div
            className="reveal relative rounded-3xl border border-white/10 bg-card/70 p-7 sm:p-9"
            style={{ boxShadow: "0 0 0 1px rgba(180,142,235,0.35) inset, 0 0 28px rgba(180,142,235,0.25)" }}
          >
            <div className="flex items-center justify-center gap-4">
              <button
                type="button"
                aria-label="Previous stack items"
                className="grid h-[68px] w-[68px] place-items-center rounded-full border border-white/10 bg-white/5 text-[#b48eeb]/70 transition hover:bg-[rgba(180,142,236,0.18)] hover:text-[#b48eeb] hover:shadow-[0_0_22px_rgba(180,142,236,0.5)]"
                onClick={() => setStart((prev) => (prev - 1 + total) % total)}
              >
                <ChevronLeft className="h-8 w-8" />
              </button>

              <div className="flex-1 overflow-hidden">
                <div className="reveal-grid flex items-center justify-center gap-6 sm:gap-7">
                  {visible.map((p) => (
                    <div
                      key={p.name}
                      className="grid h-[86px] w-[86px] sm:h-[106px] sm:w-[106px] place-items-center rounded-2xl border border-white/10 bg-white/5"
                    >
                      <Image
                        src={withBasePath(p.src)}
                        alt={p.name}
                        width={48}
                        height={48}
                        className="h-[52px] w-[52px] sm:h-[58px] sm:w-[58px]"
                        draggable={false}
                      />
                    </div>
                  ))}
                </div>
              </div>

              <button
                type="button"
                aria-label="Next stack items"
                className="grid h-[68px] w-[68px] place-items-center rounded-full border border-white/10 bg-white/5 text-[#b48eeb]/70 transition hover:bg-[rgba(180,142,236,0.18)] hover:text-[#b48eeb] hover:shadow-[0_0_22px_rgba(180,142,236,0.5)]"
                onClick={() => setStart((prev) => (prev + 1) % total)}
              >
                <ChevronRight className="h-8 w-8" />
              </button>
            </div>
          </div>
        </div>

      </div>

      <div className="mt-8 max-w-3xl space-y-5 reveal-grid text-left">
        <div
          className="relative rounded-3xl border border-white/10 bg-card/90 p-5 sm:p-7"
          style={{ boxShadow: "0 0 0 1px rgba(180,142,235,0.35) inset, 0 0 24px rgba(180,142,235,0.22)" }}
        >
          <div className="text-xs sm:text-sm text-[#b48eeb]/60">Education</div>
          <div className="mt-2 text-base sm:text-lg font-semibold text-[#b48eeb]">Innopolis University</div>
          <div className="text-xs sm:text-sm text-[#b48eeb]/60">2024–2028</div>
        </div>

        <div
          className="relative rounded-3xl border border-white/10 bg-card/90 p-5 sm:p-7"
          style={{ boxShadow: "0 0 0 1px rgba(180,142,235,0.35) inset, 0 0 24px rgba(180,142,235,0.22)" }}
        >
          <div className="text-xs sm:text-sm text-[#b48eeb]/60">Language and process proficiency</div>
          <div className="mt-2 text-sm sm:text-base text-[#b48eeb]/85 space-y-1">
            <div>English — B2</div>
            <div>Russian — native</div>
          </div>
          <div className="mt-4 flex flex-wrap gap-2 sm:gap-3">
            <span className="inline-flex items-center gap-1.5 rounded-full border border-white/10 bg-white/5 px-3 py-1.5 text-xs sm:text-sm text-[#b48eeb]/85">
              <RefreshCw className="h-4 w-4 text-[hsl(var(--accent-purple))]" aria-hidden />
              Scrum
            </span>
            <span className="inline-flex items-center gap-1.5 rounded-full border border-white/10 bg-white/5 px-3 py-1.5 text-xs sm:text-sm text-[#b48eeb]/85">
              <Workflow className="h-4 w-4 text-[hsl(var(--accent-purple))]" aria-hidden />
              Agile
            </span>
            <span className="inline-flex items-center gap-1.5 rounded-full border border-white/10 bg-white/5 px-3 py-1.5 text-xs sm:text-sm text-[#b48eeb]/85">
              <KanbanSquare className="h-4 w-4 text-[hsl(var(--accent-purple))]" aria-hidden />
              Kanban
            </span>
          </div>
        </div>
      </div>
    </section>
  );
}
