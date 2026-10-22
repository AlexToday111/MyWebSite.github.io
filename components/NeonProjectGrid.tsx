"use client";

import { projectCategories, projects } from "@/data/projects";
import { projectCategoryLabels } from "@/data/project-language";
import { usePortfolioLanguage } from "./PortfolioLanguage";
import ProjectCarousel from "./ProjectCarousel";

export default function NeonProjectGrid() {
  const { language } = usePortfolioLanguage();
  return (
    <div className="project-gallery" lang={language}>
      <header className="project-gallery-heading project-section-heading">
        <h2>{language === "en" ? "Projects" : "Проекты"}</h2>
      </header>
      {projectCategories.map((category, index) => (
        <ProjectCarousel
          key={category}
          id={`project-category-${index}`}
          title={projectCategoryLabels[language][category]}
          projects={projects.filter((project) => project.category === category)}
        />
      ))}
    </div>
  );
}
