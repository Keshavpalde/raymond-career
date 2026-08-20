"use client";

import { useEffect, useRef, useState } from "react";
import styles from "./Activities.module.css";

import {
  ActivitiesData,
  RichTextBlock,
} from "@/types/madeForMorePage";

interface ActivitiesProps {
  data: ActivitiesData;
}

const IMAGE_SLIDE_INTERVAL = 4000;
const SWIPE_THRESHOLD = 40;

function getRichText(blocks: RichTextBlock[] = []) {
  return blocks
    .map((block) =>
      block.children?.map((child) => child.text || "").join("")
    )
    .join("\n");
}

function getImageUrl(url?: string) {
  if (!url) return "";

  if (url.startsWith("http")) {
    return url;
  }

  return `${process.env.NEXT_PUBLIC_STRAPI_URL}${url}`;
}

export default function Activities({
  data,
}: ActivitiesProps) {
  const slides = data?.activitiesSlides || [];

  const [activeIndex, setActiveIndex] = useState(0);
  const [imageIndex, setImageIndex] = useState(0);

  const activeSlide = slides[activeIndex]?.activitySlide;
  const images = activeSlide?.images || [];

  const touchStartX = useRef<number | null>(null);

  /*
   * Auto slide images
   * Cycles through the active tab's images every few seconds.
   * Restarts whenever the tab changes. Tabs themselves only
   * change via manual click.
   */
  useEffect(() => {
    if (images.length <= 2) {
      return;
    }

    const interval = setInterval(() => {
      setImageIndex(
        (current) => (current + 1) % images.length
      );
    }, IMAGE_SLIDE_INTERVAL);

    return () => clearInterval(interval);
  }, [activeIndex, images.length]);

  if (!data || slides.length === 0) {
    return null;
  }

  if (!activeSlide) {
    return null;
  }

  const handleTabClick = (index: number) => {
    setActiveIndex(index);
    setImageIndex(0);
  };

  const showNextImage = () => {
    setImageIndex((current) =>
      images.length === 0
        ? 0
        : (current + 1) % images.length
    );
  };

  const showPrevImage = () => {
    setImageIndex((current) =>
      images.length === 0
        ? 0
        : (current - 1 + images.length) % images.length
    );
  };

  const handleTouchStart = (
    event: React.TouchEvent<HTMLDivElement>
  ) => {
    touchStartX.current = event.touches[0].clientX;
  };

  const handleTouchEnd = (
    event: React.TouchEvent<HTMLDivElement>
  ) => {
    if (touchStartX.current === null) {
      return;
    }

    const deltaX =
      event.changedTouches[0].clientX - touchStartX.current;

    if (deltaX > SWIPE_THRESHOLD) {
      showPrevImage();
    } else if (deltaX < -SWIPE_THRESHOLD) {
      showNextImage();
    }

    touchStartX.current = null;
  };

  const mainImage = images[imageIndex];
  const secondaryImage =
    images.length > 1
      ? images[(imageIndex + 1) % images.length]
      : undefined;

  return (
    <section className={styles.section}>
      <div className={styles.container}>

        {/* Section Header */}
        <div className={styles.header}>
          <h2>{data.heading}</h2>

          <div className={styles.sectionDescription}>
            {getRichText(data.description)
              .split("\n")
              .map((text, index) => (
                <p key={index}>{text}</p>
              ))}
          </div>
        </div>

        {/* Main Activities Area */}
        <div className={styles.activitiesWrapper}>

          {/* Left Tabs / Content */}
          <div className={styles.tabsWrapper}>
            {slides.map((slide, index) => {
              const slideData = slide.activitySlide;

              if (!slideData) {
                return null;
              }

              return (
                <button
                  key={index}
                  type="button"
                  className={`${styles.tab} ${
                    activeIndex === index
                      ? styles.activeTab
                      : ""
                  }`}
                  onClick={() => handleTabClick(index)}
                >
                  <span className={styles.tabTitle}>
                    {slideData.title}
                  </span>

                  {activeIndex === index && (
                    <span className={styles.tabDescription}>
                      {getRichText(slideData.description)
                        .split("\n")
                        .map((text, textIndex) => (
                          <span key={textIndex}>
                            {text}
                          </span>
                        ))}
                    </span>
                  )}
                </button>
              );
            })}
          </div>

          {/* Images */}
          <div
            className={styles.imagesWrapper}
            onTouchStart={handleTouchStart}
            onTouchEnd={handleTouchEnd}
          >

            {/* Main Image */}
            {mainImage && (
              <div className={styles.mainImage}>
                <img
                  src={getImageUrl(mainImage.url)}
                  alt={
                    mainImage.alternativeText ||
                    activeSlide.title
                  }
                />
              </div>
            )}

            {/* Secondary Image */}
            {secondaryImage && (
              <div className={styles.secondaryImage}>
                <img
                  src={getImageUrl(secondaryImage.url)}
                  alt={
                    secondaryImage.alternativeText ||
                    activeSlide.title
                  }
                />
              </div>
            )}
          </div>
        </div>

      </div>
    </section>
  );
}
