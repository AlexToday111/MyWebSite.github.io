// @vitest-environment jsdom
import { cleanup, fireEvent, render } from "@testing-library/react";
import { afterEach, beforeEach, expect, it } from "vitest";
import {
  PortfolioLanguage,
  usePortfolioLanguage,
} from "../providers/PortfolioLanguage";
import ProjectPreview from "./ProjectPreview";
import { projects } from "@/data/projects";
import { projectHighlights } from "@/data/project-language";

function LanguageSwitch() {
  const { toggleLanguage } = usePortfolioLanguage();
  return <button onClick={toggleLanguage}>Switch language</button>;
}
beforeEach(() => localStorage.clear());
afterEach(cleanup);

it("keeps every project logo, full stack and repository while switching editorial text", () => {
  const view = render(
    <PortfolioLanguage>
      <LanguageSwitch />
      {projects.map((project) => (
        <ProjectPreview key={project.title} project={project} />
      ))}
    </PortfolioLanguage>,
  );
  const inspect = (language: "en" | "ru") => {
    const cards = view.container.querySelectorAll(".project-preview");
    expect(cards.length).toBe(projects.length);
    for (const [index, card] of Array.from(cards).entries()) {
      const project = projects[index];
      expect(
        card.querySelector(".project-artwork img")?.getAttribute("src"),
      ).toBe(project.logo ?? project.image);
      expect(card.querySelectorAll(".project-tool").length).toBe(
        project.stack.length,
      );
      const link = card.querySelector(".project-actions a");
      expect(link?.getAttribute("href")).toBe(project.links?.repo);
      expect(link?.textContent).toBe("GitHub");
      expect(link?.getAttribute("aria-label")).toBe(`${project.title}: GitHub`);
      expect(card.querySelector(".project-highlight")?.textContent).toBe(
        projectHighlights[project.title]?.[language],
      );
      if (language === "ru")
        expect(card.querySelector(".project-copy > p")?.textContent).toBe(
          project.description,
        );
      else
        expect(
          card.querySelector(".project-copy > p")?.textContent,
        ).not.toMatch(/[А-Яа-яЁё]/);
    }
  };
  inspect("en");
  fireEvent.click(view.getByText("Switch language"));
  inspect("ru");
  fireEvent.click(view.getByText("Switch language"));
  inspect("en");
});
