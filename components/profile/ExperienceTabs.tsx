"use client";

import { useRef, useState, type KeyboardEvent } from "react";
import { motion, useReducedMotion } from "framer-motion";
import {
  profileContent,
  profileLabels,
  type ProfileLanguage,
} from "@/data/profile-language";
import styles from "./ProfileSection.module.css";

export default function ExperienceTabs({
  language = "en",
}: {
  language?: ProfileLanguage;
}) {
  const [active, setActive] = useState(0);
  const tabs = useRef<(HTMLButtonElement | null)[]>([]);
  const reduceMotion = useReducedMotion();
  const jobs = profileContent[language].experiences;
  const labels = profileLabels[language];

  function onKeyDown(event: KeyboardEvent<HTMLButtonElement>, index: number) {
    let next: number;
    switch (event.key) {
      case "ArrowRight":
        next = (index + 1) % jobs.length;
        break;
      case "ArrowLeft":
        next = (index - 1 + jobs.length) % jobs.length;
        break;
      case "Home":
        next = 0;
        break;
      case "End":
        next = jobs.length - 1;
        break;
      default:
        return;
    }
    event.preventDefault();
    setActive(next);
    tabs.current[next]?.focus();
  }

  return (
    <>
      <div role="tablist" aria-label={labels.companies} className={styles.tabs}>
        {jobs.map((job, index) => (
          <button
            key={job.id}
            ref={(element) => {
              tabs.current[index] = element;
            }}
            type="button"
            role="tab"
            id={`experience-tab-${job.id}`}
            aria-controls={`experience-panel-${job.id}`}
            aria-selected={active === index}
            tabIndex={active === index ? 0 : -1}
            onClick={() => setActive(index)}
            onKeyDown={(event) => onKeyDown(event, index)}
          >
            {job.company}
          </button>
        ))}
      </div>
      <div className={styles.experiencePanels}>
        {jobs.map((job, index) => (
          <motion.div
            key={job.id}
            role="tabpanel"
            id={`experience-panel-${job.id}`}
            aria-labelledby={`experience-tab-${job.id}`}
            aria-hidden={active !== index}
            tabIndex={active === index ? 0 : -1}
            className={styles.experienceBody}
            initial={false}
            animate={{
              opacity: active === index ? 1 : 0,
              y: active === index || reduceMotion ? 0 : 4,
            }}
            transition={{ duration: reduceMotion ? 0 : 0.2 }}
            style={{ visibility: active === index ? "visible" : "hidden" }}
          >
            <div>
              <div className={styles.jobHeading}>
                <h3>
                  {job.role} — {job.company}
                </h3>
              </div>
              <p className={styles.jobDomain}>{job.signal}</p>
              <ul className={styles.responsibilities}>
                {job.highlights.map((item) => (
                  <li key={item}>{item}</li>
                ))}
                {job.result && (
                  <li>
                    <strong>{labels.result}:</strong> {job.result}
                  </li>
                )}
              </ul>
              <p className={styles.jobStack}>{job.stack.join(" · ")}</p>
            </div>
          </motion.div>
        ))}
      </div>
    </>
  );
}
