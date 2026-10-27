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
            {language === "ru" ? "Показать ещё" : "Show more"}
            <svg
              width="18"
              height="18"
              viewBox="0 0 24 24"
              fill="none"
              aria-hidden="true"
            >
              <path
                d="m6 9 6 6 6-6"
                stroke="currentColor"
                strokeWidth="1.7"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </button>
        </div>
      )}
    </>
  );
}
