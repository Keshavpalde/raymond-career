"use client";

import { useState } from "react";
import styles from "./OurWorkplaceCulture.module.css";

import {
  OurWorkplaceCultureData,
  RichTextBlock,
} from "@/types/diversityInclusionPage";

interface OurWorkplaceCultureProps {
  data: OurWorkplaceCultureData | null;
}

const STRAPI_URL = process.env.NEXT_PUBLIC_STRAPI_URL;

function getRichText(blocks?: RichTextBlock[] | null) {
  return (blocks || [])
    .map((block) =>
      block.children?.map((child) => child.text).join("")
    )
    .join("\n");
}

function renderHeading(heading: string) {
  const [firstWord, ...rest] = heading.trim().split(" ");

  return (
    <>
      <span className={styles.headingAccent}>{firstWord}</span>{" "}
      {rest.join(" ")}
    </>
  );
}

function getMediaUrl(url?: string) {
  if (!url) return "";

  return url.startsWith("http")
    ? url
    : `${STRAPI_URL}${url}`;
}

export default function OurWorkplaceCulture({
  data,
}: OurWorkplaceCultureProps) {
  const [activeIndex, setActiveIndex] = useState(0);

  if (!data) {
    return null;
  }

  const slides = data.slides || [];

  if (slides.length === 0) {
    return null;
  }

  const activeSlide = slides[activeIndex];

  const mediaUrl = getMediaUrl(
    activeSlide?.media?.url
  );

  const goToPrevious = () => {
    setActiveIndex((current) =>
      current === 0
        ? slides.length - 1
        : current - 1
    );
  };

  const goToNext = () => {
    setActiveIndex((current) =>
      current === slides.length - 1
        ? 0
        : current + 1
    );
  };

  return (
    <section className={styles.section}>
      <div className={styles.container}>

        {/* =====================================
            Left Content - Fixed
        ====================================== */}

        <div className={styles.content}>
          <h2 className={styles.heading}>
            {renderHeading(data.heading)}
          </h2>

          <div className={styles.description}>
            {getRichText(data.description)}
          </div>
        </div>

        {/* =====================================
            Right Media Slider
        ====================================== */}

        <div className={styles.mediaColumn}>

          <div className={styles.mediaWrapper}>

            {activeSlide.mediaType === "video" ? (
              <div className={styles.videoWrapper}>
                <video
                  src={mediaUrl}
                  className={styles.media}
                  controls
                  playsInline
                  preload="metadata"
                />
              </div>
            ) : (
              <img
                src={mediaUrl}
                alt={
                  activeSlide.media
                    ?.alternativeText ||
                  data.heading
                }
                className={styles.media}
              />
            )}

            {/* Video Play Indicator */}

            {activeSlide.mediaType === "video" && (
              <div className={styles.playButton}>
                ▶
              </div>
            )}

          </div>

          {/* =================================
              Navigation
          ================================== */}

          <div className={styles.navigation}>

            <button
              type="button"
              className={styles.arrow}
              onClick={goToPrevious}
              aria-label="Previous slide"
            >
              ←
            </button>

            <button
              type="button"
              className={styles.arrow}
              onClick={goToNext}
              aria-label="Next slide"
            >
              →
            </button>

          </div>

        </div>

      </div>
    </section>
  );
}