"use client";

import styles from "./GrowthEnvironment.module.css";

import {
  GrowthEnvironmentData,
  RichTextBlock,
} from "@/types/lifeAtRaymondRealtyPage";

interface GrowthEnvironmentProps {
  data: GrowthEnvironmentData;
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

export default function GrowthEnvironment({
  data,
}: GrowthEnvironmentProps) {
  if (!data) {
    return null;
  }

  const imageUrl = getMediaUrl(data.image?.url);

  return (
    <section className={styles.section}>
      <div className={styles.container}>

        {/* =========================================
            Left Content
        ========================================= */}

        <div className={styles.content}>

          <h2>{data.heading}</h2>

          <div className={styles.items}>
            {data.growthItems?.map((item, index) => (
              <div
                className={styles.item}
                key={index}
              >
                <div className={styles.itemLine} />

                <div className={styles.itemContent}>
                  <h3>{item.title}</h3>

                  <p>
                    {getRichText(item.description)}
                  </p>
                </div>
              </div>
            ))}
          </div>

        </div>

        {/* =========================================
            Right Image
        ========================================= */}

        <div className={styles.imageWrapper}>

          <img
            src={imageUrl}
            alt={
              data.image?.alternativeText ||
              data.heading
            }
            className={styles.image}
          />

          {/* =========================================
              Quote Box
          ========================================= */}

          <div className={styles.quoteBox}>
            <div className={styles.quote}>
              "{data.quote}"
            </div>

            <div className={styles.quoteBy}>
              {data.quoteBy}
            </div>
          </div>

        </div>

      </div>
    </section>
  );
}