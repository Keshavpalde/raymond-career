"use client";

import { useState } from "react";
import styles from "./LifeBeyondJobTitle.module.css";

import {
  LifeBeyondJobTitleData,
  RichTextBlock,
} from "@/types/lifeAtRaymondRealtyPage";

interface LifeBeyondJobTitleProps {
  data: LifeBeyondJobTitleData;
}

const STRAPI_URL = process.env.NEXT_PUBLIC_STRAPI_URL;

function getRichText(blocks?: RichTextBlock[] | null) {
  return (blocks || [])
    .map((block) =>
      block.children?.map((child) => child.text).join("")
    )
    .join("\n");
}

export default function LifeBeyondJobTitle({
  data,
}: LifeBeyondJobTitleProps) {
  const [activeIndex, setActiveIndex] = useState(0);

  if (!data) {
    return null;
  }

  return (
    <section className={styles.section}>
      <div className={styles.container}>

        {/* Heading */}
        <div className={styles.headingWrapper}>
          <h2>{data.heading}</h2>
        </div>

        {/* Cards */}
        <div className={styles.cards}>
          {data.lifeBeyondItems?.map((item, index) => {
            const imageUrl = item.image?.url?.startsWith("http")
              ? item.image.url
              : `${STRAPI_URL}${item.image?.url}`;

            const isActive = activeIndex === index;

            return (
              <article
                key={index}
                className={`${styles.card} ${
                  isActive ? styles.active : ""
                }`}
                onMouseEnter={() => setActiveIndex(index)}
                onFocus={() => setActiveIndex(index)}
                tabIndex={0}
              >
                {/* Background image */}
                <img
                  src={imageUrl}
                  alt={item.image?.alternativeText || item.title}
                  className={styles.image}
                />

                {/* Dark overlay */}
                <div className={styles.overlay} />

                {/* Content */}
                <div className={styles.content}>
                  <h3>{item.title}</h3>

                  <div
                    className={`${styles.description} ${
                      isActive ? styles.descriptionVisible : ""
                    }`}
                  >
                    <p>{getRichText(item.description)}</p>
                  </div>
                </div>
              </article>
            );
          })}
        </div>

      </div>
    </section>
  );
}