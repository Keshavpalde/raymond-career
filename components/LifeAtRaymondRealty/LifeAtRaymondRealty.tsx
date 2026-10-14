"use client";

import { useEffect, useMemo, useState } from "react";

import styles from "./LifeAtRaymondRealty.module.css";

import GalleryGrid from "./GalleryGrid";
import MobileGallery from "./MobileGallery";

import { LifeProps } from "./types";

const MOBILE_QUERY = "(max-width: 768px)";

export default function LifeAtRaymondRealty({
  data,
}: LifeProps) {
  const sortedImages = useMemo(() => {
    return [...data.galleryItems].sort(
      (a, b) => a.order - b.order
    );
  }, [data.galleryItems]);

  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const query = window.matchMedia(MOBILE_QUERY);
    const update = () => setIsMobile(query.matches);

    update();
    query.addEventListener("change", update);

    return () => query.removeEventListener("change", update);
  }, []);

  return (
    <section className={styles.section}>
      <div className={styles.container}>

        {isMobile ? (
          <MobileGallery
            images={sortedImages}
            heading={data.heading}
            buttonText={data.buttonText}
            buttonLink={data.buttonLink}
          />
        ) : (
          <GalleryGrid
            images={sortedImages}
            heading={data.heading}
            buttonText={data.buttonText}
            buttonLink={data.buttonLink}
          />
        )}

      </div>
    </section>
  );
}
