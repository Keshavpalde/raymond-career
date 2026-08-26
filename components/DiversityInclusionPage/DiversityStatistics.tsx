"use client";

import styles from "./DiversityStatistics.module.css";

import {
  DiversityStatisticsData,
} from "@/types/diversityInclusionPage";

interface DiversityStatisticsProps {
  data: DiversityStatisticsData | null;
}

export default function DiversityStatistics({
  data,
}: DiversityStatisticsProps) {
  if (!data) {
    return null;
  }

  const statistics = data.statistics || [];

  if (statistics.length === 0) {
    return null;
  }

  return (
    <section className={styles.section}>
      <div className={styles.container}>
        {statistics.map((stat) => (
          <div
            className={styles.stat}
            key={stat.id}
          >
            <div className={styles.number}>
              {stat.number}
            </div>

            <div className={styles.label}>
              {stat.label}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}