"use client";

import styles from "./Celebrations.module.css";
import {
  CelebrationsData,
  RichTextBlock,
} from "@/types/madeForMorePage";

interface CelebrationsProps {
  data: CelebrationsData;
}

function getRichText(blocks: RichTextBlock[] = []) {
  return blocks
    .map((block) =>
      block.children?.map((child) => child.text || "").join("")
    )
    .join("\n");
}

export default function Celebrations({
  data,
}: CelebrationsProps) {
  if (!data) {
    return null;
  }

  const images = data.images || [];

  return (
    <section className={styles.section}>
      <div className={styles.container}>
        <div className={styles.grid}>
          {/* Top Left Image */}
          {images[0] && (
            <div className={`${styles.imageItem} ${styles.imageTopLeft}`}>
              <img
                src={
                  images[0].url?.startsWith("http")
                    ? images[0].url
                    : `${process.env.NEXT_PUBLIC_STRAPI_URL}${images[0].url}`
                }
                alt={images[0].alternativeText || ""}
              />
            </div>
          )}

          {/* Center Content Card */}
          <div className={styles.contentCard}>
            <h2>{data.heading}</h2>

            <div className={styles.description}>
              {getRichText(data.description)
                .split("\n")
                .map((text, index) => (
                  <p key={index}>{text}</p>
                ))}
            </div>
          </div>

          {/* Top Right Image */}
          {images[1] && (
            <div className={`${styles.imageItem} ${styles.imageTopRight}`}>
              <img
                src={
                  images[1].url?.startsWith("http")
                    ? images[1].url
                    : `${process.env.NEXT_PUBLIC_STRAPI_URL}${images[1].url}`
                }
                alt={images[1].alternativeText || ""}
              />
            </div>
          )}

          {/* Bottom Images */}
          {images.slice(2, 6).map((image, index) => (
            <div
              key={index}
              className={`${styles.imageItem} ${styles.bottomImage}`}
            >
              <img
                src={
                  image.url?.startsWith("http")
                    ? image.url
                    : `${process.env.NEXT_PUBLIC_STRAPI_URL}${image.url}`
                }
                alt={image.alternativeText || ""}
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}