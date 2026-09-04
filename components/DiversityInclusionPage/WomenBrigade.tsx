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

// Some GIFs are exported with a finite (or missing) loop
// count, so the browser plays them once and freezes on the
// last frame. Restarting the <img> src on an interval forces
// the animation to replay continuously regardless of how the
// source file was encoded.
const GIF_RESTART_INTERVAL_MS = 6000;

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
  const gifRef = useRef<HTMLImageElement>(null);
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

  const gifUrl = getMediaUrl(data?.Gif?.url);
  const backgroundUrl = getMediaUrl(data?.backgroundImage?.url);

  useEffect(() => {
    if (!gifUrl) {
      return;
    }

    const interval = setInterval(() => {
      const img = gifRef.current;

      if (!img) {
        return;
      }

      img.src = "";
      img.src = gifUrl;
    }, GIF_RESTART_INTERVAL_MS);

    return () => clearInterval(interval);
  }, [gifUrl]);

  if (!data) {
    return null;
  }

  return (
    <section
      ref={sectionRef}
      className={styles.section}
      style={
        backgroundUrl
          ? { backgroundImage: `url(${backgroundUrl})` }
          : undefined
      }
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
            GIF (bounded panel)
        ========================== */}

        <div
          className={`${styles.mediaWrapper} ${
            isVisible ? styles.mediaVisible : ""
          }`}
        >
          {gifUrl && (
            <img
              ref={gifRef}
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