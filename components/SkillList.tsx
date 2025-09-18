import { ReactNode } from "react";
import {
  Braces,
  Code2,
  Database,
  GitBranch,
  Leaf,
  Container,
  MessagesSquare,
  Sigma,
  FileSpreadsheet,
  Presentation,
  Cpu,
  Brain,
  TestTube,
  Cog,
  Boxes,
  Dot,
} from "lucide-react";

function iconFor(label: string): ReactNode {
  const l = label.toLowerCase();
  if (l.includes("java")) return <Braces className="h-5 w-5" />;
  if (l.includes("python")) return <Code2 className="h-5 w-5" />;
  if (l.includes("c++") || l.includes("c++")) return <Braces className="h-5 w-5" />;
  if (l.includes("spring")) return <Leaf className="h-5 w-5" />;
  if (l.includes("sql") || l.includes("postgres")) return <Database className="h-5 w-5" />;
  if (l.includes("git")) return <GitBranch className="h-5 w-5" />;
  if (l.includes("docker")) return <Container className="h-5 w-5" />;
  if (l.includes("kubernetes")) return <Boxes className="h-5 w-5" />;
  if (l.includes("redis")) return <Database className="h-5 w-5" />;
  if (l.includes("rabbit")) return <MessagesSquare className="h-5 w-5" />;
  if (l.includes("latex")) return <Sigma className="h-5 w-5" />;
  if (l.includes("excel")) return <FileSpreadsheet className="h-5 w-5" />;
  if (l.includes("powerpoint")) return <Presentation className="h-5 w-5" />;
  if (l.includes("solid")) return <Cog className="h-5 w-5" />;
  if (l.includes("concurrency") || l.includes("паралл") || l.includes("многопот")) return <Cpu className="h-5 w-5" />;
  if (l.includes("jvm") || l.includes("виртуал") || l.includes("память")) return <Brain className="h-5 w-5" />;
  if (l.includes("test") || l.includes("junit") || l.includes("mockito") || l.includes("tdd")) return <TestTube className="h-5 w-5" />;
  return <Dot className="h-5 w-5" />;
}

export default function SkillList({ items }: { items: string[] }) {
  return (
    <ul className="mt-4 grid gap-3">
      {items.map((i) => (
        <li key={i} className="flex items-start gap-3 text-[16px] sm:text-[17px] leading-relaxed text-[hsl(var(--fg))]/90">
          <span className="mt-0.5 inline-flex h-9 w-9 items-center justify-center rounded-full border border-[hsl(var(--fg))]/10 bg-[hsl(var(--fg))]/5 text-[hsl(var(--fg))]/80">
            {iconFor(i)}
          </span>
          <span>{i}</span>
        </li>
      ))}
    </ul>
  );
}

