"use client";

import { useEffect, useState } from "react";
import styles from "./LearnAndGrow.module.css";
import {
  LearnAndGrowData,
  RichTextBlock,
} from "@/types/madeForMorePage";
import SliderArrow from "@/components/SliderArrow/SliderArrow";

interface LearnAndGrowProps {
  data: LearnAndGrowData;
}

const IMAGE_SLIDE_INTERVAL = 4000;

function getRichText(blocks?: RichTextBlock[] | null) {
  return (blocks || [])
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
  const [imageIndex, setImageIndex] = useState(0);
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
    setImageIndex(0);
    setLightboxIndex(null);
  }

  function showImage(offset: number) {
    setImageIndex((index) =>
      activeImages.length === 0
        ? 0
        : (index + offset + activeImages.length) %
          activeImages.length
    );
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

  // Auto-advance the photo. Restarts after a tab change or a
  // manual arrow/dot click, and pauses while the lightbox is open.
  useEffect(() => {
    if (activeImages.length <= 1 || lightboxIndex !== null) {
      return;
    }

    const timeout = setTimeout(() => {
      setImageIndex(
        (index) => (index + 1) % activeImages.length
      );
    }, IMAGE_SLIDE_INTERVAL);

    return () => clearTimeout(timeout);
  }, [activeIndex, imageIndex, activeImages.length, lightboxIndex]);

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

  const currentImage = activeImages[imageIndex];

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

        <div className={styles.layout}>

          {/* Tabs (description shows on the active one) */}
          <div className={styles.tabs}>
            {tabs.map((tab, index) => {
              const isActive = activeIndex === index;

              return (
                <button
                  key={index}
                  type="button"
                  className={`${styles.tab} ${
                    isActive ? styles.activeTab : ""
                  }`}
                  onClick={() => selectTab(index)}
                  aria-pressed={isActive}
                >
                  <span className={styles.tabTitle}>
                    {tab.title}
                  </span>

                  {isActive && (
                    <span className={styles.tabDescription}>
                      {getRichText(tab.description)
                        .split("\n")
                        .filter(Boolean)
                        .map((text, textIndex) => (
                          <span key={textIndex}>{text}</span>
                        ))}
                    </span>
                  )}
                </button>
              );
            })}
          </div>

          {/* Image slider */}
          <div className={styles.media}>
            {currentImage && (
              <button
                key={`${activeIndex}-${imageIndex}`}
                type="button"
                className={styles.imageWrapper}
                onClick={() => setLightboxIndex(imageIndex)}
                aria-label={`View ${activeTab.title} image ${
                  imageIndex + 1
                }`}
              >
                <img
                  src={currentImage}
                  alt={activeTab.title || "Learn and Grow"}
                />
              </button>
            )}

            {activeImages.length > 1 && (
              <div className={styles.sliderControls}>
                <div className={styles.dots}>
                  {activeImages.map((_, index) => (
                    <button
                      key={index}
                      type="button"
                      className={`${styles.dot} ${
                        index === imageIndex ? styles.activeDot : ""
                      }`}
                      onClick={() => setImageIndex(index)}
                      aria-label={`Show image ${index + 1}`}
                      aria-current={index === imageIndex}
                    />
                  ))}
                </div>

                <div className={styles.arrows}>
                  <SliderArrow
                    direction="prev"
                    onClick={() => showImage(-1)}
                    aria-label="Previous image"
                  />

                  <SliderArrow
                    direction="next"
                    onClick={() => showImage(1)}
                    aria-label="Next image"
                  />
                </div>
              </div>
            )}
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
            <SliderArrow
              direction="prev"
              onClick={(event) => {
                event.stopPropagation();
                showLightboxImage(-1);
              }}
              aria-label="Previous image"
            />
          )}

          <img
            src={activeImages[lightboxIndex]}
            alt={activeTab.title || "Learn and Grow"}
            className={styles.lightboxImage}
            onClick={(event) => event.stopPropagation()}
          />

          {activeImages.length > 1 && (
            <SliderArrow
              direction="next"
              onClick={(event) => {
                event.stopPropagation();
                showLightboxImage(1);
              }}
              aria-label="Next image"
            />
          )}
        </div>
      )}
    </section>
  );
}
