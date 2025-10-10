import { ReactNode } from "react";
import BrandIcon from "./BrandIcon";
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
  if (l.includes("java")) return <BrandIcon src="/icons/openjdk.svg" color="#007396" size={20} />;
  if (l.includes("python")) return <BrandIcon src="/icons/python.svg" color="#3776AB" size={20} />;
  if (l.includes("c++") || l.includes("c++")) return <BrandIcon src="/icons/cplusplus.svg" color="#00599C" size={20} />;
  if (l.includes("spring")) return <BrandIcon src="/icons/spring.svg" color="#6DB33F" size={20} />;
  if (l.includes("sql") || l.includes("postgres")) return <Database className="h-5 w-5" />;
  if (l.includes("git")) return <BrandIcon src="/icons/git.svg" color="#F05032" size={20} />;
  if (l.includes("docker")) return <Container className="h-5 w-5" />;
  if (l.includes("kubernetes")) return <Boxes className="h-5 w-5" />;
  if (l.includes("redis")) return <BrandIcon src="/icons/redis.svg" color="#DC382D" size={20} />;
  if (l.includes("rabbit")) return <MessagesSquare className="h-5 w-5" />;
  if (l.includes("latex")) return <Sigma className="h-5 w-5" />;
  if (l.includes("excel")) return <FileSpreadsheet className="h-5 w-5" />;
  if (l.includes("powerpoint")) return <Presentation className="h-5 w-5" />;
  if (l.includes("solid")) return <Cog className="h-5 w-5" />;
  if (l.includes("concurrency") || l.includes("паралл") || l.includes("многопот")) return <Cpu className="h-5 w-5" />;
  if (l.includes("jvm") || l.includes("виртуал") || l.includes("память")) return <Brain className="h-5 w-5" />;
  if (l.includes("hibernate")) return <BrandIcon src="/icons/hibernate.svg" color="#59666C" size={20} />;
  if (l.includes("test") || l.includes("junit") || l.includes("mockito") || l.includes("tdd")) return <BrandIcon src="/icons/junit5.svg" color="#25A162" size={20} />;
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
