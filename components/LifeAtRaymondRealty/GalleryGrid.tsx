"use client";

import GalleryCard from "./GalleryCard";
import CenterCard from "./CenterCard";

import styles from "./LifeAtRaymondRealty.module.css";

import { GalleryImage } from "@/types/lifeAtRaymondRealty";

interface Props {
  images: GalleryImage[];
  heading: string;
  buttonText: string;
  buttonLink: string;
  revealed: boolean;
}

export default function GalleryGrid({
  images,
  heading,
  buttonText,
  buttonLink,
  revealed,
}: Props) {
  const TOTAL_CELLS = 32;

  // Center card occupies rows 2-3 and columns 4-5
  const CENTER_START = 11;
  const CENTER_CELLS = [11, 12, 19, 20];

  let imageIndex = 0;

  return (
    <div
      className={`
        ${styles.galleryGrid}
        ${revealed ? styles.revealed : ""}
      `}
    >
      {Array.from({ length: TOTAL_CELLS }).map((_, index) => {
        // Draw center card only once
        if (index === CENTER_START) {
          return (
            <div
              key="center-card"
              className={`${styles.gridItem} ${styles.centerGridItem}`}
            >
              <CenterCard
                heading={heading}
                buttonText={buttonText}
                buttonLink={buttonLink}
              />
            </div>
          );
        }

        // Skip remaining cells occupied by the center card
        if (CENTER_CELLS.includes(index)) {
          return null;
        }

        const image = images[imageIndex++];

        if (!image) {
          return <div key={index}></div>;
        }

        return (
          <div
            key={image.id}
            className={`${styles.gridItem} ${styles.photoCell}`}
          >
            <GalleryCard image={image} />
          </div>
        );
      })}
    </div>
  );
}
