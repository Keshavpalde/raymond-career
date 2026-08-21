"use client";

import { useState } from "react";
import styles from "./GlimpseIntoOurWorld.module.css";

import {
  GlimpseIntoOurWorldData,
  RichTextBlock,
} from "@/types/lifeAtRaymondRealtyPage";

interface GlimpseIntoOurWorldProps {
  data: GlimpseIntoOurWorldData;
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

export default function GlimpseIntoOurWorld({
  data,
}: GlimpseIntoOurWorldProps) {
  const [selectedItem, setSelectedItem] = useState<number | null>(null);

  if (!data) {
    return null;
  }

  const selectedData =
    selectedItem !== null
      ? data.glimpseItem?.[selectedItem]
      : null;

  return (
    <>
      <section className={styles.section}>
        <div className={styles.container}>

          {/* Heading */}
          <div className={styles.headingWrapper}>
            <h2>{data.heading}</h2>

            <div className={styles.description}>
              <p>{getRichText(data.description)}</p>
            </div>
          </div>

          {/* Gallery */}
          <div className={styles.gallery}>
            {data.glimpseItem?.map((item, index) => {
              const imageUrl = getMediaUrl(item.image?.url);

              return (
                <button
                  key={item.image?.id || index}
                  type="button"
                  className={styles.galleryItem}
                  onClick={() => setSelectedItem(index)}
                >
                  <img
                    src={imageUrl}
                    alt={
                      item.image?.alternativeText ||
                      item.title
                    }
                  />

                  <div className={styles.imageOverlay} />

                  <div className={styles.cardContent}>
                    <span>{item.title}</span>

                    <span className={styles.arrow}>
                      ↗
                    </span>
                  </div>
                </button>
              );
            })}
          </div>

        </div>
      </section>

      {/* Popup */}
      {selectedData && (
        <div
          className={styles.modalOverlay}
          onClick={() => setSelectedItem(null)}
        >
          <div
            className={styles.modal}
            onClick={(event) => event.stopPropagation()}
          >

            {/* Modal Header */}
            <div className={styles.modalHeader}>

              <h3>{selectedData.title}</h3>

              <div className={styles.modalDescription}>
                <p>
                  {getRichText(
                    selectedData.description
                  )}
                </p>
              </div>

              <button
                type="button"
                className={styles.closeButton}
                onClick={() => setSelectedItem(null)}
                aria-label="Close"
              >
                ×
              </button>

            </div>

            {/* Popup Gallery */}
            <div className={styles.modalGallery}>
              {selectedData.galleryImages?.map(
                (image, index) => {
                  const imageUrl = getMediaUrl(
                    image.url
                  );

                  return (
                    <div
                      className={styles.modalImage}
                      key={image.id || index}
                    >
                      <img
                        src={imageUrl}
                        alt={
                          image.alternativeText ||
                          selectedData.title
                        }
                      />
                    </div>
                  );
                }
              )}
            </div>

          </div>
        </div>
      )}
    </>
  );
}