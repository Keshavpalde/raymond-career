"use client";

import { useState } from "react";
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

const topStatsIndexes = new Set([0, 2]);
const bottomStatsIndexes = new Set([5, 7]);
const imageCollapseMap = new Map<number, { index: number; position: "top" | "bottom" }>([
  [0, { index: 4, position: "bottom" }],
  [2, { index: 6, position: "bottom" }],
  [5, { index: 1, position: "top" }],
  [7, { index: 3, position: "top" }],
]);

export default function StatsSection({ data }: Props) {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  return (
    <section className={styles.statsSection}>
      <div className={styles.container}>

        <h2 className={styles.heading}>{data.heading}</h2>

        <div
          className={
            hoveredIndex !== null
              ? `${styles.grid} ${styles.gridHoverActive}`
              : styles.grid
          }
        >

          {data.cards.map((card, index) => {
            const positionClass = positionClasses[index] ?? "";
            const typeClass =
              card.type === "image"
                ? styles.imageWrapper
                : styles.statsWrapper;
            const hoveredClass = hoveredIndex === index ? styles.hovered : "";
            const expandedClass =
              card.type === "stats" && hoveredIndex === index
                ? topStatsIndexes.has(index)
                  ? styles.topExpanded
                  : bottomStatsIndexes.has(index)
                  ? styles.bottomExpanded
                  : ""
                : "";
            const collapseEntry = hoveredIndex !== null ? imageCollapseMap.get(hoveredIndex) : null;
            const collapsedClass =
              card.type === "image" && collapseEntry?.index === index
                ? collapseEntry.position === "top"
                  ? styles.collapsedTop
                  : styles.collapsedBottom
                : "";

            return (
              <div
                key={card.id}
                className={`${styles.cardWrapper} ${positionClass} ${typeClass} ${expandedClass} ${collapsedClass} ${hoveredClass}`}
                onMouseEnter={() => {
                  if (card.type === "stats") {
                    setHoveredIndex(index);
                  }
                }}
                onMouseLeave={() => {
                  if (card.type === "stats") {
                    setHoveredIndex(null);
                  }
                }}
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