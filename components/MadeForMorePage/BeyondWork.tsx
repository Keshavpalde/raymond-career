"use client";

import { useState } from "react";
import styles from "./BeyondWork.module.css";

import {
  BeyondWorkData,
  RichTextBlock,
} from "@/types/madeForMorePage";

interface BeyondWorkProps {
  data: BeyondWorkData;
}

function getRichText(blocks: RichTextBlock[] = []) {
  return blocks
    .map((block) =>
      block.children?.map((child) => child.text || "").join("")
    )
    .join("\n");
}

function getImageUrl(url?: string) {
  if (!url) return "";

  return url.startsWith("http")
    ? url
    : `${process.env.NEXT_PUBLIC_STRAPI_URL}${url}`;
}

export default function BeyondWork({ data }: BeyondWorkProps) {
  const [activeIndex, setActiveIndex] = useState(0);

  const slides =
    data?.beyondWorkSlides
      ?.map((item) => item?.beyondWorkSlideNew)
      .filter(Boolean) || [];

  const activeSlide = slides[activeIndex];

  if (!activeSlide) {
    return null;
  }

  const images = activeSlide.images || [];

  const handlePrevious = () => {
    setActiveIndex((current) =>
      current === 0 ? slides.length - 1 : current - 1
    );
  };

  const handleNext = () => {
    setActiveIndex((current) =>
      current === slides.length - 1 ? 0 : current + 1
    );
  };

  return (
    <section className={styles.section}>
      <div className={styles.container}>
        {/* Slider */}
        <div className={styles.slider}>
          {/* Left Column */}
          <div className={styles.leftColumn}>
            {/* Fixed Heading & Description */}
            <div className={styles.header}>
              <h2>{data.heading}</h2>

              <div className={styles.introText}>
                {getRichText(data.description)
                  .split("\n")
                  .map((text, index) => (
                    <p key={index}>{text}</p>
                  ))}
              </div>
            </div>

            {/* Content Card */}
            <div className={styles.contentCard}>
              <h3>{activeSlide.title}</h3>

              <div className={styles.cardDescription}>
                {getRichText(activeSlide.description)
                  .split("\n")
                  .map((text, index) => (
                    <p key={index}>{text}</p>
                  ))}
              </div>
            </div>
          </div>

          {/* Images */}
          <div className={styles.imageGrid}>
            {/* Main Image */}
            {images[0] && (
              <div className={styles.mainImage}>
                <img
                  src={getImageUrl(images[0].url)}
                  alt={images[0].alternativeText || activeSlide.title}
                />
              </div>
            )}

            {/* Right Images */}
            <div className={styles.sideImages}>
              {images[1] && (
                <div className={styles.sideImage}>
                  <img
                    src={getImageUrl(images[1].url)}
                    alt={images[1].alternativeText || activeSlide.title}
                  />
                </div>
              )}

              {images[2] && (
                <div className={styles.sideImage}>
                  <img
                    src={getImageUrl(images[2].url)}
                    alt={images[2].alternativeText || activeSlide.title}
                  />
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Navigation */}
        {slides.length > 1 && (
          <div className={styles.navigation}>
            <button
              type="button"
              className={styles.arrow}
              onClick={handlePrevious}
              aria-label="Previous slide"
            >
              <span>←</span>
            </button>

            <button
              type="button"
              className={styles.arrow}
              onClick={handleNext}
              aria-label="Next slide"
            >
              <span>→</span>
            </button>
          </div>
        )}
      </div>
    </section>
  );
}