"use client";

import { useEffect, useRef, useState } from "react";
import styles from "./StoriesThatInspire.module.css";

import {
  StoriesThatInspireData,
  RichTextBlock,
} from "@/types/lifeAtRaymondRealtyPage";

interface StoriesThatInspireProps {
  data: StoriesThatInspireData;
}

const STRAPI_URL = process.env.NEXT_PUBLIC_STRAPI_URL;

function getRichText(blocks: RichTextBlock[] = []) {
  return blocks
    .map((block) =>
      block.children?.map((child) => child.text).join("")
    )
    .join("\n");
}

function getMediaUrl(url?: string) {
  if (!url) return "";

  return url.startsWith("http")
    ? url
    : `${STRAPI_URL}${url}`;
}

export default function StoriesThatInspire({
  data,
}: StoriesThatInspireProps) {
  const sliderRef = useRef<HTMLDivElement>(null);

  const [isHovered, setIsHovered] = useState(false);

  /*
   * Auto slider
   */
  useEffect(() => {
    if (!sliderRef.current) return;

    if (isHovered) return;

    const interval = setInterval(() => {
      const slider = sliderRef.current;

      if (!slider) return;

      const card = slider.querySelector(
        `.${styles.card}`
      ) as HTMLElement | null;

      if (!card) return;

      const gap = 20;

      const scrollAmount = card.offsetWidth + gap;

      /*
       * If we have reached the end,
       * start again from the beginning.
       */
      if (
        slider.scrollLeft + slider.clientWidth >=
        slider.scrollWidth - 5
      ) {
        slider.scrollTo({
          left: 0,
          behavior: "smooth",
        });

        return;
      }

      slider.scrollBy({
        left: scrollAmount,
        behavior: "smooth",
      });
    }, 3000);

    return () => {
      clearInterval(interval);
    };
  }, [isHovered]);

  /*
   * If this section is empty in Strapi,
   * don't render anything.
   */
  if (!data) {
    return null;
  }

  return (
    <section className={styles.section}>
      {/* ================================
          Section Heading
      ================================= */}

      <div className={styles.headingWrapper}>
        <h2>{data.heading}</h2>

        <div className={styles.description}>
          <p>{getRichText(data.description)}</p>
        </div>
      </div>

      {/* ================================
          Slider
      ================================= */}

      <div
        ref={sliderRef}
        className={styles.slider}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        {data.storyItems?.map((item, index) => {
          const imageUrl = getMediaUrl(
            item.image?.url
          );

          return (
            <article
              className={styles.card}
              key={item.image?.id || index}
            >
              {/* Image */}

              <img
                src={imageUrl}
                alt={
                  item.image?.alternativeText ||
                  item.name
                }
                className={styles.image}
              />

              {/* Dark gradient */}

              <div className={styles.overlay} />

              {/* Card content */}

              <div className={styles.cardContent}>
                <h3>{item.name}</h3>

                <p className={styles.designation}>
                  {item.designation}
                </p>

                <div className={styles.storyDescription}>
                  <p>
                    {getRichText(item.description)}
                  </p>
                </div>
              </div>
            </article>
          );
        })}
      </div>
    </section>
  );
}