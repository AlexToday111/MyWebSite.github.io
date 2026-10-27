// @vitest-environment jsdom
import {
  act,
  cleanup,
  fireEvent,
  render,
  within,
} from "@testing-library/react";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import ProjectCarousel from "./ProjectCarousel";
import type { Project } from "@/data/projects";

vi.mock("../providers/PortfolioLanguage", () => ({
  usePortfolioLanguage: () => ({ language: "en" }),
}));
vi.mock("./ProjectPreview", () => ({
  default: ({ project }: { project: Project }) => (
    <article>{project.title}</article>
  ),
}));

const projects: Project[] = Array.from({ length: 8 }, (_, index) => ({
  title: `Project ${index + 1}`,
  description: "Description",
  category: "Pet Projects",
  stack: ["Go"],
  image: "/logo.svg",
}));
let observers: (() => void)[];
let visible: number;
let width: number;
let gap: number;
let reduced: boolean;
let scrollTo: ReturnType<typeof vi.fn>;

beforeEach(() => {
  observers = [];
  visible = 2;
  width = 1200;
  gap = 24;
  reduced = false;
  vi.stubGlobal(
    "ResizeObserver",
    class {
      constructor(callback: () => void) {
        observers.push(callback);
      }
      observe() {}
      disconnect() {}
    },
  );
  vi.stubGlobal("matchMedia", () => ({ matches: reduced }));
  const getStyle = window.getComputedStyle.bind(window);
  vi.spyOn(window, "getComputedStyle").mockImplementation((element) => {
    const style = getStyle(element);
    style.columnGap = `${gap}px`;
    return style;
  });
  vi.spyOn(HTMLElement.prototype, "clientWidth", "get").mockImplementation(
    () => width,
  );
  vi.spyOn(HTMLElement.prototype, "scrollWidth", "get").mockImplementation(
    function (this: HTMLElement) {
      const step = (width + gap) / visible;
      return this.childElementCount * step - gap;
    },
  );
  vi.spyOn(HTMLElement.prototype, "getBoundingClientRect").mockImplementation(
    () =>
      ({
        width: (width - (visible - 1) * gap) / visible,
      }) as DOMRect,
  );
  scrollTo = vi.fn(function (this: HTMLElement, options: ScrollToOptions) {
    this.scrollLeft = options.left ?? 0;
    this.dispatchEvent(new Event("scroll"));
  });
  Object.defineProperty(HTMLElement.prototype, "scrollTo", {
    configurable: true,
    value: scrollTo,
  });
});

afterEach(() => {
  cleanup();
  vi.restoreAllMocks();
  Reflect.deleteProperty(HTMLElement.prototype, "scrollTo");
  vi.unstubAllGlobals();
});

function setup(items = projects) {
  return render(
    <ProjectCarousel projects={items} title="Pet Projects" id="pet" />,
  );
}

