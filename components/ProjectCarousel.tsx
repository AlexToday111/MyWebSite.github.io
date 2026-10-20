"use client";

import { useEffect, useRef, useState, type KeyboardEvent } from "react";
import type { Project } from "@/data/projects";
import ProjectPreview from "./ProjectPreview";
import { usePortfolioLanguage } from "./PortfolioLanguage";
import styles from "./ProjectCarousel.module.css";

function measure(track: HTMLDivElement) {
  const card = track.firstElementChild;
  if (!card) return { step: 0, max: 0, visible: 1, last: 0 };
  const gap = parseFloat(getComputedStyle(track).columnGap) || 0;
  const step = card.getBoundingClientRect().width + gap;
  const visible =
    step > 0 ? Math.max(1, Math.round((track.clientWidth + gap) / step)) : 1;
  const max = Math.max(0, track.scrollWidth - track.clientWidth);
  return {
    step,
    max,
    visible,
    last: Math.max(0, track.childElementCount - visible),
  };
}

export default function ProjectCarousel({
  projects,
  title,
  id,
}: {
  projects: Project[];
  title: string;
  id: string;
}) {
  const { language } = usePortfolioLanguage();
  const trackRef = useRef<HTMLDivElement>(null);
  const indexRef = useRef(0);
  // Keep rapid button clicks relative to the requested card during smooth scrolling.
  const requestedIndex = useRef<number | null>(null);
  const [navigation, setNavigation] = useState({
    index: 0,
    visible: 1,
    overflow: false,
    previous: false,
    next: false,
  });

  useEffect(() => {
    const track = trackRef.current;
    if (!track) return;
    let settleTimer: ReturnType<typeof setTimeout>;

    function sync() {
      if (!track) return;
      const { step, max, visible, last } = measure(track);
      const index =
        step > 0
          ? Math.min(last, Math.max(0, Math.round(track.scrollLeft / step)))
          : 0;
      indexRef.current = index;
      const next = {
        index,
        visible,
        overflow: max > 1,
        previous: track.scrollLeft > 1,
        next: track.scrollLeft < max - 1,
      };
      setNavigation((current) =>
        current.index === next.index &&
        current.visible === next.visible &&
        current.overflow === next.overflow &&
        current.previous === next.previous &&
        current.next === next.next
          ? current
          : next,
      );
    }

    function onSettled() {
      requestedIndex.current = null;
      sync();
    }

    function onScroll() {
      sync();
      clearTimeout(settleTimer);
      settleTimer = setTimeout(onSettled, 160);
    }

    function onResize() {
      if (!track) return;
      const { step, max, last } = measure(track);
      requestedIndex.current = null;
      // Retain the first visible project when switching between one and two cards.
      track.scrollTo({
        left: Math.min(Math.min(indexRef.current, last) * step, max),
        behavior: "auto",
      });
      sync();
    }

    const observer = new ResizeObserver(onResize);
    observer.observe(track);
    sync();
    track.addEventListener("scroll", onScroll, { passive: true });
    track.addEventListener("scrollend", onSettled);
    return () => {
      observer.disconnect();
      clearTimeout(settleTimer);
      track.removeEventListener("scroll", onScroll);
      track.removeEventListener("scrollend", onSettled);
    };
  }, [projects.length]);

  function goTo(index: number) {
    const track = trackRef.current;
    if (!track) return;
    const { step, max, last } = measure(track);
    const target = Math.max(0, Math.min(index, last));
    requestedIndex.current = target;
    track.scrollTo({
      left: Math.min(target * step, max),
      behavior: window.matchMedia("(prefers-reduced-motion: reduce)").matches
        ? "auto"
        : "smooth",
    });
  }

  function move(direction: number) {
    goTo((requestedIndex.current ?? indexRef.current) + direction);
  }

  function onKeyDown(event: KeyboardEvent<HTMLDivElement>) {
    if (event.target !== event.currentTarget) return;
    switch (event.key) {
      case "ArrowLeft":
        event.preventDefault();
        move(-1);
        break;
      case "ArrowRight":
        event.preventDefault();
        move(1);
        break;
      case "Home":
        event.preventDefault();
        goTo(0);
        break;
      case "End":
        event.preventDefault();
        goTo(projects.length - 1);
        break;
    }
  }

  const headingId = `${id}-title`;
  const trackId = `${id}-track`;
  return (
    <section className="project-category" aria-labelledby={headingId}>
      <header className={`project-category-heading ${styles.heading}`}>
        <h3 id={headingId}>{title}</h3>
        <div className={styles.controls} hidden={!navigation.overflow}>
          <span className={styles.progress} aria-hidden="true">
            {String(navigation.index + 1).padStart(2, "0")}–
            {String(
              Math.min(projects.length, navigation.index + navigation.visible),
            ).padStart(2, "0")}{" "}
            / {String(projects.length).padStart(2, "0")}
          </span>
          <button
            type="button"
            aria-label={
              language === "en"
                ? `${title}: previous project`
                : `${title}: предыдущий проект`
            }
            aria-controls={trackId}
            disabled={!navigation.previous}
            onClick={() => move(-1)}
          >
            <svg viewBox="0 0 24 24" aria-hidden="true">
              <path d="M19 12H5m6-6-6 6 6 6" />
            </svg>
          </button>
          <button
            type="button"
            aria-label={
              language === "en"
                ? `${title}: next project`
                : `${title}: следующий проект`
            }
            aria-controls={trackId}
            disabled={!navigation.next}
            onClick={() => move(1)}
          >
            <svg viewBox="0 0 24 24" aria-hidden="true">
              <path d="M5 12h14m-6-6 6 6-6 6" />
            </svg>
          </button>
        </div>
      </header>
      <div
        ref={trackRef}
        id={trackId}
        className={styles.track}
        tabIndex={0}
        role="group"
        aria-labelledby={headingId}
        aria-roledescription={language === "en" ? "carousel" : "карусель"}
        onKeyDown={onKeyDown}
        onPointerDown={() => {
          requestedIndex.current = null;
        }}
        onWheel={() => {
          requestedIndex.current = null;
        }}
      >
        {projects.map((project, index) => (
          <div
            key={project.title}
            className={styles.slide}
            role="group"
            aria-label={`${index + 1} / ${projects.length}: ${project.title}`}
          >
            <ProjectPreview project={project} />
          </div>
        ))}
      </div>
      <p
        className="sr-only"
        role="status"
        aria-live="polite"
        aria-atomic="true"
      >
        {language === "en" ? "Projects" : "Проекты"} {navigation.index + 1}–
        {Math.min(projects.length, navigation.index + navigation.visible)}{" "}
        {language === "en" ? "of" : "из"} {projects.length}
      </p>
    </section>
  );
}
