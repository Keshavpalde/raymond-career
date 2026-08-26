"use client";

import styles from "./HouseConcept.module.css";

import {
  HouseConceptData,
  RichTextBlock,
} from "@/types/houseConceptPage";

interface HouseConceptProps {
  data: HouseConceptData | null;
}

const STRAPI_URL =
  process.env.NEXT_PUBLIC_STRAPI_URL;

function getMediaUrl(url?: string): string {
  if (!url) {
    return "";
  }

  return url.startsWith("http")
    ? url
    : `${STRAPI_URL}${url}`;
}

function getRichText(
  blocks?: RichTextBlock[] | null
): string {
  return (blocks || [])
    .map((block) =>
      block.children
        ?.map((child) => child.text)
        .join("")
    )
    .join("\n");
}

export default function HouseConcept({
  data,
}: HouseConceptProps) {
  if (!data) {
    return null;
  }

  const videoUrl = getMediaUrl(
    data.video?.url
  );

  const backgroundImageUrl = getMediaUrl(
    data.backgroundImage?.url
  );

  return (
    <section
      className={styles.section}
      style={
        backgroundImageUrl
          ? {
              backgroundImage: `url("${backgroundImageUrl}")`,
            }
          : undefined
      }
    >
      {/* Background overlay */}
      <div className={styles.backgroundOverlay} />

      <div className={styles.container}>
        {/* Heading */}
        <h2 className={styles.heading}>
          {data.heading}
        </h2>

        {/* Description */}
        <div className={styles.description}>
          <p>
            {getRichText(data.description)}
          </p>
        </div>

        {/* Video */}
        {videoUrl && (
          <div className={styles.videoWrapper}>
            <video
              className={styles.video}
              controls
              playsInline
              preload="metadata"
            >
              <source
                src={videoUrl}
                type={
                  data.video?.mime ||
                  "video/mp4"
                }
              />

              Your browser does not support
              the video tag.
            </video>
          </div>
        )}
      </div>
    </section>
  );
}