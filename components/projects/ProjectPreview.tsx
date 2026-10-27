"use client";

import type { Project } from "@/data/projects";
import type { CSSProperties } from "react";
import {
  projectDescriptionsEn,
  projectHighlights,
} from "@/data/project-language";
import { projectLogoPresentation } from "@/data/project-logo-presentation";
import { withBasePath } from "@/lib/paths";
import { usePortfolioLanguage } from "../providers/PortfolioLanguage";
import ProjectToolIcons from "./ProjectToolIcons";

export default function ProjectPreview({ project }: { project: Project }) {
  const { language } = usePortfolioLanguage();
  const logo = projectLogoPresentation[project.title];
  const highlight = projectHighlights[project.title]?.[language];
  return (
    <article className="project-preview">
      <div className="project-artwork">
        <div
          className="project-artwork-image"
          style={
            logo
              ? ({
                  "--logo-width": `${logo.maxWidth}px`,
                  "--logo-height": `${logo.height}px`,
                  "--logo-scale": logo.scale ?? 1,
                } as CSSProperties)
              : undefined
          }
        >
          <img
            src={withBasePath(project.logo ?? project.image)}
            alt=""
            data-logo-tone={project.logoTone}
            loading="lazy"
            width={320}
            height={176}
            draggable={false}
          />
        </div>
      </div>
      <div className="project-copy">
        <h4>{project.title}</h4>
        <p>
          {language === "en"
            ? (projectDescriptionsEn[project.title] ?? project.description)
            : project.description}
        </p>
        {highlight && <p className="project-highlight">{highlight}</p>}
        <ProjectToolIcons stack={project.stack} />
        {project.links && (
          <div className="project-actions">
            {project.links.repo && (
              <a
                href={project.links.repo}
                target="_blank"
                rel="noreferrer"
                aria-label={`${project.title}: GitHub`}
              >
                <img
                  src={withBasePath("/icons/stack/github.svg")}
                  alt=""
                  width={16}
                  height={16}
                  className="project-source-icon"
                />
                GitHub
              </a>
            )}
            {project.links.demo && (
              <a href={project.links.demo} target="_blank" rel="noreferrer">
                {language === "en" ? "Live demo" : "Демо"}{" "}
                <span aria-hidden="true">↗</span>
              </a>
            )}
          </div>
        )}
      </div>
    </article>
  );
}
