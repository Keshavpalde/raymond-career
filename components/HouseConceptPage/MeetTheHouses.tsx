"use client";

import styles from "./MeetTheHouses.module.css";

import {
  MeetTheHousesData,
  RichTextBlock,
} from "@/types/houseConceptPage";

interface MeetTheHousesProps {
  data: MeetTheHousesData;
}

const STRAPI_URL = process.env.NEXT_PUBLIC_STRAPI_URL;

// Shared S-curve that shapes the left edge of every team photo
// (and the coloured band peeking out behind it). Expressed in
// objectBoundingBox units so it scales with each card.
const WAVE_CLIP_ID = "meet-the-houses-wave";

const WAVE_PATH =
  "M0.16,0 L1,0 L1,1 L0.34,1" +
  " C0.12,0.88 0,0.68 0.03,0.48" +
  " C0.06,0.28 0.13,0.12 0.16,0 Z";

function getRichText(blocks?: RichTextBlock[] | null) {
  return (blocks || [])
    .map((block) =>
      block.children
        ?.map((child) => child.text)
        .join("")
    )
    .join("\n");
}

function getMediaUrl(url?: string) {
  if (!url) {
    return "";
  }

  return url.startsWith("http")
    ? url
    : `${STRAPI_URL}${url}`;
}

export default function MeetTheHouses({
  data,
}: MeetTheHousesProps) {
  if (!data) {
    return null;
  }

  const houses = data.houses || [];

  return (
    <section className={styles.section}>
      <svg
        className={styles.clipDefs}
        width="0"
        height="0"
        aria-hidden="true"
      >
        <defs>
          <clipPath
            id={WAVE_CLIP_ID}
            clipPathUnits="objectBoundingBox"
          >
            <path d={WAVE_PATH} />
          </clipPath>
        </defs>
      </svg>

      <div className={styles.container}>

        {/* Heading */}
        <div className={styles.headingWrapper}>
          <h2 className={styles.heading}>
            {data.heading}
          </h2>

          {data.description && (
            <div className={styles.description}>
              <p>
                {getRichText(data.description)}
              </p>
            </div>
          )}
        </div>

        {/* Houses */}
        <div className={styles.housesGrid}>
          {houses.map((house, index) => {
            const logoUrl = getMediaUrl(
              house.logo?.url
            );

            const imageUrl = getMediaUrl(
              house.image?.url
            );

            return (
              <article
                key={house.id || index}
                className={`${styles.houseCard} ${
                  styles[`house${(index % 4) + 1}`]
                } ${imageUrl ? styles.hasImage : ""}`}
              >
                {/* Content */}
                <div className={styles.houseContent}>
                  {logoUrl && (
                    <img
                      src={logoUrl}
                      alt={
                        house.logo
                          ?.alternativeText ||
                        house.name
                      }
                      className={styles.logo}
                    />
                  )}

                  <h3>{house.name}</h3>

                  <span
                    className={styles.underline}
                    aria-hidden="true"
                  />

                  {house.description && (
                    <p>
                      {getRichText(
                        house.description
                      )}
                    </p>
                  )}
                </div>

                {/* Team photo */}
                {imageUrl && (
                  <div className={styles.media}>
                    <span
                      className={styles.wave}
                      aria-hidden="true"
                    />

                    <img
                      src={imageUrl}
                      alt={
                        house.image
                          ?.alternativeText ||
                        `${house.name} team`
                      }
                      className={styles.photo}
                    />
                  </div>
                )}
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}
