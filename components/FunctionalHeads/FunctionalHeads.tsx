"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import clsx from "clsx";
import styles from "./FunctionalHeads.module.css";
import {
  FunctionalHeadsData,
  FunctionalHead,
  RichTextBlock,
} from "@/types/functionalHeads";
import SliderArrow from "@/components/SliderArrow/SliderArrow";

interface FunctionalHeadsProps {
  data: FunctionalHeadsData;
}

function getMediaUrl(url?: string) {
  if (!url) return "";

  if (url.startsWith("http://") || url.startsWith("https://")) {
    return url;
  }

  const strapiUrl = process.env.NEXT_PUBLIC_STRAPI_URL || "";

  return `${strapiUrl}${url}`;
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

function hasRichText(blocks?: RichTextBlock[] | null) {
  return (blocks || []).some((block) =>
    block?.children?.some((child) => child?.text?.trim())
  );
}

function renderRichText(blocks?: RichTextBlock[]) {
  if (!blocks || !Array.isArray(blocks)) {
    return null;
  }

  return blocks.map((block, index) => {
    const text = block?.children
      ?.map((child) => child?.text || "")
      .join("");

    if (!text) return null;

    return <p key={index}>{text}</p>;
  });
}

export default function FunctionalHeads({
  data,
}: FunctionalHeadsProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [visibleCount, setVisibleCount] = useState(5);
  const [selectedHead, setSelectedHead] =
    useState<FunctionalHead | null>(null);
  const [openDescriptionId, setOpenDescriptionId] = useState<
    number | null
  >(null);

  const functionHeads = data?.functionHeads || [];

  useEffect(() => {
    const updateVisibleCount = () => {
      if (window.innerWidth <= 767) {
        setVisibleCount(1);
      } else if (window.innerWidth <= 1023) {
        setVisibleCount(3);
      } else {
        setVisibleCount(5);
      }
    };

    updateVisibleCount();

    window.addEventListener("resize", updateVisibleCount);

    return () => {
      window.removeEventListener("resize", updateVisibleCount);
    };
  }, []);

  useEffect(() => {
    const maxIndex = Math.max(
      functionHeads.length - visibleCount,
      0
    );

    if (currentIndex > maxIndex) {
      setCurrentIndex(maxIndex);
    }
  }, [visibleCount, functionHeads.length, currentIndex]);

  useEffect(() => {
    if (openDescriptionId === null) return;

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setOpenDescriptionId(null);
      }
    };

    window.addEventListener("keydown", handleKeyDown);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [openDescriptionId]);

  if (!data || functionHeads.length === 0) {
    return null;
  }

  const maxIndex = Math.max(
    functionHeads.length - visibleCount,
    0
  );

  const canGoPrevious = currentIndex > 0;
  const canGoNext = currentIndex < maxIndex;

  const handlePrevious = () => {
    if (canGoPrevious) {
      setOpenDescriptionId(null);
      setCurrentIndex((prev) => prev - 1);
    }
  };

  const handleNext = () => {
    if (canGoNext) {
      setOpenDescriptionId(null);
      setCurrentIndex((prev) => prev + 1);
    }
  };

  return (
    <>
      <section className={styles.section}>
        <div className={styles.container}>
          <div className={styles.header}>
            {data.heading && (
              <h2 className={styles.heading}>
                {renderHeading(data.heading)}
              </h2>
            )}

            {data.description && (
              <div className={styles.intro}>
                {renderRichText(data.description)}
              </div>
            )}
          </div>

          <div className={styles.sliderWrapper}>
            <div className={styles.sliderViewport}>
              <div
                className={styles.sliderTrack}
                style={
                  {
                    "--visible": visibleCount,
                    transform: `translateX(calc(-100% / var(--visible) * ${currentIndex}))`,
                  } as React.CSSProperties
                }
              >
                {functionHeads.map((head) => {
                  const imageUrl = getMediaUrl(head.image?.url);
                  const hasDescription = hasRichText(head.description);
                  const isDescriptionOpen =
                    openDescriptionId === head.id;
                  const descriptionId = `functional-head-description-${head.id}`;

                  return (
                    <div
                      className={styles.slide}
                      key={head.id}
                    >
                      <article
                        className={clsx(
                          styles.card,
                          isDescriptionOpen && styles.cardOpen
                        )}
                      >
                        <div className={styles.imageWrapper}>
                          {imageUrl && (
                            <Image
                              src={imageUrl}
                              alt={
                                head.image?.alternativeText ||
                                head.name
                              }
                              fill
                              className={styles.image}
                              quality={90}
                              // Landscape photos are cropped into portrait
                              // cards, so the rendered image is ~1.8x wider
                              // than the card itself.
                              sizes="(max-width: 480px) 540px, (max-width: 767px) 640px, (max-width: 1023px) 60vw, (max-width: 1400px) 36vw, 510px"
                            />
                          )}

                          {hasDescription && (
                            <div
                              id={descriptionId}
                              className={styles.descriptionPanel}
                              aria-hidden={!isDescriptionOpen}
                            >
                              <span
                                className={styles.quoteMark}
                                aria-hidden="true"
                              >
                                &ldquo;
                              </span>

                              <div className={styles.descriptionText}>
                                {renderRichText(head.description)}
                              </div>
                            </div>
                          )}

                          <div className={styles.overlay}>
                            <div className={styles.overlayText}>
                              <h3>{head.name}</h3>

                              {head.designation && (
                                <p>{head.designation}</p>
                              )}
                            </div>

                            <div className={styles.actions}>
                              {head.video?.url && (
                                <button
                                  type="button"
                                  className={styles.playButton}
                                  onClick={() =>
                                    setSelectedHead(head)
                                  }
                                  aria-label={`Play video for ${head.name}`}
                                >
                                  <span className={styles.playIcon}>
                                    ▶
                                  </span>
                                </button>
                              )}

                              {hasDescription && (
                                <button
                                  type="button"
                                  className={styles.toggleButton}
                                  onClick={() =>
                                    setOpenDescriptionId(
                                      isDescriptionOpen ? null : head.id
                                    )
                                  }
                                  aria-expanded={isDescriptionOpen}
                                  aria-controls={descriptionId}
                                  aria-label={
                                    isDescriptionOpen
                                      ? `Hide message from ${head.name}`
                                      : `Read message from ${head.name}`
                                  }
                                >
                                  <span
                                    className={styles.toggleIcon}
                                    aria-hidden="true"
                                  />
                                </button>
                              )}
                            </div>
                          </div>
                        </div>
                      </article>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>

          {functionHeads.length > visibleCount && (
            <div className={styles.sliderControls}>
              <SliderArrow
                direction="prev"
                onClick={handlePrevious}
                disabled={!canGoPrevious}
                aria-label="Previous"
              />

              <SliderArrow
                direction="next"
                onClick={handleNext}
                disabled={!canGoNext}
                aria-label="Next"
              />
            </div>
          )}
        </div>
      </section>

      {selectedHead && (
        <div
          className={styles.modalOverlay}
          onClick={() => setSelectedHead(null)}
        >
          <div
            className={styles.modal}
            onClick={(event) => event.stopPropagation()}
          >
            <button
              type="button"
              className={styles.closeButton}
              onClick={() => setSelectedHead(null)}
              aria-label="Close"
            >
              ×
            </button>

            <div className={styles.modalVideo}>
              <video
                src={getMediaUrl(selectedHead.video?.url)}
                controls
                autoPlay
                playsInline
              />
            </div>

            <div className={styles.modalContent}>
              <h3>{selectedHead.name}</h3>

              {selectedHead.designation && (
                <p className={styles.modalDesignation}>
                  {selectedHead.designation}
                </p>
              )}

              <div className={styles.modalDescription}>
                {renderRichText(selectedHead.description)}
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}