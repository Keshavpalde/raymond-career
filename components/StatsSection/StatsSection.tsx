"use client";

import styles from "./StatsSection.module.css";
import StatsCard from "./StatsCard";
import ImageCard from "./ImageCard";
import { StatsSectionData } from "@/types/statsSection";

interface Props {
  data: StatsSectionData;
}

const positionClasses = [
  styles.pos1,
  styles.pos2,
  styles.pos3,
  styles.pos4,
  styles.pos5,
  styles.pos6,
  styles.pos7,
  styles.pos8,
];

export default function StatsSection({ data }: Props) {
  return (
    <section
      className={`${styles.statsSection} ${styles.sectionDesktop} ${styles.sectionMobile}`}
    >
      <div className={styles.container}>

        <h2 className={styles.heading}>{data.heading}</h2>

        <div className={styles.grid}>

          {data.cards.map((card, index) => {
            const positionClass = positionClasses[index] ?? "";
            const typeClass =
              card.type === "image"
                ? styles.imageWrapper
                : styles.statsWrapper;

            return (
              <div
                key={card.id}
                className={`${styles.cardWrapper} ${positionClass} ${typeClass}`}
              >
                {card.type === "stats" ? (
                  <StatsCard card={card} />
                ) : (
                  <ImageCard card={card} />
                )}
              </div>
            );
          })}

        </div>

      </div>
    </section>
  );
}
