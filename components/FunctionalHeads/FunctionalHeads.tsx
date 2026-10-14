"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import styles from "./FunctionalHeads.module.css";
import {
  FunctionalHeadsData,
  FunctionalHead,
  RichTextBlock,
} from "@/types/functionalHeads";

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
      setCurrentIndex((prev) => prev - 1);
    }
  };

  const handleNext = () => {
    if (canGoNext) {
      setCurrentIndex((prev) => prev + 1);
    }
  };

  return (
    <>
      <section className={styles.section}>
        <div className={styles.container}>
          <div className={styles.header}>
            {data.heading && (
              <h2 className={styles.heading}>{data.heading}</h2>
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

                  return (
                    <div
                      className={styles.slide}
                      key={head.id}
                    >
                      <article className={styles.card}>
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
                              sizes="(max-width: 767px) 100vw, (max-width: 1023px) 33.333vw, 20vw"
                            />
                          )}

                          <div className={styles.overlay}>
                            <div className={styles.overlayText}>
                              <h3>{head.name}</h3>

                              {head.designation && (
                                <p>{head.designation}</p>
                              )}
                            </div>

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
              <button
                type="button"
                onClick={handlePrevious}
                disabled={!canGoPrevious}
                aria-label="Previous"
              >
                ←
              </button>

              <button
                type="button"
                onClick={handleNext}
                disabled={!canGoNext}
                aria-label="Next"
              >
                →
              </button>
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