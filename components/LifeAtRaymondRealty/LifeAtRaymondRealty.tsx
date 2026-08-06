"use client";

import { useEffect, useMemo, useRef, useState } from "react";

import styles from "./LifeAtRaymondRealty.module.css";

import GalleryGrid from "./GalleryGrid";

import { LifeProps } from "./types";
import { GalleryImage } from "@/types/lifeAtRaymondRealty";

const VISIBLE_IMAGES = 24;

export default function LifeAtRaymondRealty({
  data,
}: LifeProps) {
  const sortedImages = useMemo(() => {
    return [...data.galleryItems].sort(
      (a, b) => a.order - b.order
    );
  }, [data.galleryItems]);

  const [visibleImages, setVisibleImages] =
    useState<GalleryImage[]>(
      sortedImages.slice(0, VISIBLE_IMAGES)
    );

  const hiddenImages = useMemo(() => {
    return sortedImages.slice(VISIBLE_IMAGES);
  }, [sortedImages]);

  useEffect(() => {
    if (!hiddenImages.length) return;

    const interval = setInterval(() => {
      setVisibleImages((prev) => {
        const next = [...prev];

        const visibleIndex = Math.floor(
          Math.random() * next.length
        );

        const hiddenIndex = Math.floor(
          Math.random() * hiddenImages.length
        );

        next[visibleIndex] =
          hiddenImages[hiddenIndex];

        return [...next];
      });
    }, 1200);

    return () => clearInterval(interval);
  }, [hiddenImages]);

  const sectionRef = useRef<HTMLElement>(null);

  const [revealed, setRevealed] = useState(false);

  useEffect(() => {
    const el = sectionRef.current;

    if (!el || revealed) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setRevealed(true);
          observer.disconnect();
        }
      },
      { threshold: 0.15 }
    );

    observer.observe(el);

    return () => observer.disconnect();
  }, [revealed]);

  return (
    <section
      ref={sectionRef}
      className={styles.section}
    >
      <div className="container">

        <GalleryGrid
          images={visibleImages}
          heading={data.heading}
          buttonText={data.buttonText}
          buttonLink={data.buttonLink}
          revealed={revealed}
        />

      </div>
    </section>
  );
}
