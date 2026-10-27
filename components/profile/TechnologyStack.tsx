"use client";

import { useId, useState } from "react";
import { ChevronDown, Layers } from "lucide-react";
import type { ProfileLanguage } from "@/data/profile-language";
import styles from "./TechnologyStack.module.css";

type TechnologyGroup = {
  category: string;
  primary: readonly string[];
  additional: readonly string[];
};

function Technologies({ items }: { items: readonly string[] }) {
  return (
    <ul className={styles.technologies}>
      {items.map((item) => (
        <li key={item}>{item}</li>
      ))}
    </ul>
  );
}

export default function TechnologyStack({
  groups,
  language,
}: {
  groups: readonly TechnologyGroup[];
  language: ProfileLanguage;
}) {
  const [expanded, setExpanded] = useState(false);
  const listId = useId();
  const label =
    language === "ru"
      ? expanded
        ? "Свернуть стек"
        : "Показать полный стек"
      : expanded
        ? "Collapse stack"
        : "Show full stack";

  return (
    <div className={styles.stack} data-expanded={expanded}>
      <dl id={listId} className={styles.list}>
        {groups.map((group) => (
          <div className={styles.row} key={group.category}>
            <dt>{group.category}</dt>
            <dd>
              <div className={styles.primary}>
                <Technologies items={group.primary} />
              </div>
              <div className={styles.additional} aria-hidden={!expanded}>
                <div className={styles.clip}>
                  <Technologies items={group.additional} />
                </div>
              </div>
            </dd>
          </div>
        ))}
      </dl>
      <button
        type="button"
        className={styles.disclosure}
        aria-expanded={expanded}
        aria-controls={listId}
        onClick={() => setExpanded((current) => !current)}
      >
        <Layers size={17} aria-hidden="true" />
        <span>{label}</span>
        <ChevronDown className={styles.chevron} size={18} aria-hidden="true" />
      </button>
    </div>
  );
}
