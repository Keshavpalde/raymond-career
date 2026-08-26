"use client";

import { useEffect, useRef, useState } from "react";
import styles from "./EmployeeStories.module.css";

import {
  EmployeeStoriesData,
  RichTextBlock,
} from "@/types/employeeStoriesPage";

interface EmployeeStoriesProps {
  data: EmployeeStoriesData | null;
}

const STRAPI_URL = process.env.NEXT_PUBLIC_STRAPI_URL;

function getMediaUrl(url?: string | null) {
  if (!url) {
    return "";
  }

  return url.startsWith("http")
    ? url
    : `${STRAPI_URL}${url}`;
}

function getRichText(blocks?: RichTextBlock[] | null) {
  if (!blocks) {
    return "";
  }

  return blocks
    .map((block) =>
      block.children
        ?.map((child) => child.text)
        .join("")
    )
    .join("\n");
}

export default function EmployeeStories({
  data,
}: EmployeeStoriesProps) {
  const videoRef = useRef<HTMLVideoElement>(null);

  const [activeIndex, setActiveIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);

  const stories = data?.stories || [];

  const activeStory = stories[activeIndex];

  useEffect(() => {
    setIsPlaying(false);

    if (videoRef.current) {
      videoRef.current.pause();
      videoRef.current.load();
    }
  }, [activeIndex]);

  if (!data) {
    return null;
  }

  if (stories.length === 0) {
    return null;
  }

  const videoUrl = getMediaUrl(
    activeStory.video?.url
  );

  const thumbnailUrl = getMediaUrl(
    activeStory.thumbnail?.url
  );

  const employeeImageUrl = getMediaUrl(
    activeStory.employeeImage?.url
  );

  const nextStory =
    stories.length > 1
      ? stories[(activeIndex + 1) % stories.length]
      : null;

  const peekImageUrl = nextStory
    ? getMediaUrl(nextStory.thumbnail?.url)
    : "";

  const handleStoryChange = (index: number) => {
    setActiveIndex(index);
    setIsPlaying(false);
  };

  const handlePlay = async () => {
    const video = videoRef.current;

    if (!video || !videoUrl) {
      return;
    }

    try {
      if (video.paused) {
        await video.play();
        setIsPlaying(true);
      } else {
        video.pause();
        setIsPlaying(false);
      }
    } catch (error) {
      console.error("Video playback error:", error);
    }
  };

  return (
    <section className={styles.section}>
      <div className={styles.container}>

        {/* ================================
            Heading
        ================================= */}

        <div className={styles.headingWrapper}>
          <h2 className={styles.heading}>
            {data.heading}
          </h2>

          <div className={styles.description}>
            <p>
              {getRichText(data.description)}
            </p>
          </div>
        </div>
      </div>

      {/* ================================
          Featured Story
      ================================= */}

      <div className={styles.featuredWrapper}>

        <div className={styles.featuredStory}>

          {/* Video */}

            <div className={styles.videoWrapper}>

              {videoUrl ? (
                <video
                  ref={videoRef}
                  className={styles.video}
                  poster={thumbnailUrl || undefined}
                  preload="none"
                  playsInline
                  onPlay={() => setIsPlaying(true)}
                  onPause={() => setIsPlaying(false)}
                  onEnded={() => setIsPlaying(false)}
                >
                  <source
                    src={videoUrl}
                    type={
                      activeStory.video?.mime ||
                      "video/mp4"
                    }
                  />
                </video>
              ) : thumbnailUrl ? (
                <img
                  src={thumbnailUrl}
                  alt={
                    activeStory.name ||
                    "Employee story"
                  }
                  className={styles.video}
                />
              ) : null}

              {videoUrl && (
                <button
                  type="button"
                  className={`${styles.playButton} ${
                    isPlaying
                      ? styles.playing
                      : ""
                  }`}
                  onClick={handlePlay}
                  aria-label={
                    isPlaying
                      ? "Pause employee story"
                      : "Play employee story"
                  }
                >
                  {isPlaying ? (
                    <span className={styles.pauseIcon}>
                      <span />
                      <span />
                    </span>
                  ) : (
                    <span className={styles.playIcon} />
                  )}
                </button>
              )}

              <div className={styles.videoOverlay} />
            </div>

            {/* Employee information */}

            <div className={styles.storyInfo}>

              <div className={styles.employeeInfo}>

                {employeeImageUrl && (
                  <img
                    src={employeeImageUrl}
                    alt={activeStory.name}
                    className={
                      styles.employeeImage
                    }
                  />
                )}

                <div className={styles.employeeDetails}>
                  <h3>{activeStory.name}</h3>

                  <p>
                    {activeStory.designation}
                  </p>
                </div>
              </div>

              {activeStory.quote && (
                <div className={styles.quote}>
                  <p>
                    {getRichText(activeStory.quote)}
                  </p>
                </div>
              )}

            </div>

          </div>

        {peekImageUrl && (
          <div className={styles.peekCard} aria-hidden="true">
            <img
              src={peekImageUrl}
              alt=""
              className={styles.peekImage}
            />
          </div>
        )}

        {stories.length > 1 && (
          <button
            type="button"
            className={styles.nextButton}
            onClick={() =>
              handleStoryChange(
                (activeIndex + 1) % stories.length
              )
            }
            aria-label="Next employee story"
          >
            <span>→</span>
          </button>
        )}

      </div>

      {/* ================================
          Story Thumbnails
      ================================= */}

      {stories.length > 1 && (
        <div className={styles.container}>
          <div className={styles.thumbnailWrapper}>
            <div className={styles.thumbnails}>

              {stories.map((story, index) => {
                const imageUrl = getMediaUrl(
                  story.thumbnail?.url
                );

                return (
                  <button
                    type="button"
                    key={story.id || index}
                    className={`${styles.thumbnailButton} ${
                      activeIndex === index
                        ? styles.activeThumbnail
                        : ""
                    }`}
                    onClick={() =>
                      handleStoryChange(index)
                    }
                    aria-label={`View story from ${story.name}`}
                  >
                    {imageUrl ? (
                      <img
                        src={imageUrl}
                        alt={story.name}
                        className={
                          styles.thumbnailImage
                        }
                      />
                    ) : (
                      <span
                        className={
                          styles.thumbnailPlaceholder
                        }
                      />
                    )}
                  </button>
                );
              })}

            </div>
          </div>
        </div>
      )}
    </section>
  );
}