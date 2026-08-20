"use client";

import { useState } from "react";
import styles from "./WellbeingFirst.module.css";
import {
  WellbeingFirstData,
  RichTextBlock,
} from "@/types/madeForMorePage";

interface WellbeingFirstProps {
  data: WellbeingFirstData;
}

function getRichText(blocks: RichTextBlock[] = []) {
  return blocks
    .map((block) =>
      block.children?.map((child) => child.text || "").join("")
    )
    .join("\n");
}

export default function WellbeingFirst({
  data,
}: WellbeingFirstProps) {
  const [activeIndex, setActiveIndex] = useState(0);

  if (!data) {
    return null;
  }

  const slides = data.wellbeingSlides || [];
  const activeSlide = slides[activeIndex]?.wellbeingSlide;

  if (!activeSlide) {
    return null;
  }

  const images = activeSlide.images || [];

  const getImageUrl = (url?: string) => {
    if (!url) {
      return "";
    }

    return url.startsWith("http")
      ? url
      : `${process.env.NEXT_PUBLIC_STRAPI_URL}${url}`;
  };

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

        {/* Section Header */}
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

        {/* Slider */}
        <div className={styles.slider}>

          {/* Content Card */}
          <div className={styles.contentCard}>
            <h3>{activeSlide.title}</h3>

            <div className={styles.description}>
              {getRichText(activeSlide.description)
                .split("\n")
                .filter(Boolean)
                .map((text, index) => (
                  <p key={index}>{text}</p>
                ))}
            </div>
          </div>

          {/* Images */}
          <div className={styles.images}>
            {images.slice(0, 3).map((image, index) => {
              const imageUrl = getImageUrl(image.url);

              return (
                <div
                  className={styles.imageWrapper}
                  key={image.id || index}
                >
                  {imageUrl && (
                    <img
                      src={imageUrl}
                      alt={
                        image.alternativeText ||
                        `${activeSlide.title} ${index + 1}`
                      }
                    />
                  )}
                </div>
              );
            })}
          </div>
        </div>

        {/* Navigation */}
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

      </div>
    </section>
  );
}