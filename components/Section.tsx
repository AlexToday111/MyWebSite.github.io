import { ReactNode } from "react";

export default function Section({ id, title, subtitle, children }: { id: string; title: string; subtitle?: string; children: ReactNode }) {
  return (
    <section id={id} className="container py-14 sm:py-16">
      <div className="mb-6">
        <h2 className="text-2xl sm:text-3xl font-extrabold tracking-tight">{title}</h2>
        {subtitle && <p className="mt-2 text-sm text-white/70 max-w-2xl">{subtitle}</p>}
      </div>
      {children}
    </section>
  );
}


