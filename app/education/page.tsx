import { education } from "@/data/education";

export default function EducationPage() {
  return (
    <main className="container py-16">
      <h1 className="text-3xl sm:text-4xl font-bold">Образование</h1>
      <ul className="mt-6 space-y-4">
        {education.map((e) => (
          <li key={e.title} className="rounded-2xl border border-white/10 bg-card/60 p-4">
            <div className="flex flex-col sm:flex-row sm:items-baseline sm:justify-between gap-2">
              <div>
                <h3 className="text-lg font-semibold">{e.title}</h3>
                <p className="text-muted">{e.place}</p>
              </div>
              <div className="text-sm text-muted whitespace-nowrap">{e.from}–{e.to}</div>
            </div>
            <p className="mt-2 text-sm text-muted">{e.description}</p>
            {e.link && (
              <a className="mt-3 inline-block text-sm text-[hsl(var(--accent-blue))] hover:underline" href={e.link} target="_blank" rel="noreferrer">
                Подробнее
              </a>
            )}
          </li>
        ))}
      </ul>
    </main>
  );
}


