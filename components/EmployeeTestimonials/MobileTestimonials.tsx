"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";

import { Swiper, SwiperSlide } from "swiper/react";
import type { Swiper as SwiperInstance } from "swiper/types";

import "swiper/css";

import styles from "./EmployeeTestimonials.module.css";

import { TestimonialItem } from "@/types/employeeTestimonials";

interface Props {
  testimonials: TestimonialItem[];
  initialIndex?: number;
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

function getYoutubeId(url?: string) {
  return url
    ?.replace("https://youtu.be/", "")
    ?.replace("https://www.youtube.com/watch?v=", "");
}

// Mobile layout: one slide per testimonial with a video card
// (Leadership Thoughts style) and the name, designation and
// quote underneath. The play button opens the video in a modal.
export default function MobileTestimonials({
  testimonials,
  initialIndex = 0,
}: Props) {
  const swiperRef = useRef<SwiperInstance | null>(null);

  const [playing, setPlaying] =
    useState<TestimonialItem | null>(null);

  useEffect(() => {
    if (!playing) return;

    document.body.style.overflow = "hidden";

    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape") setPlaying(null);
    };

    window.addEventListener("keydown", handleEscape);

    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", handleEscape);
    };
  }, [playing]);

  const youtubeId =
    playing?.videoType === "youtube"
      ? getYoutubeId(playing.youtubeUrl)
      : undefined;

  const uploadedVideo = resolveUrl(playing?.uploadedVideo?.url);

  return (
    <div className={styles.mobileTestimonials}>
      <Swiper
        initialSlide={initialIndex}
        spaceBetween={16}
        slidesPerView={1}
        autoHeight
        onSwiper={(swiper) => {
          swiperRef.current = swiper;
        }}
      >
        {testimonials.map((item) => {
          const thumbnailUrl = resolveUrl(
            item.thumbnailImage?.url ||
              item.employeePhoto?.url
          );

          return (
            <SwiperSlide key={item.id}>
              <div className={styles.mobileCard}>
                {thumbnailUrl && (
                  <Image
                    src={thumbnailUrl}
                    alt={item.employeeName}
                    fill
                    unoptimized
                    className={styles.thumbnailImage}
                    sizes="100vw"
                  />
                )}

                <div className={styles.mobileCardOverlay} />

                <button
                  type="button"
                  className={styles.mobilePlayButton}
                  onClick={() => setPlaying(item)}
                  aria-label={`Play ${item.employeeName}'s testimonial`}
                >
                  <svg
                    width="26"
                    height="26"
                    viewBox="0 0 24 24"
                    fill="currentColor"
                  >
                    <path d="M8 5v14l11-7z" />
                  </svg>
                </button>
              </div>

              <div className={styles.mobileDetails}>
                <h3 className={styles.employeeName}>
                  {item.employeeName}
                </h3>

                <p className={styles.designation}>
                  {item.designation}
                </p>

                <div className={styles.quote}>
                  <p>
                    &ldquo;{getRichText(item.quote)}&rdquo;
                  </p>
                </div>
              </div>
            </SwiperSlide>
          );
        })}
      </Swiper>

      {testimonials.length > 1 && (
        <div className={styles.mobileNav}>
          <button
            type="button"
            onClick={() => swiperRef.current?.slidePrev()}
            aria-label="Previous testimonial"
            className={styles.navArrow}
          >
            ←
          </button>

          <button
            type="button"
            onClick={() => swiperRef.current?.slideNext()}
            aria-label="Next testimonial"
            className={styles.navArrow}
          >
            →
          </button>
        </div>
      )}

      {playing && (
        <div
          className={styles.modalOverlay}
          onClick={() => setPlaying(null)}
        >
          <div
            className={styles.modal}
            onClick={(event) => event.stopPropagation()}
          >
            <button
              type="button"
              className={styles.closeButton}
              onClick={() => setPlaying(null)}
              aria-label="Close video"
            >
              ✕
            </button>

            {youtubeId ? (
              <iframe
                src={`https://www.youtube.com/embed/${youtubeId}?autoplay=1`}
                title={playing.employeeName}
                allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
                className={styles.iframe}
              />
            ) : uploadedVideo ? (
              <video
                className={styles.video}
                controls
                autoPlay
                playsInline
              >
                <source
                  src={uploadedVideo}
                  type="video/mp4"
                />
              </video>
            ) : (
              <div className={styles.noVideo}>
                No video available.
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
