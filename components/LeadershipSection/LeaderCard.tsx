"use client";

import Image from "next/image";
import styles from "./LeadershipSection.module.css";

import { LeaderItem } from "@/types/leadership";

interface Props {
  leader: LeaderItem;
  active: boolean;
  onClick: () => void;
  onPlay: () => void;
}

const STRAPI_URL =
  process.env.NEXT_PUBLIC_STRAPI_URL ||
  "http://localhost:1337";

export default function LeaderCard({
  leader,
  active,
  onClick,
  onPlay,
}: Props) {
  const activeImage =
    (active && leader.expandedImage) || leader.image;

  const imageUrl = activeImage?.url?.startsWith("http")
    ? activeImage.url
    : `${STRAPI_URL}${activeImage?.url}`;

  return (
    <div
      className={`
        ${styles.card}
        ${active ? styles.activeCard : ""}
      `}
      onClick={onClick}
    >
      {/* IMAGE */}

      <div className={styles.imageWrapper}>
        <Image
          src={imageUrl}
          alt={
            activeImage?.alternativeText ||
            leader.name
          }
          fill
          unoptimized
          className={styles.image}
          sizes="(max-width:768px) 100vw,20vw"
        />

        <div className={styles.overlay}></div>

        {/* PLAY BUTTON */}

        <button
          className={styles.playButton}
          onClick={(e) => {
            e.stopPropagation();
            onPlay();
          }}
        >
          ▶
        </button>
      </div>

      {/* CONTENT */}

      <div className={styles.cardContent}>
        <h3 className={styles.name}>
          {leader.name}
        </h3>

        <p className={styles.designation}>
          {leader.designation}
        </p>

        {active && (
          <div className={styles.quoteBlock}>
            <span className={styles.quoteIcon}>&ldquo;</span>
            <p className={styles.quoteText}>
              {leader.quote ||
                "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua."}
            </p>
          </div>
        )}
      </div>
    </div>
  );
}