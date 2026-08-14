"use client";

import Image from "next/image";

import styles from "./AwardsRecognition.module.css";

import { AwardItem } from "@/types/awardsRecognition";

const STRAPI_URL =
  process.env.NEXT_PUBLIC_STRAPI_URL ||
  "http://localhost:1337";

interface Props {
  award: AwardItem;
}

function getDescription(blocks?: any[] | null) {
  return (blocks ?? [])
    .map((block) =>
      block.children
        ?.map((child: any) => child.text)
        .join("")
    )
    .join("\n");
}

export default function AwardCard({
  award,
}: Props) {
  const imageUrl =
    award.awardImage?.url?.startsWith("http")
      ? award.awardImage.url
      : award.awardImage?.url
      ? `${STRAPI_URL}${award.awardImage.url}`
      : undefined;

  return (
    <div className={styles.card}>
      {imageUrl && (
        <div className={styles.cardImage}>
          <Image
            src={imageUrl}
            alt={award.awardTitle || "Award"}
            fill
            unoptimized
            className={styles.image}
          />
        </div>
      )}

      <div className={styles.cardContent}>
        <h3>{award.awardTitle}</h3>

        <p>
          {getDescription(
            award.awardDescription
          )}
        </p>
      </div>
    </div>
  );
}
