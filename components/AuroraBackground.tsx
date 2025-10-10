export default function AuroraBackground() {
  return (
    <div aria-hidden className="pointer-events-none absolute inset-0 -z-10">
      {/* Right glow: neon violet */}
      <div className="absolute right-[-20%] top-[5%] h-[46rem] w-[46rem] rounded-full bg-gradient-to-br from-violet-500 via-fuchsia-500 to-purple-400 opacity-30 blur-3xl animate-orb-1" />
      {/* Left semi-circle: purple accent */}
      <div className="absolute left-0 top-[18%] h-[36rem] w-[36rem] -translate-x-1/2 rounded-r-full bg-gradient-to-tr from-violet-500/45 to-fuchsia-500/35 opacity-30 blur-3xl animate-orb-2" />
      {/* Bottom-left glow */}
      <div className="absolute left-[-15%] bottom-[-10%] h-[38rem] w-[38rem] rounded-full bg-gradient-to-tr from-indigo-400/40 to-violet-400/35 opacity-25 blur-3xl animate-orb-2" />
      {/* Bottom-right glow */}
      <div className="absolute right-[-12%] bottom-[-8%] h-[32rem] w-[32rem] rounded-full bg-gradient-to-bl from-fuchsia-400/40 to-purple-400/35 opacity-25 blur-3xl animate-orb-1" />
    </div>
  );
}
