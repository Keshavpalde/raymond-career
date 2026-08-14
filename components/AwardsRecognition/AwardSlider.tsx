"use client";

import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";

import "swiper/css";
import "swiper/css/navigation";

import styles from "./AwardsRecognition.module.css";

import AwardCard from "./AwardCard";

import { AwardItem } from "@/types/awardsRecognition";

interface Props {
  awards: AwardItem[];
}

export default function AwardSlider({
  awards,
}: Props) {
  return (
    <div className={styles.sliderWrapper}>
      <Swiper
        modules={[Navigation]}
        navigation
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
        className={styles.slider}
      >
        {awards.map((award) => (
          <SwiperSlide key={award.id}>
            <AwardCard award={award} />
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
}
