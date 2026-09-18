"use client";

import type { CSSProperties } from "react";

import styles from "./EmployeeTestimonials.module.css";

import TestimonialCard from "./TestimonialCard";

import { TestimonialItem } from "@/types/employeeTestimonials";

interface Props {
  testimonials: TestimonialItem[];
  activeId: number;
  onSelect: (testimonial: TestimonialItem) => void;
  // Continuously auto-scrolls the list vertically, pausing on hover
  autoScroll?: boolean;
  // Seconds for one full loop; lower is faster
  scrollSpeed?: number;
}

export default function TestimonialList({
  testimonials,
  activeId,
  onSelect,
  autoScroll = true,
  scrollSpeed,
}: Props) {
  const canLoop = autoScroll && testimonials.length > 1;

  const duration = scrollSpeed ?? testimonials.length * 5;

  return (
    <div className={styles.listWrapper}>
      <div
        className={`${styles.scrollTrack} ${
          canLoop ? styles.scrollTrackAnimated : ""
        }`}
        style={
          canLoop
            ? ({
                "--scroll-duration": `${duration}s`,
              } as CSSProperties)
            : undefined
        }
      >
        {testimonials.map((item) => (
          <TestimonialCard
            key={item.id}
            testimonial={item}
            active={item.id === activeId}
            onClick={() => onSelect(item)}
          />
        ))}

        {/* Cloned set enables a seamless infinite scroll loop */}
        {canLoop &&
          testimonials.map((item) => (
            <TestimonialCard
              key={`clone-${item.id}`}
              testimonial={item}
              active={item.id === activeId}
              onClick={() => onSelect(item)}
              isClone
            />
          ))}
      </div>
    </div>
  );
}
