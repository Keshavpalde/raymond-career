"use client";

import { useEffect, useRef, useState } from "react";
import styles from "./InsideOurWorkplace.module.css";
import {
  InsideOurWorkplaceData,
  RichTextBlock,
} from "@/types/lifeAtRaymondRealtyPage";

interface InsideOurWorkplaceProps {
  data: InsideOurWorkplaceData;
}

function getRichText(blocks?: RichTextBlock[] | null) {
  return (blocks || [])
    .map((block) =>
      block.children?.map((child) => child.text).join("")
    )
    .join("\n");
}

function renderHeading(heading: string) {
  const words = heading.trim().split(" ");
  const lastWord = words.pop();

  return (
    <>
      {words.join(" ")}{" "}
      <span className={styles.headingAccent}>{lastWord}</span>
    </>
  );
}

const STRAPI_URL = process.env.NEXT_PUBLIC_STRAPI_URL;
const AUTOSLIDE_INTERVAL = 3500;

export default function InsideOurWorkplace({
  data,
}: InsideOurWorkplaceProps) {
  const sectionRef = useRef<HTMLElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const [activeIndex, setActiveIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const [isInView, setIsInView] = useState(false);

  const items = data?.workplaceItems || [];

  const goTo = (index: number) => {
    if (items.length === 0) {
      return;
    }

    setActiveIndex((index + items.length) % items.length);
  };

  useEffect(() => {
    const track = trackRef.current;
    const card = track?.children[activeIndex] as
      | HTMLElement
      | undefined;

    if (track && card) {
      track.scrollTo({
        left: card.offsetLeft,
        behavior: "smooth",
      });
    }
  }, [activeIndex]);

  useEffect(() => {
    const section = sectionRef.current;

    if (!section) {
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => setIsInView(entry.isIntersecting),
      { threshold: 0.4 }
    );

    observer.observe(section);

    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (isPaused || !isInView || items.length <= 1) {
      return;
    }

    const id = setInterval(() => {
      setActiveIndex((current) => (current + 1) % items.length);
    }, AUTOSLIDE_INTERVAL);

    return () => clearInterval(id);
  }, [isPaused, isInView, items.length]);

  if (!data) {
    return null;
  }

  return (
    <section className={styles.section} ref={sectionRef}>
      <div className={styles.container}>
        <div className={styles.header}>
          <h2 className={styles.heading}>
            {renderHeading(data.heading)}
          </h2>

          <div className={styles.descriptionWrapper}>
            <p>{getRichText(data.description)}</p>
          </div>
        </div>

        <div
          className={styles.carouselWrapper}
          onMouseEnter={() => setIsPaused(true)}
          onMouseLeave={() => setIsPaused(false)}
        >
          <div className={styles.track} ref={trackRef}>
            {items.map((item, index) => {
              const imageUrl = item.image?.url?.startsWith("http")
                ? item.image.url
                : `${STRAPI_URL}${item.image?.url}`;

              return (
                <div
                  className={styles.card}
                  key={index}
                >
                  <div className={styles.imageWrapper}>
                    <img
                      src={imageUrl}
                      alt={item.image?.alternativeText || item.title}
                    />
                  </div>

                  <h3>{item.title}</h3>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      <div className={styles.navRow}>
        <div className={styles.navInner}>
          <button
            type="button"
            className={styles.arrow}
            onClick={() => goTo(activeIndex - 1)}
            aria-label="Previous workplace"
          >
            <span>←</span>
          </button>

          <button
            type="button"
            className={styles.arrow}
            onClick={() => goTo(activeIndex + 1)}
            aria-label="Next workplace"
          >
            <span>→</span>
          </button>
        </div>
      </div>
    </section>
  );
}
