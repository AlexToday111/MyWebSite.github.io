"use client";

import { useId, useState } from "react";
import type { Project } from "@/data/projects";
import { usePortfolioLanguage } from "../providers/PortfolioLanguage";
import ProjectPreview from "./ProjectPreview";
import styles from "./ProjectGrid.module.css";

export default function ProjectGrid({ projects }: { projects: Project[] }) {
  const [expanded, setExpanded] = useState(false);
  const { language } = usePortfolioLanguage();
  const gridId = useId();
  const visibleProjects = expanded ? projects : projects.slice(0, 4);

  return (
    <>
      <div id={gridId} className="project-grid">
        {visibleProjects.map((project) => (
          <ProjectPreview key={project.title} project={project} />
        ))}
      </div>
      {!expanded && projects.length > 4 && (
        <div className={styles.more}>
          <button
            type="button"
            className={styles.button}
            aria-controls={gridId}
            aria-expanded={false}
            onClick={() => setExpanded(true)}
          >
            <span>{language === "ru" ? "Показать ещё" : "Show more"}</span>
          </button>
        </div>
      )}
    </>
  );
}
