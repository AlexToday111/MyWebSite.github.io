"use client";

import { useId, useRef, useState, type KeyboardEvent } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { projectCategories, projects } from "@/data/projects";
import { projectCategoryLabels } from "@/data/project-language";
import { usePortfolioLanguage } from "../providers/PortfolioLanguage";
import ProjectGrid from "./ProjectGrid";
import styles from "./ProjectTabs.module.css";

const categories = projectCategories.map((id) => ({
  id,
  projects: projects.filter((project) => project.category === id),
}));

export default function NeonProjectGrid({
  standalone = false,
}: {
  standalone?: boolean;
}) {
  const { language, toggleLanguage } = usePortfolioLanguage();
  const [active, setActive] = useState(0);
  const tabs = useRef<(HTMLButtonElement | null)[]>([]);
  const id = useId();
  const reducedMotion = useReducedMotion();
  const Heading = standalone ? "h1" : "h2";

  function onKeyDown(event: KeyboardEvent<HTMLButtonElement>, index: number) {
    let next: number;
    switch (event.key) {
      case "ArrowRight":
        next = (index + 1) % categories.length;
        break;
      case "ArrowLeft":
        next = (index - 1 + categories.length) % categories.length;
        break;
      case "Home":
        next = 0;
        break;
      case "End":
        next = categories.length - 1;
        break;
      default:
        return;
    }
    event.preventDefault();
    setActive(next);
    tabs.current[next]?.focus();
  }

  return (
    <div className="project-gallery" lang={language}>
      <header className="project-gallery-heading project-section-heading">
        <Heading>{language === "en" ? "Projects" : "Проекты"}</Heading>
        {standalone && (
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
        )}
      </header>
      <div
        role="tablist"
        aria-label={
          language === "en" ? "Project categories" : "Категории проектов"
        }
        className={styles.tabs}
      >
        {categories.map((category, index) => (
          <button
            key={category.id}
            ref={(element) => {
              tabs.current[index] = element;
            }}
            type="button"
            role="tab"
            id={`${id}-tab-${category.id}`}
            aria-controls={`${id}-panel-${category.id}`}
            aria-selected={active === index}
            tabIndex={active === index ? 0 : -1}
            onClick={() => setActive(index)}
            onKeyDown={(event) => onKeyDown(event, index)}
          >
            {projectCategoryLabels[language][category.id]}
            {active === index && (
              <motion.span
                aria-hidden="true"
                className={styles.indicator}
                layoutId={`${id}-active-tab`}
                initial={false}
                transition={{
                  layout: {
                    duration: reducedMotion ? 0 : 0.225,
                    ease: "easeInOut",
                  },
                }}
              />
            )}
          </button>
        ))}
      </div>
      <div className={styles.panels}>
        {categories.map((category, index) => (
          <div
            key={category.id}
            role="tabpanel"
            id={`${id}-panel-${category.id}`}
            aria-labelledby={`${id}-tab-${category.id}`}
            hidden={active !== index}
            tabIndex={0}
            className={styles.panel}
          >
            <ProjectGrid projects={category.projects} />
          </div>
        ))}
      </div>
    </div>
  );
}
