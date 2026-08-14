"use client";

import { useMemo } from "react";

import styles from "./LifeAtRaymondRealty.module.css";

import GalleryGrid from "./GalleryGrid";

import { LifeProps } from "./types";

export default function LifeAtRaymondRealty({
  data,
}: LifeProps) {
  const sortedImages = useMemo(() => {
    return [...data.galleryItems].sort(
      (a, b) => a.order - b.order
    );
  }, [data.galleryItems]);

  return (
    <section className={styles.section}>
      <div className={styles.container}>

        <GalleryGrid
          images={sortedImages}
          heading={data.heading}
          buttonText={data.buttonText}
          buttonLink={data.buttonLink}
        />

      </div>
    </section>
  );
}
