import { clsx } from "clsx";

export function Card({ className, children }: { className?: string; children: React.ReactNode }) {
  return (
    <div className={clsx("rounded-2xl border border-white/10 bg-card/60 shadow-soft", className)}>
      {children}
    </div>
  );
}

export function CardContent({ className, children }: { className?: string; children: React.ReactNode }) {
  return <div className={clsx("p-4 md:p-6", className)}>{children}</div>;
}


