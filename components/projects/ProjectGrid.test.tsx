// @vitest-environment jsdom
import { cleanup, fireEvent, render, within } from "@testing-library/react";
import { afterEach, describe, expect, it, vi } from "vitest";
import NeonProjectGrid from "./NeonProjectGrid";
import ProjectGrid from "./ProjectGrid";
import { projects, projectCategories } from "@/data/projects";

vi.mock("../providers/PortfolioLanguage", () => ({
  usePortfolioLanguage: () => ({ language: "en" }),
}));
afterEach(cleanup);

describe("project grid", () => {
  it("shows four projects initially and reveals the rest on request in each category", () => {
    const view = render(<NeonProjectGrid />);
    const tabs = view.getAllByRole("tab");
    expect(tabs.map((tab) => tab.textContent)).toEqual([
      "Personal Projects",
      "University Projects",
      "Hackathon Projects",
      "AI & Bots",
    ]);
    tabs.forEach((tab, index) => {
      fireEvent.click(tab);
      const panel = view.getByRole("tabpanel");
      expect(panel.id).toBe(tab.getAttribute("aria-controls"));
      expect(panel.getAttribute("aria-labelledby")).toBe(tab.id);
      expect(
        within(panel)
          .getAllByRole("heading", { level: 4 })
          .map((h) => h.textContent),
      ).toEqual(
        projects
          .filter((p) => p.category === projectCategories[index])
          .slice(0, 4)
          .map((p) => p.title),
      );
      const categoryProjects = projects.filter(
        (p) => p.category === projectCategories[index],
      );
      if (categoryProjects.length > 4) {
        const more = within(panel).getByRole("button", { name: "Show more" });
        expect(
          document.getElementById(more.getAttribute("aria-controls")!)?.contains(panel.querySelector(".project-grid")),
        ).toBe(true);
        fireEvent.click(more);
        expect(
          within(panel)
            .getAllByRole("heading", { level: 4 })
            .map((h) => h.textContent),
        ).toEqual(categoryProjects.map((p) => p.title));
      }
      expect(within(panel).queryByRole("button")).toBeNull();
      expect(within(panel).queryByRole("heading", { level: 3 })).toBeNull();
      expect(
        view
          .getAllByRole("tab")
          .filter((tab) => tab.querySelector('[aria-hidden="true"]')),
      ).toEqual([tab]);
      expect(within(panel).queryByRole("status")).toBeNull();
      expect(
        panel.querySelector('[aria-roledescription="carousel"]'),
      ).toBeNull();
    });
    fireEvent.click(tabs[0]);
    expect(
      within(view.getByRole("tabpanel")).getAllByRole("article"),
    ).toHaveLength(projects.filter((p) => p.category === "pet").length);
    expect(view.queryByText("Commercial Experience")).toBeNull();
  });

  it("restores historical hackathons without duplicates and keeps all AI projects", () => {
    expect(
      projects.filter((p) => p.category === "hackathon").map((p) => p.title),
    ).toEqual(["PingTower", "DatsPulse"]);
    expect(
      projects.filter((p) => p.category === "ai-bots").map((p) => p.title),
    ).toEqual([
      "Trade360Lab",
      "Link2Action",
      "PortIQ",
      "Liftory",
      "Divergence Trading Bot",
    ]);
    expect(new Set(projects.map((p) => p.title)).size).toBe(projects.length);
    expect(new Set(projects.map((p) => p.links?.repo)).size).toBe(
      projects.length,
    );
  });

  it("supports arrow, Home and End tab keys with roving keyboard focus", () => {
    const view = render(<NeonProjectGrid />);
    const tabs = view.getAllByRole("tab");
    for (const [from, key, to] of [
      [0, "ArrowLeft", 3],
      [3, "ArrowRight", 0],
      [0, "End", 3],
      [3, "Home", 0],
    ] as const) {
      fireEvent.keyDown(tabs[from], { key });
      expect(document.activeElement).toBe(tabs[to]);
      expect(tabs[to].getAttribute("aria-selected")).toBe("true");
      expect(tabs.filter((tab) => tab.tabIndex === 0)).toHaveLength(1);
    }
  });

  it("renders a single-project category through the same grid", () => {
    const view = render(<ProjectGrid projects={[projects[0]]} />);
    expect(view.getAllByRole("article")).toHaveLength(1);
    expect(
      view.container.querySelector(".project-grid > .project-preview"),
    ).toBeTruthy();
    expect(view.queryByRole("button")).toBeNull();
  });
});
