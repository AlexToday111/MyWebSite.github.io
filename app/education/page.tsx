import { education } from "@/data/education";

export default function EducationPage() {
  return (
    <main className="container py-8 sm:py-12 md:py-16 reveal">
      <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold">Образование</h1>
      <ul className="mt-4 sm:mt-6 space-y-3 sm:space-y-4 reveal-grid">
        {education.map((e) => (
          <li key={e.title} className="rounded-2xl border border-white/10 bg-card/60 p-3 sm:p-4">
            <div className="flex flex-col sm:flex-row sm:items-baseline sm:justify-between gap-2">
              <div>
                <h3 className="text-base sm:text-lg font-semibold">{e.title}</h3>
                <p className="text-xs sm:text-sm text-muted">{e.place}</p>
              </div>
              <div className="text-xs sm:text-sm text-muted sm:whitespace-nowrap">{e.from}–{e.to}</div>
            </div>
            <p className="mt-2 text-xs sm:text-sm text-muted">{e.description}</p>
            {e.link && (
              <a className="mt-2 sm:mt-3 inline-block text-xs sm:text-sm text-[hsl(var(--accent-blue))] hover:underline" href={e.link} target="_blank" rel="noreferrer">
                Подробнее
              </a>
            )}
          </li>
        ))}
      </ul>
    </main>
  );
}
