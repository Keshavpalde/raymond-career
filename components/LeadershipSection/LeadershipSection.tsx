"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import Image from "next/image";

import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";
import type { Swiper as SwiperInstance } from "swiper/types";

import "swiper/css";
import "swiper/css/navigation";

import styles from "./LeadershipSection.module.css";

import LeaderCard from "./LeaderCard";
import VideoModal from "./VideoModal";

import {
  LeadershipSectionData,
  LeaderItem,
} from "@/types/leadership";

const STRAPI_URL =
  process.env.NEXT_PUBLIC_STRAPI_URL ||
  "http://localhost:1337";

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

function getRichText(blocks: any[] = []) {
  return blocks
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

  useEffect(() => {
    swiperRef.current?.update();

    const timeout = setTimeout(() => {
      swiperRef.current?.update();
    }, 460);

    return () => clearTimeout(timeout);
  }, [activeLeader]);

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
              modules={[Navigation]}
              navigation
              spaceBetween={24}
              slidesPerView="auto"
              onSwiper={(swiper) => {
                swiperRef.current = swiper;
              }}
              className={styles.slider}
            >
              {data.leaders.map((leader) => (
                <SwiperSlide
                  key={leader.id}
                  style={{ width: "auto" }}
                >
                  <LeaderCard
                    leader={leader}
                    active={
                      activeLeader?.id ===
                      leader.id
                    }
                    onClick={() =>
                      setActiveLeader(
                        leader
                      )
                    }
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