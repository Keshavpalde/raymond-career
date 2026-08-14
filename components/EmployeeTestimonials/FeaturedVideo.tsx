"use client";

import { useEffect, useState } from "react";
import Image from "next/image";

import styles from "./EmployeeTestimonials.module.css";

import { TestimonialItem } from "@/types/employeeTestimonials";

interface Props {
  testimonial: TestimonialItem;
  onPrev: () => void;
  onNext: () => void;
}

const STRAPI_URL =
  process.env.NEXT_PUBLIC_STRAPI_URL ||
  "http://localhost:1337";

function resolveUrl(url?: string) {
  if (!url) return "";

  return url.startsWith("http")
    ? url
    : `${STRAPI_URL}${url}`;
}

function getRichText(blocks: any[] = []) {
  return blocks
    .map((block) =>
      block.children
        ?.map((child: any) => child.text)
        .join("")
    )
    .join("\n");
}

export default function FeaturedVideo({
  testimonial,
  onPrev,
  onNext,
}: Props) {
  const [isPlaying, setIsPlaying] = useState(false);

  useEffect(() => {
    setIsPlaying(false);
  }, [testimonial.id]);

  const employeePhoto = resolveUrl(
    testimonial.employeePhoto?.url
  );

  const thumbnailUrl = resolveUrl(
    testimonial.thumbnailImage?.url ||
      testimonial.employeePhoto?.url
  );

  const uploadedVideo = resolveUrl(
    testimonial.uploadedVideo?.url
  );

  const youtubeId = testimonial.youtubeUrl
    ?.replace("https://youtu.be/", "")
    ?.replace(
      "https://www.youtube.com/watch?v=",
      ""
    );

  return (
    <div className={styles.featuredWrapper}>
      {/* ===========================
          VIDEO
      =========================== */}

      <div className={styles.videoWrapper}>
        {isPlaying ? (
          testimonial.videoType === "youtube" &&
          youtubeId ? (
            <iframe
              src={`https://www.youtube.com/embed/${youtubeId}?autoplay=1`}
              title={testimonial.employeeName}
              allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
              className={styles.iframe}
            />
          ) : (
            <video
              className={styles.video}
              controls
              autoPlay
              preload="metadata"
            >
              <source
                src={uploadedVideo}
                type="video/mp4"
              />
            </video>
          )
        ) : (
          <button
            type="button"
            className={styles.videoThumbnail}
            onClick={() => setIsPlaying(true)}
            aria-label={`Play ${testimonial.employeeName}'s testimonial`}
          >
            {thumbnailUrl && (
              <Image
                src={thumbnailUrl}
                alt={testimonial.employeeName}
                fill
                unoptimized
                className={styles.thumbnailImage}
              />
            )}

            <div className={styles.videoOverlay} />

            <div className={styles.nameOverlay}>
              <h3 className={styles.overlayName}>
                {testimonial.employeeName}
              </h3>

              <p className={styles.overlayDesignation}>
                {testimonial.designation}
              </p>
            </div>

            <span className={styles.playButton}>
              <svg
                width="26"
                height="26"
                viewBox="0 0 24 24"
                fill="currentColor"
              >
                <path d="M8 5v14l11-7z" />
              </svg>
            </span>
          </button>
        )}
      </div>

      {/* ===========================
          DETAILS
      =========================== */}

      <div className={styles.employeeDetails}>
        <div className={styles.profile}>
          <div className={styles.profileImage}>
            {employeePhoto && (
              <Image
                src={employeePhoto}
                alt={testimonial.employeeName}
                fill
                unoptimized
                className={styles.image}
              />
            )}
          </div>

          <div>
            <h3 className={styles.employeeName}>
              {testimonial.employeeName}
            </h3>

            <p className={styles.designation}>
              {testimonial.designation}
            </p>
          </div>
        </div>

        <div className={styles.quote}>
          <p>
            &ldquo;{getRichText(testimonial.quote)}&rdquo;
          </p>
        </div>

        <div className={styles.navArrows}>
          <button
            type="button"
            onClick={onPrev}
            aria-label="Previous testimonial"
            className={styles.navArrow}
          >
            ←
          </button>

          <button
            type="button"
            onClick={onNext}
            aria-label="Next testimonial"
            className={styles.navArrow}
          >
            →
          </button>
        </div>
      </div>
    </div>
  );
}
