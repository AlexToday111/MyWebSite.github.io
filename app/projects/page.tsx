"use client";

import { useMemo, useState } from "react";
import { projectCategories, projects } from "@/data/projects";
import { projectCategoryLabels } from "@/data/project-language";
import ProjectPreview from "@/components/ProjectPreview";
import { usePortfolioLanguage } from "@/components/PortfolioLanguage";

export default function ProjectsPage() {
  const [active, setActive] = useState<string | null>(null);
  const { language, toggleLanguage } = usePortfolioLanguage();
  const tags = useMemo(
    () => Array.from(new Set(projects.flatMap((p) => p.stack))).sort(),
    [],
  );
  const sorted = useMemo(() => {
    const list = [...projects].sort((a, b) => {
      const categoryDiff =
        projectCategories.indexOf(a.category) -
        projectCategories.indexOf(b.category);
      return categoryDiff || Number(b.featured ?? 0) - Number(a.featured ?? 0);
    });
    return active ? list.filter((p) => p.stack.includes(active)) : list;
  }, [active]);

  return (
    <main id="projects-page" className="project-gallery" lang={language}>
      <header className="project-gallery-heading">
        <h1>{language === "en" ? "Projects" : "Проекты"}</h1>
        <button
          type="button"
          className="project-filter"
          onClick={toggleLanguage}
          aria-label={
            language === "en" ? "Переключить на русский" : "Switch to English"
          }
        >
          EN / RU
        </button>
      </header>
      <div
        className="project-filters"
        aria-label={
          language === "en" ? "Filter by technology" : "Фильтр по технологии"
        }
      >
        {[null, ...tags].map((tag) => (
          <button
            key={tag ?? "all"}
            type="button"
            className="project-filter"
            aria-pressed={active === tag}
            onClick={() => setActive(tag)}
          >
            {tag ?? (language === "en" ? "All" : "Все")}
          </button>
        ))}
      </div>
      <div className="project-grid project-page-grid">
        {sorted.map((project) => (
          <div key={project.title} className="project-page-item">
            <p className="project-category-label">
              {projectCategoryLabels[language][project.category]}
            </p>
            <ProjectPreview project={project} />
          </div>
        ))}
      </div>
    </main>
  );
}
