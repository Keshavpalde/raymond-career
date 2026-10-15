"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import styles from "./StoriesThatInspire.module.css";

import {
  StoriesThatInspireData,
  RichTextBlock,
} from "@/types/lifeAtRaymondRealtyPage";
import SliderArrow from "@/components/SliderArrow/SliderArrow";

interface StoriesThatInspireProps {
  data: StoriesThatInspireData;
}

const STRAPI_URL = process.env.NEXT_PUBLIC_STRAPI_URL;

function getRichText(blocks?: RichTextBlock[] | null) {
  return (blocks || [])
    .map((block) =>
      block.children?.map((child) => child.text).join("")
    )
    .join("\n");
}

function getMediaUrl(url?: string) {
  if (!url) return "";

  return url.startsWith("http")
    ? url
    : `${STRAPI_URL}${url}`;
}

export default function StoriesThatInspire({
  data,
}: StoriesThatInspireProps) {
  const sliderRef = useRef<HTMLDivElement>(null);

  const [isHovered, setIsHovered] = useState(false);

  /*
   * Bumped on every manual arrow click so the auto slider
   * restarts its timer instead of jumping right after.
   */
  const [manualSlideCount, setManualSlideCount] = useState(0);

  /*
   * Scroll one card forward (1) or back (-1),
   * wrapping around at either end.
   */
  const slide = useCallback((direction: 1 | -1) => {
    const slider = sliderRef.current;

    if (!slider) return;

    const card = slider.querySelector(
      `.${styles.card}`
    ) as HTMLElement | null;

    if (!card) return;

    const gap = parseFloat(getComputedStyle(slider).columnGap) || 0;

    const scrollAmount = card.offsetWidth + gap;

    const isAtStart = slider.scrollLeft <= 5;

    const isAtEnd =
      slider.scrollLeft + slider.clientWidth >=
      slider.scrollWidth - 5;

    if (direction === 1 && isAtEnd) {
      slider.scrollTo({ left: 0, behavior: "smooth" });

      return;
    }

    if (direction === -1 && isAtStart) {
      slider.scrollTo({
        left: slider.scrollWidth,
        behavior: "smooth",
      });

      return;
    }

    slider.scrollBy({
      left: direction * scrollAmount,
      behavior: "smooth",
    });
  }, []);

  const handleManualSlide = (direction: 1 | -1) => {
    slide(direction);
    setManualSlideCount((count) => count + 1);
  };

  /*
   * Auto slider
   */
  useEffect(() => {
    if (isHovered) return;

    const interval = setInterval(() => slide(1), 3000);

    return () => {
      clearInterval(interval);
    };
  }, [isHovered, manualSlideCount, slide]);

  /*
   * If this section is empty in Strapi,
   * don't render anything.
   */
  if (!data) {
    return null;
  }

  return (
    <section className={styles.section}>
      {/* ================================
          Section Heading
      ================================= */}

      <div className={styles.headingWrapper}>
        <h2>{data.heading}</h2>

        <div className={styles.description}>
          <p>{getRichText(data.description)}</p>
        </div>
      </div>

      {/* ================================
          Slider
      ================================= */}

      <div
        ref={sliderRef}
        className={styles.slider}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        {data.storyItems?.map((item, index) => {
          const imageUrl = getMediaUrl(
            item.image?.url
          );

          return (
            <article
              className={styles.card}
              key={index}
            >
              {/* Image */}

              <img
                src={imageUrl}
                alt={
                  item.image?.alternativeText ||
                  item.name
                }
                className={styles.image}
              />

              {/* Dark gradient */}

              <div className={styles.overlay} />

              {/* Card content */}

              <div className={styles.cardContent}>
                <h3>{item.name}</h3>

                <p className={styles.designation}>
                  {item.designation}
                </p>

                <div className={styles.storyDescription}>
                  <p>
                    {getRichText(item.description)}
                  </p>
                </div>
              </div>
            </article>
          );
        })}
      </div>

      {/* ================================
          Slider Arrows
      ================================= */}

      {(data.storyItems?.length ?? 0) > 1 && (
        <div className={styles.sliderControls}>
          <SliderArrow
            direction="prev"
            onClick={() => handleManualSlide(-1)}
            aria-label="Previous story"
          />

          <SliderArrow
            direction="next"
            onClick={() => handleManualSlide(1)}
            aria-label="Next story"
          />
        </div>
      )}
    </section>
  );
}