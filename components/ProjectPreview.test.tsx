// @vitest-environment jsdom
import { cleanup, fireEvent, render } from "@testing-library/react";
import { afterEach, beforeEach, expect, it } from "vitest";
import { PortfolioLanguage, usePortfolioLanguage } from "./PortfolioLanguage";
import ProjectPreview from "./ProjectPreview";
import { projects } from "@/data/projects";

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
    expect(cards.length).toBe(16);
    for (const [index, card] of Array.from(cards).entries()) {
      const project = projects[index];
      expect(
        card.querySelector(".project-artwork img")?.getAttribute("src"),
      ).toBe(project.logo);
      expect(card.querySelectorAll(".project-tool").length).toBe(
        project.stack.length,
      );
      const link = card.querySelector(".project-actions a");
      expect(link?.getAttribute("href")).toBe(project.links?.repo);
      expect(link?.textContent).toContain(
        language === "en" ? "Source code" : "Исходный код",
      );
      expect(
        card.querySelector(".project-highlight")?.textContent?.length,
      ).toBeGreaterThan(0);
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
