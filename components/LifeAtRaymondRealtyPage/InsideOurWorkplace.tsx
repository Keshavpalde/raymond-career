"use client";

import { useEffect, useRef, useState } from "react";
import styles from "./InsideOurWorkplace.module.css";
import {
  InsideOurWorkplaceData,
  RichTextBlock,
} from "@/types/lifeAtRaymondRealtyPage";
import SliderArrow from "@/components/SliderArrow/SliderArrow";

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

  // Last index that still fills the track (3 cards on desktop),
  // so stepping never lands on a position that can't scroll.
  const getMaxIndex = () => {
    const track = trackRef.current;
    const card = track?.children[0] as HTMLElement | undefined;

    if (!track || !card || card.offsetWidth === 0) {
      return Math.max(items.length - 1, 0);
    }

    const visible = Math.max(
      Math.round(track.clientWidth / card.offsetWidth),
      1
    );

    return Math.max(items.length - visible, 0);
  };

  const goTo = (index: number) => {
    const maxIndex = getMaxIndex();

    if (index > maxIndex) {
      setActiveIndex(0);
    } else if (index < 0) {
      setActiveIndex(maxIndex);
    } else {
      setActiveIndex(index);
    }
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
      setActiveIndex((current) =>
        current + 1 > getMaxIndex() ? 0 : current + 1
      );
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
          <SliderArrow
            direction="prev"
            onClick={() => goTo(activeIndex - 1)}
            aria-label="Previous workplace"
          />

          <SliderArrow
            direction="next"
            onClick={() => goTo(activeIndex + 1)}
            aria-label="Next workplace"
          />
        </div>
      </div>
    </section>
  );
}
