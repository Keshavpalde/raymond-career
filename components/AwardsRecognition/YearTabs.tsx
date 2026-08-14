"use client";

import styles from "./AwardsRecognition.module.css";

import { AwardYear } from "@/types/awardsRecognition";

interface Props {
  years: AwardYear[];
  activeYear: number;
  onChange: (year: AwardYear) => void;
}

export default function YearTabs({
  years,
  activeYear,
  onChange,
}: Props) {
  return (
    <div className={styles.yearTabs}>
      {years.map((item) => (
        <button
          key={item.id}
          type="button"
          onClick={() => onChange(item)}
          className={`${styles.yearTab} ${
            activeYear === item.year
              ? styles.activeTab
              : ""
          }`}
        >
          {item.year}
        </button>
      ))}
    </div>
  );
}