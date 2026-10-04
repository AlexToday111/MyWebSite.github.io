"use client";

import { motion, useReducedMotion } from "framer-motion";
import Image from "next/image";
import { useEffect, useState, type ReactNode } from "react";
import {
  profileContent,
  profileLabels,
  type ProfileLanguage,
} from "@/data/profile-language";
import { education } from "@/data/education";
import { withBasePath } from "@/lib/paths";
import styles from "./ProfileSection.module.css";
import ExperienceTabs from "./ExperienceTabs";
import LeetCodeHeatmap from "./LeetCodeHeatmap";

function ProfileCard({
  className,
  children,
  index,
}: {
  className: string;
  children: ReactNode;
  index: number;
}) {
  const reduceMotion = useReducedMotion();
  return (
    <motion.article
      className={`${styles.card} ${className}`}
      initial={reduceMotion ? false : { opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.15 }}
      transition={{
        duration: 0.45,
        delay: index * 0.04,
        ease: [0.22, 1, 0.36, 1],
      }}
    >
      {children}
    </motion.article>
  );
}

export default function ProfileSection() {
  const [language, setLanguage] = useState<ProfileLanguage>("en");
  const [universityLogoLoaded, setUniversityLogoLoaded] = useState(false);
  const homeProfile = profileContent[language];
  const labels = profileLabels[language];
  const university = education[0];

  useEffect(() => {
    try {
      const saved = localStorage.getItem("ba6kir:profile-language:v1");
      if (saved === "en" || saved === "ru") setLanguage(saved);
    } catch {
      // The switch still works when browser storage is unavailable.
    }
  }, []);

  function toggleLanguage() {
    const next = language === "en" ? "ru" : "en";
    setLanguage(next);
    try {
      localStorage.setItem("ba6kir:profile-language:v1", next);
    } catch {
      // Persistence is optional.
    }
  }
  return (
    <section
      id="profile"
      aria-labelledby="profile-title"
      className={styles.section}
      lang={language}
    >
      <div className={`container ${styles.container}`}>
        <header className={styles.heading}>
          <h2 id="profile-title">
            {labels.heading} <span lang="en">BA6KIR?</span>
          </h2>
          <button
            type="button"
            className={styles.languageToggle}
            onClick={toggleLanguage}
            aria-label={
              language === "en"
                ? "Переключить профиль на русский"
                : "Switch profile to English"
            }
            title={
              language === "en" ? "Переключить на русский" : "Switch to English"
            }
          >
            <span lang="en" data-active={language === "en"}>
              EN
            </span>
            <span className={styles.languageDivider} aria-hidden="true">
              /
            </span>
            <span lang="en" data-active={language === "ru"}>
              RU
            </span>
          </button>
        </header>

        <div className={styles.grid}>
          <ProfileCard className={styles.bio} index={0}>
            <div>
              <h3>{homeProfile.role}</h3>
            </div>
            <div className={styles.bioCopy}>
              <p>{homeProfile.bio}</p>
              <p className={styles.secondary}>{homeProfile.approach}</p>
            </div>
          </ProfileCard>

          <ProfileCard className={styles.experience} index={1}>
            <h3 className={styles.label}>{labels.experience}</h3>
            <ExperienceTabs language={language} />
          </ProfileCard>

          <ProfileCard className={styles.education} index={2}>
            <div className={styles.cardHeader}>
              <h3 className={styles.label}>{labels.education}</h3>
              <span className={styles.status}>
                {university.from}-{university.to}
              </span>
            </div>
            <Image
              src={withBasePath("/Logos/innopolis.png")}
              alt={labels.university}
              width={80}
              height={80}
              loading="eager"
              className={styles.universityLogo}
              style={{ display: universityLogoLoaded ? "block" : "none" }}
              onLoad={() => setUniversityLogoLoaded(true)}
              onError={() => setUniversityLogoLoaded(false)}
            />
            <div className={styles.educationContent}>
              <h3>{labels.university}</h3>
              <p className={styles.degree}>{labels.degree}</p>
              <p className={styles.secondary}>GPA {university.gpa}</p>
              <p className={styles.subjects}>
                {labels.subjects.map((subject) => (
                  <span key={subject} className="block">
                    {subject}
                  </span>
                ))}
              </p>
            </div>
          </ProfileCard>

          <ProfileCard className={styles.achievements} index={3}>
            <h3 className={styles.label}>{labels.achievements}</h3>
            <ol className={styles.awards}>
              {homeProfile.achievements.map((award) => (
                <li key={award.title}>
                  <div>
                    <h4>{award.title}</h4>
                    <p>{award.description}</p>
                  </div>
                </li>
              ))}
            </ol>
          </ProfileCard>

          <ProfileCard className={styles.focus} index={4}>
            <h3 className={styles.label}>{labels.focus}</h3>
            <ul className={styles.interests}>
              {homeProfile.interests.map((interest, index) => (
                <li key={interest}>
                  {index > 0 && <span aria-hidden="true">·</span>}
                  <strong>{interest}</strong>
                </li>
              ))}
            </ul>
          </ProfileCard>

          <ProfileCard className={styles.toolbox} index={5}>
            <h3 className={styles.label}>{labels.toolbox}</h3>
            <dl className={styles.tools}>
              {homeProfile.toolbox.map((group) => (
                <div key={group.category}>
                  <dt>{group.category}</dt>
                  <dd>{group.tools.join(" · ")}</dd>
                </div>
              ))}
            </dl>
          </ProfileCard>
        </div>
        <LeetCodeHeatmap language={language} />
      </div>
    </section>
  );
}
