import { clsx } from "clsx";
import { HTMLAttributes } from "react";

type GlassCardProps = HTMLAttributes<HTMLDivElement> & {
  hover?: boolean;
};

export default function GlassCard({ className, hover = true, ...rest }: GlassCardProps) {
  return (
    <div
      {...rest}
      className={clsx(
        "rounded-2xl border border-white/10 bg-white/5 backdrop-blur-xl shadow-[0_0_60px_rgba(168,85,247,.10)]",
        hover && "transition will-change-transform hover:-translate-y-0.5 hover:ring-1 hover:ring-violet-400/25",
        className
      )}
    />
  );
}

