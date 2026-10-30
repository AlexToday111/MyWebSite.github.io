"use client";

import { useId, useState } from "react";
import { motion, useReducedMotion } from "framer-motion";
import type { Project } from "@/data/projects";
import { usePortfolioLanguage } from "../providers/PortfolioLanguage";
import ProjectPreview from "./ProjectPreview";
import styles from "./ProjectGrid.module.css";

export default function ProjectGrid({ projects }: { projects: Project[] }) {
  const [expanded, setExpanded] = useState(false);
  const { language } = usePortfolioLanguage();
  const gridId = useId();
  const reducedMotion = useReducedMotion();

  return (
    <>
      <div id={gridId}>
        <div className="project-grid">
          {projects.slice(0, 4).map((project) => (
            <ProjectPreview key={project.title} project={project} />
          ))}
        </div>
        {expanded && (
          <motion.div
            initial={reducedMotion ? false : { height: 0, opacity: 0 }}
            animate={{
              height: "auto",
              opacity: 1,
              transitionEnd: { overflow: "visible" },
            }}
            transition={{
              height: {
                duration: reducedMotion ? 0 : 0.48,
                ease: [0.22, 1, 0.36, 1],
              },
              opacity: { duration: reducedMotion ? 0 : 0.3 },
            }}
            style={{ overflow: "hidden" }}
          >
            <div className={`project-grid ${styles.extraGrid}`}>
              {projects.slice(4).map((project) => (
                <ProjectPreview key={project.title} project={project} />
              ))}
            </div>
          </motion.div>
        )}
      </div>
      {projects.length > 4 && (
        <motion.div
          key="show-more"
          className={styles.more}
          initial={false}
          animate={
            expanded
              ? {
                  height: 0,
                  opacity: 0,
                  marginTop: 0,
                  overflow: "hidden",
                  transitionEnd: { visibility: "hidden" },
                }
              : {
                  height: "auto",
                  opacity: 1,
                  marginTop: 28,
                  overflow: "visible",
                  visibility: "visible",
                }
          }
          transition={{
            duration: reducedMotion ? 0 : 0.25,
            ease: "easeInOut",
          }}
          aria-hidden={expanded}
        >
          <button
            type="button"
            className={styles.button}
            aria-controls={gridId}
            aria-expanded={expanded}
            disabled={expanded}
            onClick={() => setExpanded(true)}
          >
            <span>{language === "ru" ? "Показать ещё" : "Show more"}</span>
          </button>
        </motion.div>
      )}
    </>
  );
}