describe("project carousel", () => {
  it.each([
    [1440, 1232, 2, 24],
    [1024, 976, 2, 24],
    [768, 720, 2, 24],
    [390, 358, 1, 20],
    [360, 328, 1, 20],
  ])(
    "uses measured card geometry for a %ipx viewport",
    (_viewport, contentWidth, count, cardGap) => {
      width = contentWidth;
      visible = count;
      gap = cardGap;
      const view = setup();
      fireEvent.click(view.getByRole("button", { name: /next/ }));
      expect(scrollTo).toHaveBeenLastCalledWith({
        left: (width + gap) / visible,
        behavior: "smooth",
      });
      expect(view.getByRole("status").textContent).toContain(
        count === 2 ? "2–3" : "2–2",
      );
      expect(
        view
          .getByText(count === 2 ? "02–03 / 08" : "02–02 / 08")
          .getAttribute("aria-hidden"),
      ).toBe("true");
    },
  );
  it("moves exactly one measured card including its gap and stops at both boundaries", () => {
    const view = setup();
    const previous = view.getByRole("button", {
      name: /previous/,
    }) as HTMLButtonElement;
    const next = view.getByRole("button", {
      name: /next/,
    }) as HTMLButtonElement;
    const track = view.getByRole("group", { name: "Pet Projects" });
    expect(previous.disabled).toBe(true);
    fireEvent.click(next);
    expect(scrollTo).toHaveBeenLastCalledWith({
      left: 612,
      behavior: "smooth",
    });
    // Rapid successive clicks must continue from the requested destination.
    for (let index = 0; index < 10; index++) fireEvent.click(next);
    expect(track.scrollLeft).toBe(3672);
    expect(next.disabled).toBe(true);
    expect(view.getByText("07–08 / 08")).toBeTruthy();
    for (let index = 0; index < 10; index++) fireEvent.click(previous);
    expect(track.scrollLeft).toBe(0);
    expect(previous.disabled).toBe(true);
    expect(view.getByText("01–02 / 08")).toBeTruthy();
  });

  it("keeps different categories independent", () => {
    const view = render(
      <>
        <ProjectCarousel projects={projects} title="Pet" id="pet" />
        <ProjectCarousel
          projects={projects.slice(0, 4)}
          title="University"
          id="university"
        />
      </>,
    );
    fireEvent.click(view.getByRole("button", { name: "Pet: next project" }));
    const tracks = view.container.querySelectorAll<HTMLElement>(
      '[aria-roledescription="carousel"]',
    );
    expect(tracks[0].scrollLeft).toBe(612);
    expect(tracks[1].scrollLeft).toBe(0);
  });

  it("hides unnecessary controls for two desktop cards, then enables them on mobile", () => {
    const view = setup(projects.slice(0, 2));
    expect(view.queryByRole("button")).toBeNull();
    expect(view.getByText("01–02 / 02").parentElement?.hidden).toBe(true);
    width = 358;
    gap = 20;
    visible = 1;
    act(() => observers.forEach((callback) => callback()));
    fireEvent.click(view.getByRole("button", { name: /next/ }));
    expect(scrollTo).toHaveBeenLastCalledWith({
      left: 378,
      behavior: "smooth",
    });
  });

  it("retains the current project on resize and completely reveals the final card", () => {
    const view = setup();
    const track = view.getByRole("group", { name: "Pet Projects" });
    fireEvent.click(view.getByRole("button", { name: /next/ }));
    fireEvent.click(view.getByRole("button", { name: /next/ }));
    width = 358;
    gap = 20;
    visible = 1;
    act(() => observers.forEach((callback) => callback()));
    expect(track.scrollLeft).toBe(756);
    fireEvent.keyDown(track, { key: "End" });
    expect(track.scrollLeft).toBe(2646);
    expect(
      (view.getByRole("button", { name: /next/ }) as HTMLButtonElement)
        .disabled,
    ).toBe(true);
    width = 976;
    gap = 24;
    visible = 2;
    act(() => observers.forEach((callback) => callback()));
    expect(track.scrollLeft).toBe(3000);
  });

  it("updates buttons after swipe or trackpad scrolling and supports keyboard navigation", () => {
    const view = setup();
    const track = view.getByRole("group", { name: "Pet Projects" });
    track.scrollLeft = 1224;
    fireEvent.scroll(track);
    expect(within(view.container).getByRole("status").textContent).toContain(
      "3–4",
    );
    expect(view.getByText("03–04 / 08")).toBeTruthy();
    expect(
      (view.getByRole("button", { name: /previous/ }) as HTMLButtonElement)
        .disabled,
    ).toBe(false);
    fireEvent.keyDown(track, { key: "ArrowRight" });
    expect(track.scrollLeft).toBe(1836);
    fireEvent.keyDown(track, { key: "Home" });
    expect(track.scrollLeft).toBe(0);
  });

  it("uses instant scrolling when reduced motion is requested", () => {
    reduced = true;
    const view = setup();
    fireEvent.click(view.getByRole("button", { name: /next/ }));
    expect(scrollTo).toHaveBeenLastCalledWith({ left: 612, behavior: "auto" });
  });
});
