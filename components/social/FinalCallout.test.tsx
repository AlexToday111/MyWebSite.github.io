// @vitest-environment jsdom
import { cleanup, render } from "@testing-library/react";
import { afterEach, expect, it, vi } from "vitest";
import { profile } from "@/data/profile";
import FinalCallout from "./FinalCallout";

const state = vi.hoisted(() => ({ language: "ru" }));
vi.mock("../providers/PortfolioLanguage", () => ({
  usePortfolioLanguage: () => state,
}));
afterEach(cleanup);

it("keeps four complete profile links and original icons without subtitles or arrows in either language", () => {
  for (const language of ["ru", "en"]) {
    state.language = language;
    const view = render(<FinalCallout />);
    expect(
      view.getByRole("heading", {
        name:
          language === "ru" ? "Мои социальные профили" : "My social profiles",
      }),
    ).toBeTruthy();
    expect(view.getAllByRole("link")).toHaveLength(4);
    for (const [name, url] of [
      ["Telegram", profile.links.telegram],
      ["GitHub", profile.links.github],
      ["LeetCode", profile.links.leetcode],
      ["LinkedIn", profile.links.linkedin],
    ]) {
      const link = view.getByRole("link", { name });
      expect(link.getAttribute("href")).toBe(url);
      expect(link.getAttribute("target")).toBe("_blank");
      expect(link.textContent).toBe(name);
      if (name === "LeetCode") {
        expect(
          link
            .querySelector(".contact-social-icon > span")
            ?.getAttribute("style"),
        ).toContain("/icons/social/leetcode.svg");
        expect(link.querySelectorAll("svg")).toHaveLength(0);
      } else {
        expect(link.querySelectorAll("svg")).toHaveLength(1);
        expect(link.querySelector("svg")?.getAttribute("fill")).toBe(
          "currentColor",
        );
      }
    }
    expect(
      view.getByText(
        language === "ru"
          ? "Буду рад стать частью вашей команды!"
          : "I'd be glad to join your team!",
      ),
    ).toBeTruthy();
    expect(view.container.textContent).not.toContain("54.7431");
    expect(view.container.querySelector(".contact-location")).toBeNull();
    view.unmount();
  }
});
