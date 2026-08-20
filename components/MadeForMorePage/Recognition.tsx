"use client";

import styles from "./Recognition.module.css";
import {
  RecognitionData,
  RichTextBlock,
} from "@/types/madeForMorePage";

interface RecognitionProps {
  data: RecognitionData;
}

function getRichText(blocks: RichTextBlock[] = []) {
  return blocks
    .map((block) =>
      block.children?.map((child) => child.text || "").join("")
    )
    .join("\n");
}

export default function Recognition({
  data,
}: RecognitionProps) {
  if (!data) {
    return null;
  }

  const items = data.recognitionItems || [];

  return (
    <section className={styles.section}>
      <div className={styles.container}>

        {/* Section Header */}
        <div className={styles.header}>
          <h2>{data.heading}</h2>

          <div className={styles.introText}>
            {getRichText(data.description)
              .split("\n")
              .filter(Boolean)
              .map((text, index) => (
                <p key={index}>{text}</p>
              ))}
          </div>
        </div>

        {/* Recognition Cards */}
        <div className={styles.grid}>
          {items.map((item, index) => {
            const recognitionItem = item.recognitionItemNew;

            if (!recognitionItem) {
              return null;
            }

            const image = recognitionItem.image;

            const imageUrl = image?.url
              ? image.url.startsWith("http")
                ? image.url
                : `${process.env.NEXT_PUBLIC_STRAPI_URL}${image.url}`
              : "";

            return (
              <div
                className={styles.card}
                key={index}
              >
                {/* Image */}
                <div className={styles.imageWrapper}>
                  {imageUrl && (
                    <img
                      src={imageUrl}
                      alt={
                        image.alternativeText ||
                        recognitionItem.title ||
                        "Recognition"
                      }
                    />
                  )}
                </div>

                {/* Divider */}
                <div className={styles.divider} />

                {/* Title */}
                <h3>{recognitionItem.title}</h3>

                {/* Description */}
                <div className={styles.description}>
                  {getRichText(recognitionItem.description)
                    .split("\n")
                    .filter(Boolean)
                    .map((text, descriptionIndex) => (
                      <p key={descriptionIndex}>{text}</p>
                    ))}
                </div>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
}