"use client";

import { useEffect, useState } from "react";
import styles from "./HouseMoments.module.css";

import {
  HouseMomentsData,
  RichTextBlock,
} from "@/types/houseConceptPage";

interface HouseMomentsProps {
  data: HouseMomentsData;
}

const STRAPI_URL = process.env.NEXT_PUBLIC_STRAPI_URL;

function getRichText(blocks?: RichTextBlock[] | null) {
  return (blocks || [])
    .map((block) =>
      block.children
        ?.map((child) => child.text)
        .join("")
    )
    .join("\n");
}

function getMediaUrl(url?: string) {
  if (!url) {
    return "";
  }

  return url.startsWith("http")
    ? url
    : `${STRAPI_URL}${url}`;
}

export default function HouseMoments({
  data,
}: HouseMomentsProps) {
  const moments = data?.moments || [];

  const [activeIndex, setActiveIndex] = useState(0);

  const totalSlides = moments.length;

  /*
   * Desktop shows 3 images at a time.
   * Therefore the maximum starting index is
   * total images - 3.
   */
  const visibleCount = 3;

  const maxIndex = Math.max(
    0,
    totalSlides - visibleCount
  );

  /*
   * Move to previous slide
   */
  const goPrevious = () => {
    setActiveIndex((current) => {
      if (current <= 0) {
        return maxIndex;
      }

      return current - 1;
    });
  };

  /*
   * Move to next slide
   */
  const goNext = () => {
    setActiveIndex((current) => {
      if (current >= maxIndex) {
        return 0;
      }

      return current + 1;
    });
  };

  /*
   * Keep active index valid if the number
   * of images changes.
   */
  useEffect(() => {
    if (activeIndex > maxIndex) {
      setActiveIndex(maxIndex);
    }
  }, [activeIndex, maxIndex]);

  if (!data) {
    return null;
  }

  return (
    <section className={styles.section}>
      <div className={styles.backgroundPanel} />

      <div className={styles.container}>

        {/* =====================================
            Heading
        ===================================== */}

        <div className={styles.headingWrapper}>
          <h2 className={styles.heading}>
            {data.heading}
          </h2>

          {data.description && (
            <div className={styles.description}>
              <p>
                {getRichText(data.description)}
              </p>
            </div>
          )}
        </div>

        {/* =====================================
            Slider
        ===================================== */}

        {moments.length > 0 && (
          <div className={styles.sliderArea}>

            {/* Previous Arrow */}
            <button
              type="button"
              className={`${styles.arrow} ${styles.previous}`}
              onClick={goPrevious}
              aria-label="Previous house moment"
            >
              <span>←</span>
            </button>

            {/* Images */}
            <div className={styles.sliderViewport}>
              <div
                className={styles.sliderTrack}
                style={{
                  transform: `translateX(calc(-${activeIndex} * (33.333333% + 6px)))`,
                }}
              >
                {moments.map((moment, index) => {
                  const imageUrl = getMediaUrl(
                    moment.image?.url
                  );

                  return (
                    <div
                      className={styles.slide}
                      key={
                        moment.id || index
                      }
                    >
                      {imageUrl && (
                        <img
                          src={imageUrl}
                          alt={
                            moment.image
                              ?.alternativeText ||
                            `House moment ${
                              index + 1
                            }`
                          }
                          className={styles.image}
                        />
                      )}
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Next Arrow */}
            <button
              type="button"
              className={`${styles.arrow} ${styles.next}`}
              onClick={goNext}
              aria-label="Next house moment"
            >
              <span>→</span>
            </button>
          </div>
        )}

        {/* =====================================
            Pagination
        ===================================== */}

        {maxIndex > 0 && (
          <div className={styles.pagination}>
            {Array.from({
              length: maxIndex + 1,
            }).map((_, index) => (
              <button
                key={index}
                type="button"
                aria-label={`Go to slide ${
                  index + 1
                }`}
                className={`${styles.dot} ${
                  activeIndex === index
                    ? styles.activeDot
                    : ""
                }`}
                onClick={() =>
                  setActiveIndex(index)
                }
              />
            ))}
          </div>
        )}

      </div>
    </section>
  );
}