"use client";

import Image from "next/image";

import styles from "./LifeAtRaymondRealty.module.css";

import { GalleryImage } from "@/types/lifeAtRaymondRealty";

interface Props {
  image: GalleryImage;
}

const STRAPI_URL =
  process.env.NEXT_PUBLIC_STRAPI_URL ||
  "http://localhost:1337";

export default function GalleryCard({
  image,
}: Props) {
  if (!image?.image) {
    return null;
  }

  const imageUrl =
    image.image.url.startsWith("http")
      ? image.image.url
      : `${STRAPI_URL}${image.image.url}`;

  const card = (
    <div className={styles.galleryCard}>
      <Image
        src={imageUrl}
        alt={
          image.altText ||
          image.image.alternativeText ||
          "Gallery Image"
        }
        fill
        unoptimized
        className={styles.galleryImage}
        sizes="(max-width:768px) 50vw, 240px"
      />
    </div>
  );

  if (image.imageLink) {
    return (
      <a
        href={image.imageLink}
        target={
          image.openInNewTab
            ? "_blank"
            : "_self"
        }
        rel="noopener noreferrer"
        className={styles.galleryLink}
      >
        {card}
      </a>
    );
  }

  return card;
}