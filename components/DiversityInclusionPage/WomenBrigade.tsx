"use client";

import { useEffect, useRef, useState } from "react";
import styles from "./WomenBrigade.module.css";

import {
  WomenBrigadeData,
  RichTextBlock,
} from "@/types/diversityInclusionPage";

interface WomenBrigadeProps {
  data: WomenBrigadeData | null;
}

const STRAPI_URL = process.env.NEXT_PUBLIC_STRAPI_URL;

function getRichText(blocks?: RichTextBlock[] | null) {
  return (blocks || [])
    .map((block) =>
      block.children?.map((child) => child.text).join("")
    )
    .join("\n");
}

function getMediaUrl(url?: string | null) {
  if (!url) return "";

  return url.startsWith("http")
    ? url
    : `${STRAPI_URL}${url}`;
}

function renderHeading(heading: string) {
  const [firstWord, ...rest] = heading.trim().split(" ");

  return (
    <>
      <span className={styles.headingAccent}>{firstWord}</span>{" "}
      {rest.join(" ")}
    </>
  );
}

export default function WomenBrigade({
  data,
}: WomenBrigadeProps) {
  const sectionRef = useRef<HTMLElement>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const section = sectionRef.current;

    if (!section) {
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.disconnect();
        }
      },
      {
        threshold: 0.2,
      }
    );

    observer.observe(section);

    return () => observer.disconnect();
  }, []);

  if (!data) {
    return null;
  }

  const gifUrl = getMediaUrl(data.Gif?.url);

  return (
    <section
      ref={sectionRef}
      className={styles.section}
    >
      <div className={styles.container}>
        {/* =========================
            Content
        ========================== */}

        <div className={styles.content}>
          <h2 className={styles.heading}>
            {renderHeading(data.heading)}
          </h2>

          <div className={styles.description}>
            <p>
              {getRichText(data.description)}
            </p>
          </div>

          {data.points?.length > 0 && (
            <ul className={styles.points}>
              {data.points.map((point) => (
                <li
                  key={point.id}
                  className={styles.point}
                >
                  <span className={styles.bullet}>
                    ·
                  </span>

                  <span>{point.text}</span>
                </li>
              ))}
            </ul>
          )}
        </div>

        {/* =========================
            GIF
        ========================== */}

        <div
          className={`${styles.mediaWrapper} ${
            isVisible ? styles.mediaVisible : ""
          }`}
        >
          {gifUrl && (
            <img
              src={gifUrl}
              alt={data.heading || "Women Brigade"}
              className={styles.gif}
            />
          )}
        </div>
      </div>
    </section>
  );
}