"use client";

import { useEffect } from "react";
import styles from "./LeadershipSection.module.css";
import { LeaderItem } from "@/types/leadership";

interface Props {
  open: boolean;
  onClose: () => void;
  leader: LeaderItem;
}

const STRAPI_URL =
  process.env.NEXT_PUBLIC_STRAPI_URL ||
  "http://localhost:1337";

export default function VideoModal({
  open,
  onClose,
  leader,
}: Props) {
  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";

    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        onClose();
      }
    };

    window.addEventListener("keydown", handleEscape);

    return () => {
      document.body.style.overflow = "";
      window.removeEventListener(
        "keydown",
        handleEscape
      );
    };
  }, [open, onClose]);

  if (!open) return null;

  const videoUrl =
    leader.video?.url &&
    (leader.video.url.startsWith("http")
      ? leader.video.url
      : `${STRAPI_URL}${leader.video.url}`);

  return (
    <div
      className={styles.modalOverlay}
      onClick={onClose}
    >
      <div
        className={styles.modal}
        onClick={(e) => e.stopPropagation()}
      >
        <button
          className={styles.closeButton}
          onClick={onClose}
          aria-label="Close Video"
        >
          ✕
        </button>

        {leader.videoType === "youtube" &&
        leader.youtubeUrl ? (
          <iframe
            className={styles.videoFrame}
            src={leader.youtubeUrl.replace(
              "watch?v=",
              "embed/"
            )}
            title={leader.name}
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          />
        ) : videoUrl ? (
          <video
            className={styles.videoFrame}
            controls
            autoPlay
          >
            <source
              src={videoUrl}
              type="video/mp4"
            />
            Your browser does not support HTML5
            video.
          </video>
        ) : (
          <div className={styles.noVideo}>
            No video available.
          </div>
        )}
      </div>
    </div>
  );
}