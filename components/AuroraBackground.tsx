"use client";

import { motion } from "framer-motion";

export default function AuroraBackground() {
  return (
    <motion.div 
      aria-hidden 
      className="intro-ambient pointer-events-none absolute inset-0 -z-10"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 1.5, ease: [0.22, 1, 0.36, 1] }}
      style={{ willChange: 'opacity' }}
    >
      {/* Right glow: neon violet - более видимый */}
      {/* Размер можно изменить здесь: h-[46rem] w-[46rem] - это размер круга */}
      <div className="absolute right-[-10%] top-[5%] animate-orb-1" style={{ willChange: 'transform' }}>
        <div className="h-[46rem] w-[46rem] rounded-full bg-gradient-to-br from-violet-500 via-fuchsia-500 to-purple-400 opacity-45 blur-3xl animate-soft-blink" style={{ willChange: 'opacity' }} />
      </div>
      {/* Left semi-circle: purple accent - более видимый */}
      {/* Размер можно изменить здесь: h-[36rem] w-[36rem] */}
      <div className="absolute left-[-5%] top-[5%] animate-orb-2" style={{ willChange: 'transform' }}>
        <div className="h-[64rem] w-[64rem] rounded-r-full bg-gradient-to-tr from-violet-500/55 to-fuchsia-500/45 opacity-45 blur-3xl animate-soft-blink" style={{ willChange: 'opacity' }} />
      </div>
      {/* Bottom-left glow - более видимый */}
      {/* Размер можно изменить здесь: h-[38rem] w-[38rem] */}
      <div className="absolute left-[-5%] bottom-[5%] animate-orb-2" style={{ willChange: 'transform' }}>
        <div className="h-[38rem] w-[38rem] rounded-full bg-gradient-to-tr from-indigo-400/50 to-violet-400/45 opacity-40 blur-3xl animate-soft-blink" style={{ willChange: 'opacity' }} />
      </div>
      {/* Bottom-right glow - более видимый */}
      {/* Размер можно изменить здесь: h-[32rem] w-[32rem] */}
      <div className="absolute right-[-5%] bottom-[5%] animate-orb-1" style={{ willChange: 'transform' }}>
        <div className="h-[64rem] w-[64rem] rounded-full bg-gradient-to-bl from-fuchsia-400/50 to-purple-400/45 opacity-40 blur-3xl animate-soft-blink" style={{ willChange: 'opacity' }} />
      </div>
    </motion.div>
  );
}
