"use client";

import { useRef } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination } from "swiper/modules";
import type { Swiper as SwiperInstance } from "swiper/types";

import "swiper/css";
import "swiper/css/pagination";

import styles from "./Recognition.module.css";
import SliderArrow from "@/components/SliderArrow/SliderArrow";
import {
  RecognitionData,
  RichTextBlock,
  StrapiImage,
} from "@/types/madeForMorePage";

interface RecognitionProps {
  data: RecognitionData;
}

function getRichText(blocks?: RichTextBlock[] | null) {
  return (blocks || [])
    .map((block) =>
      block.children?.map((child) => child.text || "").join("")
    )
    .join("\n");
}

function getMediaUrl(url?: string) {
  if (!url) return "";

  return url.startsWith("http")
    ? url
    : `${process.env.NEXT_PUBLIC_STRAPI_URL}${url}`;
}

interface CardSliderProps {
  slides: StrapiImage[];
  title: string;
  delay: number;
}

function CardSlider({ slides, title, delay }: CardSliderProps) {
  const swiperRef = useRef<SwiperInstance | null>(null);
  const hasMultiple = slides.length > 1;

  return (
    <div className={styles.sliderWrapper}>
      <Swiper
        className={styles.slider}
        modules={[Autoplay, Pagination]}
        slidesPerView={1}
        loop={hasMultiple}
        pagination={{ clickable: true }}
        onSwiper={(swiper) => {
          swiperRef.current = swiper;
        }}
        autoplay={
          hasMultiple
            ? { delay, disableOnInteraction: false }
            : false
        }
      >
        {slides.map((image, imageIndex) => (
          <SwiperSlide key={image.id ?? imageIndex}>
            <img
              src={getMediaUrl(image.url)}
              alt={
                image.alternativeText ||
                `${title} ${imageIndex + 1}`
              }
              className={styles.slideImage}
            />
          </SwiperSlide>
        ))}
      </Swiper>

      {hasMultiple && (
        <>
          <SliderArrow
            direction="prev"
            className={`${styles.cardArrow} ${styles.cardArrowPrev}`}
            onClick={() => swiperRef.current?.slidePrev()}
            aria-label={`Previous ${title} image`}
          />

          <SliderArrow
            direction="next"
            className={`${styles.cardArrow} ${styles.cardArrowNext}`}
            onClick={() => swiperRef.current?.slideNext()}
            aria-label={`Next ${title} image`}
          />
        </>
      )}
    </div>
  );
}

export default function Recognition({
  data,
}: RecognitionProps) {
  if (!data) {
    return null;
  }

  const items = data.recognitionItems || [];

  return (
    <section className={styles.section}>
      <div className={styles.container}>

        {/* Section Header */}
        <div className={styles.header}>
          <h2>{data.heading}</h2>

          <div className={styles.introText}>
            {getRichText(data.description)
              .split("\n")
              .filter(Boolean)
              .map((text, index) => (
                <p key={index}>{text}</p>
              ))}
          </div>
        </div>

        {/* Recognition Cards */}
        <div className={styles.grid}>
          {items.map((item, index) => {
            const recognitionItem = item.recognitionItemNew;

            if (!recognitionItem) {
              return null;
            }

            const logo = recognitionItem.image;
            const logoUrl = getMediaUrl(logo?.url);
            const slides = (recognitionItem.images || []).filter(
              (image) => image?.url
            );

            return (
              <div
                className={styles.card}
                key={index}
              >
                {/* Image slider */}
                {slides.length > 0 && (
                  <CardSlider
                    slides={slides}
                    title={recognitionItem.title}
                    // Offset each card so they don't all
                    // change at the same moment.
                    delay={3500 + index * 500}
                  />
                )}

                <div className={styles.cardBody}>
                  {/* Logo + title */}
                  <div className={styles.titleRow}>
                    {logoUrl && (
                      <div className={styles.logoWrapper}>
                        <img
                          src={logoUrl}
                          alt={
                            logo.alternativeText ||
                            recognitionItem.title ||
                            "Recognition"
                          }
                        />
                      </div>
                    )}

                    <h3>{recognitionItem.title}</h3>
                  </div>

                  {/* Divider */}
                  <div className={styles.divider} />

                  {/* Description */}
                  <div className={styles.description}>
                    {getRichText(recognitionItem.description)
                      .split("\n")
                      .filter(Boolean)
                      .map((text, descriptionIndex) => (
                        <p key={descriptionIndex}>{text}</p>
                      ))}
                  </div>
                </div>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
}
