"use client";

import styles from "./HouseConceptHero.module.css";

import {
  HouseConceptHeroData,
} from "@/types/houseConceptPage";

interface HouseConceptHeroProps {
  data: HouseConceptHeroData | null;
}

const STRAPI_URL =
  process.env.NEXT_PUBLIC_STRAPI_URL;

export default function HouseConceptHero({
  data,
}: HouseConceptHeroProps) {
  if (!data) {
    return null;
  }

  const imageUrl = data.image?.url
    ? data.image.url.startsWith("http")
      ? data.image.url
      : `${STRAPI_URL}${data.image.url}`
    : "";

  return (
    <section className={styles.hero}>
      {/* Background Image */}
      {imageUrl && (
        <img
          src={imageUrl}
          alt={
            data.image?.alternativeText ||
            data.heading
          }
          className={styles.backgroundImage}
        />
      )}

      {/* Dark Overlay */}
      {data.overlay && (
        <div className={styles.overlay} />
      )}

      {/* Bottom Gradient */}
      <div className={styles.bottomGradient} />

      {/* Four House Blocks */}
      <div className={styles.houseBlocks}>
        <div
          className={`${styles.houseBlock} ${styles.houseOne}`}
        />

        <div
          className={`${styles.houseBlock} ${styles.houseTwo}`}
        />

        <div
          className={`${styles.houseBlock} ${styles.houseThree}`}
        />

        <div
          className={`${styles.houseBlock} ${styles.houseFour}`}
        />
      </div>

      {/* Heading */}
      <div className={styles.content}>
        <h1>{data.heading}</h1>
      </div>
    </section>
  );
}