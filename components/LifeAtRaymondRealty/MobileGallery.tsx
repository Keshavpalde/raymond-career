"use client";

import Link from "next/link";

import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination } from "swiper/modules";

import "swiper/css";
import "swiper/css/pagination";

import GalleryCard from "./GalleryCard";

import styles from "./LifeAtRaymondRealty.module.css";

import { GalleryImage } from "@/types/lifeAtRaymondRealty";

interface Props {
  images: GalleryImage[];
  heading: string;
  buttonText: string;
  buttonLink: string;
}

// Mobile layout: heading, swipeable image slider, then the
// View All button. Replaces the desktop mosaic grid.
export default function MobileGallery({
  images,
  heading,
  buttonText,
  buttonLink,
}: Props) {
  const slides = images.filter((item) => item.image);

  return (
    <div className={styles.mobileGallery}>
      <h2 className={styles.mobileHeading}>
        {heading}
      </h2>

      <Swiper
        modules={[Autoplay, Pagination]}
        slidesPerView={1.15}
        spaceBetween={12}
        // Matches --mobile-gutter in app/globals.css
        slidesOffsetBefore={20}
        slidesOffsetAfter={20}
        loop={slides.length > 2}
        autoplay={{
          delay: 3500,
          disableOnInteraction: false,
        }}
        pagination={{
          clickable: true,
          dynamicBullets: true,
        }}
        className={styles.mobileSlider}
      >
        {slides.map((image) => (
          <SwiperSlide key={image.id}>
            <div className={styles.mobileSlide}>
              <GalleryCard image={image} />
            </div>
          </SwiperSlide>
        ))}
      </Swiper>

      {buttonText && buttonLink && (
        <div className={styles.mobileActions}>
          <Link
            href={buttonLink}
            className={`${styles.viewAllButton} ${styles.mobileViewAll}`}
          >
            <span>{buttonText}</span>

            <svg
              width="18"
              height="18"
              viewBox="0 0 24 24"
              fill="none"
            >
              <path
                d="M5 12H19"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
              />

              <path
                d="M13 6L19 12L13 18"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </Link>
        </div>
      )}
    </div>
  );
}
