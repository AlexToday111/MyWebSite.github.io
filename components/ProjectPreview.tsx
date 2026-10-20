"use client";

import type { Project } from "@/data/projects";
import {
  projectDescriptionsEn,
  projectHighlights,
} from "@/data/project-language";
import { projectLogoPresentation } from "@/data/project-logo-presentation";
import { withBasePath } from "@/lib/paths";
import { usePortfolioLanguage } from "./PortfolioLanguage";
import ProjectToolIcons from "./ProjectToolIcons";

export default function ProjectPreview({ project }: { project: Project }) {
  const { language } = usePortfolioLanguage();
  const logo = projectLogoPresentation[project.title];
  const highlight = projectHighlights[project.title]?.[language];
  return (
    <article className="project-preview">
      <div className="project-artwork">
        <img
          src={withBasePath(project.logo ?? project.image)}
          alt={project.title}
          data-logo-tone={project.logoTone}
          loading="lazy"
          width={240}
          height={144}
          draggable={false}
          style={
            logo
              ? {
                  maxWidth: logo.maxWidth,
                  height: logo.height,
                  transform: logo.scale ? `scale(${logo.scale})` : undefined,
                }
              : undefined
          }
        />
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
                aria-label={`${project.title}: ${language === "en" ? "Source code on GitHub" : "Исходный код на GitHub"}`}
              >
                <img
                  src={withBasePath("/icons/stack/github.svg")}
                  alt=""
                  width={16}
                  height={16}
                  className="project-source-icon"
                />
                {language === "en" ? "Source code" : "Исходный код"}{" "}
                <span aria-hidden="true">↗</span>
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
