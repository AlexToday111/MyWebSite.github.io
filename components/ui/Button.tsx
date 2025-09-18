import { clsx } from "clsx";
import type { ButtonHTMLAttributes } from "react";

type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: "primary" | "ghost";
  size?: "sm" | "md";
};

export function Button({ className, variant = "primary", size = "md", ...props }: ButtonProps) {
  return (
    <button
      className={clsx(
        "inline-flex items-center justify-center rounded-xl font-medium transition shadow-soft",
        size === "sm" ? "px-3 py-1.5 text-sm" : "px-4 py-2 text-sm",
        variant === "primary"
          ? "bg-[hsl(var(--accent-green))]/90 text-black hover:bg-[hsl(var(--accent-green))]"
          : "border border-white/10 bg-card/60 hover:border-white/20",
        className
      )}
      {...props}
    />
  );
}


