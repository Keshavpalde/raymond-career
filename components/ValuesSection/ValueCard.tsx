"use client";

import Image from "next/image";
import styles from "./ValuesSection.module.css";

import { ValueItem } from "@/types/valuesSection";

interface Props {
  item: ValueItem;
}

import { getStrapiMedia } from "@/lib/getStrapiMedia";

function getText(blocks?: any[]) {
  if (!blocks?.length) return "";

  return blocks
    .map((block) =>
      block.children
        ?.map((child: any) => child.text)
        .join("")
    )
    .join("\n");
}

export default function ValueCard({
  item,
}: Props) {

  // Support both flat `icon.url` and nested Strapi relation `icon.data.attributes.url`
  const rawIconUrl =
    item.icon && "url" in item.icon
      ? item.icon.url
      : item.icon?.data?.attributes?.url;

  const iconUrl = getStrapiMedia(rawIconUrl ?? null);

  // Debug: log item shape and resolved icon URL when icons fail
  if (!iconUrl) {
    // eslint-disable-next-line no-console
    console.warn("ValueCard: missing icon for item", item);
  } else {
    // eslint-disable-next-line no-console
    console.log("ValueCard: iconUrl", iconUrl, "for item", item.id ?? item.title);
  }

  return (

    <div
    className={styles.card}
    data-value-card
>

      {iconUrl ? (
        <Image
          src={iconUrl}
          alt={item.title}
          width={56}
          height={56}
          unoptimized
          className={styles.icon}
        />
      ) : null}

      <h3 className={styles.cardTitle}>
        {item.title}
      </h3>

      <p className={styles.cardDescription}>
        {getText(item.description)}
      </p>

    </div>

  );
}