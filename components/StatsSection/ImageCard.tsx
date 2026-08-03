"use client";

import Image from "next/image";
import styles from "./StatsSection.module.css";
import { StatsCardData } from "@/types/statsSection";
import { getStrapiMedia } from "@/lib/getStrapiMedia";

interface ImageCardProps {
  card: StatsCardData;
}

export default function ImageCard({ card }: ImageCardProps) {
  if (!card.image) {
    return (
      <div
        style={{
          height: "460px",
          background: "red",
          color: "#fff",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        No Image Found
      </div>
    );
  }

  // Support both flat `image.url` and nested Strapi relation `image.data.attributes.url`
  const rawImageUrl =
    card.image && "url" in card.image
      ? card.image.url
      : (card.image as any)?.data?.attributes?.url;

  const imageUrl = getStrapiMedia(rawImageUrl ?? null);

  return (
    <div className={styles.imageCard}>
      <img
        src={imageUrl}
        alt={
          // support nested alt text paths
          (card.image && (card.image as any).alternativeText) ||
          (card.image as any)?.data?.attributes?.alternativeText ||
          "Image"
        }
        className={styles.image}
        onError={(e) => {
          // eslint-disable-next-line no-console
          console.error("ImageCard load error", imageUrl, e);
        }}
      />

      <div className={styles.imageOverlay}></div>
    </div>
  );
}