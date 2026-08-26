"use client";

import { useRef } from "react";
import styles from "./DiversityInAction.module.css";

import {
  DiversityInActionData,
  RichTextBlock,
} from "@/types/diversityInclusionPage";

interface DiversityInActionProps {
  data: DiversityInActionData | null;
}

const STRAPI_URL = process.env.NEXT_PUBLIC_STRAPI_URL;

function getRichText(blocks?: RichTextBlock[] | null) {
  if (!blocks) {
    return "";
  }

  return blocks
    .map((block) =>
      block.children
        ?.map((child) => child.text)
        .join("")
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

function getMediaUrl(url?: string | null) {
  if (!url) {
    return "";
  }

  return url.startsWith("http")
    ? url
    : `${STRAPI_URL}${url}`;
}

export default function DiversityInAction({
  data,
}: DiversityInActionProps) {
  const sliderRef = useRef<HTMLDivElement>(null);

  if (!data) {
    return null;
  }

  const initiatives = data.initiatives || [];

  const scrollNext = () => {
    const slider = sliderRef.current;

    if (!slider) {
      return;
    }

    slider.scrollBy({
      left: slider.clientWidth,
      behavior: "smooth",
    });
  };

  const scrollPrevious = () => {
    const slider = sliderRef.current;

    if (!slider) {
      return;
    }

    slider.scrollBy({
      left: -slider.clientWidth,
      behavior: "smooth",
    });
  };

  return (
    <section className={styles.section}>
      <div className={styles.container}>

        {/* Section Header */}

        <div className={styles.header}>
          <h2>{renderHeading(data.heading)}</h2>

          {data.description && (
            <div className={styles.description}>
              <p>
                {getRichText(data.description)}
              </p>
            </div>
          )}
        </div>

        {/* Slider */}

        <div
          ref={sliderRef}
          className={styles.slider}
        >
          {initiatives.map((initiative, index) => {
            const imageUrl = getMediaUrl(
              initiative.image?.url
            );

            return (
              <article
                className={styles.card}
                key={initiative.id || index}
              >
                {/* Image */}

                <div className={styles.imageWrapper}>
                  {imageUrl && (
                    <img
                      src={imageUrl}
                      alt={
                        initiative.image
                          ?.alternativeText ||
                        initiative.title
                      }
                      className={styles.image}
                    />
                  )}

                  {/* Hover Overlay */}

                  <div className={styles.hoverOverlay}>
                    <div className={styles.hoverContent}>
                      {initiative.hoverText && (
                        <p>
                          {getRichText(
                            initiative.hoverText
                          )}
                        </p>
                      )}
                    </div>
                  </div>
                </div>

                {/* Title */}

                <div className={styles.titleWrapper}>
                  <h3>{initiative.title}</h3>
                </div>
              </article>
            );
          })}
        </div>

        {/* Navigation */}

        {initiatives.length > 0 && (
          <div className={styles.navigation}>
            <button
              type="button"
              className={styles.arrow}
              onClick={scrollPrevious}
              aria-label="Previous initiatives"
            >
              ←
            </button>

            <button
              type="button"
              className={styles.arrow}
              onClick={scrollNext}
              aria-label="Next initiatives"
            >
              →
            </button>
          </div>
        )}
      </div>
    </section>
  );
}