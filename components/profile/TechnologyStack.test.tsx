// @vitest-environment jsdom
import { cleanup, fireEvent, render, within } from "@testing-library/react";
import { afterEach, describe, expect, it } from "vitest";
import { profileContent } from "@/data/profile-language";
import TechnologyStack from "./TechnologyStack";

afterEach(cleanup);

describe("technology stack", () => {
  it("keeps all six categories and primary technologies visible while additional lists are hidden", () => {
    const groups = profileContent.en.toolbox;
    const view = render(<TechnologyStack groups={groups} language="en" />);
    expect(view.getAllByRole("term").map((term) => term.textContent)).toEqual([
      "Languages",
      "Backend & API",
      "Databases",
      "Messaging & Streaming",
      "DevOps & Infrastructure",
      "Observability & Testing",
    ]);
    expect(view.getAllByRole("list")).toHaveLength(6);
    groups.forEach((group, index) => {
      const category = within(view.getAllByRole("definition")[index]);
      expect(
        category.getAllByRole("listitem").map((item) => item.textContent),
      ).toEqual(group.primary);
      expect(category.getAllByRole("list", { hidden: true })).toHaveLength(2);
    });
    expect(
      view
        .getByRole("button", { name: "Show full stack" })
        .getAttribute("aria-expanded"),
    ).toBe("false");
  });

  it("expands and collapses within each category and preserves focus on the native disclosure button", () => {
    const groups = profileContent.ru.toolbox;
    const view = render(<TechnologyStack groups={groups} language="ru" />);
    const button = view.getByRole("button", { name: "Показать полный стек" });
    expect(button.tagName).toBe("BUTTON");
    expect(button.getAttribute("type")).toBe("button");
    expect(
      document.getElementById(button.getAttribute("aria-controls")!)?.tagName,
    ).toBe("DL");
    button.focus();
    fireEvent.click(button);
    expect(view.getByRole("button", { name: "Свернуть стек" })).toBe(button);
    expect(button.getAttribute("aria-expanded")).toBe("true");
    groups.forEach((group, index) => {
      expect(
        within(view.getAllByRole("definition")[index])
          .getAllByRole("listitem")
          .map((item) => item.textContent),
      ).toEqual([...group.primary, ...group.additional]);
    });
    expect(document.activeElement).toBe(button);
    fireEvent.click(button);
    expect(button.getAttribute("aria-expanded")).toBe("false");
    expect(view.getAllByRole("list")).toHaveLength(6);
    expect(document.activeElement).toBe(button);
  });
});
