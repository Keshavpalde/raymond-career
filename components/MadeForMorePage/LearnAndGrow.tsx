"use client";

import { useEffect, useState } from "react";
import styles from "./LearnAndGrow.module.css";
import {
  LearnAndGrowData,
  RichTextBlock,
} from "@/types/madeForMorePage";

interface LearnAndGrowProps {
  data: LearnAndGrowData;
}

const VISIBLE_IMAGES = 4;

function getRichText(blocks: RichTextBlock[] = []) {
  return blocks
    .map((block) =>
      block.children?.map((child) => child.text || "").join("")
    )
    .join("\n");
}

function getImageUrl(url: string) {
  return url.startsWith("http")
    ? url
    : `${process.env.NEXT_PUBLIC_STRAPI_URL}${url}`;
}

export default function LearnAndGrow({
  data,
}: LearnAndGrowProps) {
  const [activeIndex, setActiveIndex] = useState(0);
  const [sliderStart, setSliderStart] = useState(0);
  const [lightboxIndex, setLightboxIndex] = useState<
    number | null
  >(null);

  /**
   * Strapi structure:
   *
   * learnAndGrow
   * ├── heading
   * ├── description
   * └── learnAndGrowTabs
   *     └── learnAndGrowTabs
   *         ├── title
   *         ├── images
   *         │   └── learnAndGrowImage
   *         │       └── image
   *         └── description
   */

  const tabs = (data?.learnAndGrowTabs || [])
    .map((wrapper) => wrapper.learnAndGrowTabs)
    .filter(Boolean);

  const activeTab = tabs[activeIndex];

  const activeImages = (activeTab?.images || [])
    .map((image) => image.learnAndGrowImage?.image?.url)
    .filter((url): url is string => Boolean(url))
    .map(getImageUrl);

  function selectTab(index: number) {
    setActiveIndex(index);
    setSliderStart(0);
    setLightboxIndex(null);
  }

  function showLightboxImage(offset: number) {
    setLightboxIndex((index) => {
      if (index === null || activeImages.length === 0) {
        return index;
      }

      return (
        (index + offset + activeImages.length) %
        activeImages.length
      );
    });
  }

  useEffect(() => {
    if (lightboxIndex === null) {
      return;
    }

    function handleKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") {
        setLightboxIndex(null);
      } else if (event.key === "ArrowLeft") {
        showLightboxImage(-1);
      } else if (event.key === "ArrowRight") {
        showLightboxImage(1);
      }
    }

    window.addEventListener("keydown", handleKeyDown);
    return () =>
      window.removeEventListener("keydown", handleKeyDown);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [lightboxIndex]);

  if (!activeTab) {
    return null;
  }

  const canSlidePrev = sliderStart > 0;
  const canSlideNext =
    sliderStart + VISIBLE_IMAGES < activeImages.length;

  function slidePrev() {
    setSliderStart((start) => Math.max(0, start - 1));
  }

  function slideNext() {
    setSliderStart((start) =>
      Math.min(
        Math.max(0, activeImages.length - VISIBLE_IMAGES),
        start + 1
      )
    );
  }

  const visibleImages = activeImages.slice(
    sliderStart,
    sliderStart + VISIBLE_IMAGES
  );

  return (
    <section className={styles.section}>
      <div className={styles.container}>

        {/* Section Heading */}
        <div className={styles.header}>
          <h2>{data.heading}</h2>

          <div className={styles.introText}>
            {getRichText(data.description)
              .split("\n")
              .filter(Boolean)
              .map((text, index) => (
                <p key={index}>{text}</p>
              ))}
          </div>
        </div>

        {/* Tabs */}
        <div className={styles.tabs}>
          {tabs.map((tab, index) => (
            <button
              key={index}
              type="button"
              className={`${styles.tab} ${
                activeIndex === index ? styles.activeTab : ""
              }`}
              onClick={() => selectTab(index)}
            >
              {tab.title}
            </button>
          ))}
        </div>

        {/* Images */}
        <div className={styles.imagesGrid}>
          {visibleImages.map((imageUrl, index) => (
            <button
              key={sliderStart + index}
              type="button"
              className={styles.imageWrapper}
              onClick={() =>
                setLightboxIndex(sliderStart + index)
              }
              aria-label={`View ${activeTab.title} image ${
                sliderStart + index + 1
              }`}
            >
              <img
                src={imageUrl}
                alt={activeTab.title || "Learn and Grow"}
              />
            </button>
          ))}
        </div>

        {activeImages.length > VISIBLE_IMAGES && (
          <div className={styles.sliderControls}>
            <button
              type="button"
              className={styles.sliderArrow}
              onClick={slidePrev}
              disabled={!canSlidePrev}
              aria-label="Previous images"
            >
              &#8249;
            </button>

            <button
              type="button"
              className={styles.sliderArrow}
              onClick={slideNext}
              disabled={!canSlideNext}
              aria-label="Next images"
            >
              &#8250;
            </button>
          </div>
        )}

        {/* Active Tab Content */}
        <div className={styles.content}>
          {/* Tab-specific Description */}
          <div className={styles.description}>
            {getRichText(activeTab.description)
              .split("\n")
              .filter(Boolean)
              .map((text, index) => (
                <p key={index}>{text}</p>
              ))}
          </div>

        </div>
      </div>

      {/* Lightbox */}
      {lightboxIndex !== null && activeImages[lightboxIndex] && (
        <div
          className={styles.lightboxOverlay}
          onClick={() => setLightboxIndex(null)}
        >
          <button
            type="button"
            className={styles.lightboxClose}
            onClick={() => setLightboxIndex(null)}
            aria-label="Close"
          >
            &#10005;
          </button>

          {activeImages.length > 1 && (
            <button
              type="button"
              className={`${styles.lightboxArrow} ${styles.lightboxArrowPrev}`}
              onClick={(event) => {
                event.stopPropagation();
                showLightboxImage(-1);
              }}
              aria-label="Previous image"
            >
              &#8249;
            </button>
          )}

          <img
            src={activeImages[lightboxIndex]}
            alt={activeTab.title || "Learn and Grow"}
            className={styles.lightboxImage}
            onClick={(event) => event.stopPropagation()}
          />

          {activeImages.length > 1 && (
            <button
              type="button"
              className={`${styles.lightboxArrow} ${styles.lightboxArrowNext}`}
              onClick={(event) => {
                event.stopPropagation();
                showLightboxImage(1);
              }}
              aria-label="Next image"
            >
              &#8250;
            </button>
          )}
        </div>
      )}
    </section>
  );
}
