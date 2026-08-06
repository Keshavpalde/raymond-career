"use client";

import Image from "next/image";

import styles from "./MadeForMore.module.css";

import { MadeForMoreTab } from "@/types/madeForMore";

interface Props {
  tab: MadeForMoreTab;
}

const STRAPI_URL =
  process.env.NEXT_PUBLIC_STRAPI_URL ||
  "http://localhost:1337";

function getRichText(blocks: any[] = []) {
  return blocks
    .map((block) =>
      block.children
        ?.map((child: any) => child.text)
        .join("")
    )
    .join("\n");
}

export default function ContentPanel({
  tab,
}: Props) {
  const imageUrl =
    tab.contentImage?.url?.startsWith("http")
      ? tab.contentImage.url
      : `${STRAPI_URL}${tab.contentImage?.url}`;

  return (
    <div className={styles.contentPanel}>
      {/* IMAGE */}

      <div className={styles.imageWrapper}>
        <Image
          src={imageUrl}
          alt={
            tab.contentImage?.alternativeText ||
            tab.tabTitle
          }
          fill
          unoptimized
          className={styles.image}
          sizes="50vw"
        />
      </div>

      {/* CONTENT */}

      <div className={styles.contentWrapper}>
        {tab.contentItems?.map((item) => (
          <div
            key={item.id}
            className={styles.contentItem}
          >
            <h3 className={styles.title}>
              {item.title}
            </h3>

            <p className={styles.text}>
              {getRichText(item.description)}
            </p>
          </div>
        ))}

        {(() => {
          const lastItemWithLink = [
            ...(tab.contentItems ?? []),
          ]
            .reverse()
            .find(
              (item) =>
                item.learnMoreText &&
                item.learnMoreLink
            );

          return (
            lastItemWithLink && (
              <a
                href={lastItemWithLink.learnMoreLink}
                className={styles.learnMore}
              >
                {lastItemWithLink.learnMoreText}
              </a>
            )
          );
        })()}
      </div>
    </div>
  );
}