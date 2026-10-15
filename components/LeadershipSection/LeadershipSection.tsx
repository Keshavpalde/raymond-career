"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import Image from "next/image";

import { Swiper, SwiperSlide } from "swiper/react";
import type { Swiper as SwiperInstance } from "swiper/types";

import "swiper/css";

import styles from "./LeadershipSection.module.css";

import LeaderCard from "./LeaderCard";
import VideoModal from "./VideoModal";
import SliderArrow from "@/components/SliderArrow/SliderArrow";

import {
  LeadershipSectionData,
  LeaderItem,
} from "@/types/leadership";

const STRAPI_URL =
  process.env.NEXT_PUBLIC_STRAPI_URL ||
  "http://localhost:1337";

const MOBILE_QUERY = "(max-width: 768px)";

interface Props {
  data: LeadershipSectionData;
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

function getRichText(blocks?: any[] | null) {
  return (blocks || [])
    .map((block) =>
      block.children
        ?.map((child: any) => child.text)
        .join("")
    )
    .join("\n");
}

export default function LeadershipSection({
  data,
}: Props) {
  const [activeLeader, setActiveLeader] =
    useState<LeaderItem | null>(
      data?.leaders?.find(
        (leader) => leader.expanded
      ) || null
    );

  const [videoOpen, setVideoOpen] =
    useState(false);

  const swiperRef = useRef<SwiperInstance | null>(null);

  // Mirrors Swiper's edge state so the arrows can disable
  // themselves at the first / last card.
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

  // On mobile every card shows its expanded image with the
  // play button straight away, so there's no click-to-expand.
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const query = window.matchMedia(MOBILE_QUERY);
    const update = () => setIsMobile(query.matches);

    update();
    query.addEventListener("change", update);

    return () => query.removeEventListener("change", update);
  }, []);

  useEffect(() => {
    swiperRef.current?.update();

    const timeout = setTimeout(() => {
      swiperRef.current?.update();
    }, 460);

    return () => clearTimeout(timeout);
  }, [activeLeader, isMobile]);

  const backgroundImage = useMemo(() => {
    if (!data?.backgroundImage)
      return "";

    return data.backgroundImage.url.startsWith(
      "http"
    )
      ? data.backgroundImage.url
      : `${STRAPI_URL}${data.backgroundImage.url}`;
  }, [data]);

  return (
    <>
      <section
        className={styles.section}
        style={{
          backgroundImage: backgroundImage
            ? `url(${backgroundImage})`
            : undefined,
        }}
      >
        <div className={styles.container}>
          <div className={styles.content}>
            <h2 className={styles.heading}>
              {renderHeading(data.heading)}
            </h2>

            <p className={styles.description}>
              {getRichText(data.description)}
            </p>

            <Swiper
              spaceBetween={24}
              slidesPerView="auto"
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
              {data.leaders.map((leader) => (
                <SwiperSlide
                  key={leader.id}
                  style={{ width: "auto" }}
                >
                  <LeaderCard
                    leader={leader}
                    mobile={isMobile}
                    active={
                      activeLeader?.id ===
                      leader.id
                    }
                    onClick={() => {
                      if (!isMobile) {
                        setActiveLeader(leader);
                      }
                    }}
                    onPlay={() => {
                      setActiveLeader(
                        leader
                      );
                      setVideoOpen(true);
                    }}
                  />
                </SwiperSlide>
              ))}
            </Swiper>

            {!sliderEdges.isLocked && (
              <div className={styles.sliderControls}>
                <SliderArrow
                  direction="prev"
                  onClick={() => swiperRef.current?.slidePrev()}
                  disabled={sliderEdges.isBeginning}
                  aria-label="Previous leader"
                />

                <SliderArrow
                  direction="next"
                  onClick={() => swiperRef.current?.slideNext()}
                  disabled={sliderEdges.isEnd}
                  aria-label="Next leader"
                />
              </div>
            )}
          </div>
        </div>
      </section>

      {activeLeader && (
        <VideoModal
          open={videoOpen}
          onClose={() =>
            setVideoOpen(false)
          }
          leader={activeLeader}
        />
      )}
    </>
  );
}