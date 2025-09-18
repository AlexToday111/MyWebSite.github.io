export default function AuroraBackground() {
  return (
    <div aria-hidden className="pointer-events-none absolute inset-0 -z-10">
      {/* Right glow: orbiting softly */}
      <div className="absolute right-[-20%] top-[5%] h-[46rem] w-[46rem] rounded-full bg-gradient-to-br from-amber-500 via-orange-500 to-rose-400 opacity-30 blur-3xl animate-orb-1" />
      {/* Left semi-circle: orbit along left edge */}
      <div className="absolute left-0 top-[18%] h-[36rem] w-[36rem] -translate-x-1/2 rounded-r-full bg-gradient-to-tr from-teal-400/50 to-emerald-400/40 opacity-30 blur-3xl animate-orb-2" />
      {/* Bottom-left glow: balance lower area */}
      <div className="absolute left-[-15%] bottom-[-10%] h-[38rem] w-[38rem] rounded-full bg-gradient-to-tr from-sky-400/40 to-indigo-400/35 opacity-25 blur-3xl animate-orb-2" />
      {/* Bottom-right glow: balance lower area */}
      <div className="absolute right-[-12%] bottom-[-8%] h-[32rem] w-[32rem] rounded-full bg-gradient-to-bl from-emerald-400/40 to-teal-400/35 opacity-25 blur-3xl animate-orb-1" />
    </div>
  );
}

