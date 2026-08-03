"use client";

import React, { useEffect, useState } from "react";
import styles from "./Hero.module.css";
import { getStrapiMedia } from "@/lib/getStrapiMedia";

interface HeroVideoProps {
  videoUrl: string;
}

export default function HeroVideo({ videoUrl }: HeroVideoProps) {
  const src = getStrapiMedia(videoUrl);
  const [error, setError] = useState(false);

  useEffect(() => {
    // Reset error when source changes and log source for debugging
    setError(false);
    // eslint-disable-next-line no-console
    console.log("HeroVideo: src=", src);
  }, [src]);

  if (!src || error) {
    return (
      <div style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        height: "100%",
        background: "#000",
        color: "#fff",
      }}>
        Video unavailable
      </div>
    );
  }

  return (
    <video
      autoPlay
      muted
      loop
      playsInline
      className={styles.video}
      onError={(e) => {
        // eslint-disable-next-line no-console
        console.error("HeroVideo load error", src, e);
        setError(true);
      }}
      onLoadedData={() => {
        // eslint-disable-next-line no-console
        console.log("HeroVideo loaded", src);
      }}
    >
      <source src={src} type="video/mp4" />
      Your browser does not support the video tag.
    </video>
  );
}