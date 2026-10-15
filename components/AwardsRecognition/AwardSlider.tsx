"use client";

import { useRef, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import type { Swiper as SwiperInstance } from "swiper/types";

import "swiper/css";

import styles from "./AwardsRecognition.module.css";

import AwardCard from "./AwardCard";
import SliderArrow from "@/components/SliderArrow/SliderArrow";

import { AwardItem } from "@/types/awardsRecognition";

interface Props {
  awards: AwardItem[];
}

export default function AwardSlider({
  awards,
}: Props) {
  const swiperRef = useRef<SwiperInstance | null>(null);

  // Mirrors Swiper's edge state so the arrows can disable
  // themselves at the first / last award.
  const [sliderEdges, setSliderEdges] = useState({
    isBeginning: true,
    isEnd: false,
    isLocked: false,
  });

  const syncSliderEdges = (swiper: SwiperInstance) => {
    setSliderEdges({
      isBeginning: swiper.isBeginning,
      isEnd: swiper.isEnd,
      isLocked: swiper.isLocked,
    });
  };

  return (
    <div className={styles.sliderWrapper}>
      <Swiper
        spaceBetween={30}
        slidesPerView={4}
        breakpoints={{
          0: {
            slidesPerView: 1,
          },

          768: {
            slidesPerView: 2,
          },

          1024: {
            slidesPerView: 3,
          },

          1400: {
            slidesPerView: 4,
          },
        }}
        onSwiper={(swiper) => {
          swiperRef.current = swiper;
          syncSliderEdges(swiper);
        }}
        onProgress={syncSliderEdges}
        onResize={syncSliderEdges}
        onLock={syncSliderEdges}
        onUnlock={syncSliderEdges}
        className={styles.slider}
      >
        {awards.map((award) => (
          <SwiperSlide key={award.id}>
            <AwardCard award={award} />
          </SwiperSlide>
        ))}
      </Swiper>

      {!sliderEdges.isLocked && (
        <div className={styles.sliderControls}>
          <SliderArrow
            direction="prev"
            onClick={() => swiperRef.current?.slidePrev()}
            disabled={sliderEdges.isBeginning}
            aria-label="Previous awards"
          />

          <SliderArrow
            direction="next"
            onClick={() => swiperRef.current?.slideNext()}
            disabled={sliderEdges.isEnd}
            aria-label="Next awards"
          />
        </div>
      )}
    </div>
  );
}
