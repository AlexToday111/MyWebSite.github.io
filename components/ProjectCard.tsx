import Image from "next/image";
import GlassCard from "./GlassCard";

export default function ProjectCard({
  title,
  description,
  stack,
  results,
  repo,
  demo,
  image,
}: {
  title: string;
  description: string;
  stack: string[];
  results?: string[];
  repo?: string;
  demo?: string;
  image: string;
}) {
  return (
    <GlassCard className="p-3 group transition-all">
      <div className="overflow-hidden rounded-xl">
        <Image src={image} alt={title} width={800} height={500} className="h-44 w-full object-cover transition-transform duration-200 group-hover:scale-[1.03]" />
      </div>
      <div className="p-3">
        <h3 className="text-lg font-semibold">{title}</h3>
        <p className="mt-1 text-sm text-white/70">{description}</p>
        {results && results.length > 0 && (
          <ul className="mt-2 flex flex-wrap gap-2 text-xs text-amber-300/90">
            {results.map((r) => (
              <li key={r} className="rounded-md bg-amber-400/10 px-2 py-0.5">{r}</li>
            ))}
          </ul>
        )}
        <div className="mt-3 flex flex-wrap gap-2">
          {stack.map((s) => (
            <span key={s} className="rounded-md border border-white/10 bg-white/5 px-2 py-0.5 text-xs text-white/70 font-mono">{s}</span>
          ))}
        </div>
        <div className="mt-4 flex gap-3">
          {demo && (
            <a className="rounded-xl px-3 py-1.5 text-sm bg-amber-400/15 hover:bg-amber-400/25" href={demo} target="_blank" rel="noreferrer">Demo</a>
          )}
          {repo && (
            <a className="rounded-xl px-3 py-1.5 text-sm bg-teal-400/15 hover:bg-teal-400/25" href={repo} target="_blank" rel="noreferrer">Repo</a>
          )}
        </div>
      </div>
    </GlassCard>
  );
}


