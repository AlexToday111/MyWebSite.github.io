import { clsx } from "clsx";

export default function GlowCard({
  title,
  text,
  glow = "violet",
  className,
}: {
  title: string;
  text: string;
  glow?: "violet" | "green" | "blue" | "amber";
  className?: string;
}) {
  const palettes: Record<string, string> = {
    violet: "from-fuchsia-500 via-violet-500 to-purple-400",
    green: "from-emerald-400 via-green-500 to-lime-300",
    blue: "from-sky-400 via-blue-500 to-cyan-400",
    amber: "from-rose-400 via-amber-500 to-pink-400",
  };
  const grad = palettes[glow] ?? palettes.violet;

  return (
    <article
      className={clsx(
        "relative overflow-hidden rounded-2xl border border-white/10 bg-card/80 p-5 shadow-[0_0_60px_rgba(147,51,234,.15)]",
        className
      )}
    >
      <div className="relative z-10">
        <h3 className="text-lg font-semibold">{title}</h3>
        <p className="mt-2 text-sm text-white/70">{text}</p>
      </div>
      {/* bottom glow */}
      <div className={clsx("pointer-events-none absolute -bottom-10 left-1/2 h-40 w-[140%] -translate-x-1/2 blur-2xl opacity-70",
        `bg-gradient-to-t ${grad}`)} />
    </article>
  );
}

