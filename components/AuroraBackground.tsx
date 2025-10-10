export default function AuroraBackground() {
  return (
    <div aria-hidden className="pointer-events-none absolute inset-0 -z-10">
      {/* Right glow: neon violet */}
      <div className="absolute right-[-20%] top-[5%] animate-orb-1">
        <div className="h-[46rem] w-[46rem] rounded-full bg-gradient-to-br from-violet-500 via-fuchsia-500 to-purple-400 opacity-30 blur-3xl animate-soft-blink" />
      </div>
      {/* Left semi-circle: purple accent */}
      <div className="absolute left-0 top-[18%] -translate-x-1/2 animate-orb-2">
        <div className="h-[36rem] w-[36rem] rounded-r-full bg-gradient-to-tr from-violet-500/45 to-fuchsia-500/35 opacity-30 blur-3xl animate-soft-blink" />
      </div>
      {/* Bottom-left glow */}
      <div className="absolute left-[-15%] bottom-[-10%] animate-orb-2">
        <div className="h-[38rem] w-[38rem] rounded-full bg-gradient-to-tr from-indigo-400/40 to-violet-400/35 opacity-25 blur-3xl animate-soft-blink" />
      </div>
      {/* Bottom-right glow */}
      <div className="absolute right-[-12%] bottom-[-8%] animate-orb-1">
        <div className="h-[32rem] w-[32rem] rounded-full bg-gradient-to-bl from-fuchsia-400/40 to-purple-400/35 opacity-25 blur-3xl animate-soft-blink" />
      </div>
    </div>
  );
}
