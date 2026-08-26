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
        <div className={styles.housesWrapper}>

          <div className={styles.centerLine} />

          {houses.map((house, index) => {
            const logoUrl = getMediaUrl(
              house.logo?.url
            );

            const position =
              index % 2 === 0
                ? styles.left
                : styles.right;

            return (
              <div
                key={house.id || index}
                className={`${styles.houseRow} ${position}`}
              >

                {/* Horizontal connector */}
                <div
                  className={styles.connector}
                />

                {/* House */}
                <div
                  className={`${styles.houseCard} ${
                    styles[`house${index + 1}`]
                  }`}
                >

                  {/* Logo */}
                  <div className={styles.logoWrapper}>
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
                  </div>

                  {/* Content */}
                  <div className={styles.houseContent}>
                    <h3>{house.name}</h3>

                    {house.description && (
                      <p>
                        {getRichText(
                          house.description
                        )}
                      </p>
                    )}
                  </div>

                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}