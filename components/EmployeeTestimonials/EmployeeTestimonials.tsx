"use client";

import { useMemo, useState } from "react";
import Image from "next/image";

import styles from "./EmployeeTestimonials.module.css";

import FeaturedVideo from "./FeaturedVideo";
import TestimonialList from "./TestimonialList";

import {
  EmployeeTestimonialsData,
  TestimonialItem,
} from "@/types/employeeTestimonials";

const STRAPI_URL =
  process.env.NEXT_PUBLIC_STRAPI_URL ||
  "http://localhost:1337";

interface Props {
  data: EmployeeTestimonialsData;
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

export default function EmployeeTestimonials({
  data,
}: Props) {
  /**
   * Sort testimonials
   */
  const testimonials = useMemo(() => {
    return [...data.testimonials].sort(
      (a, b) => a.displayOrder - b.displayOrder
    );
  }, [data]);

  /**
   * Find Default Active Item
   */
  const defaultItem =
    testimonials.find(
      (item) => item.activeByDefault
    ) ?? testimonials[0];

  /**
   * Active Testimonial
   */
  const [activeTestimonial, setActiveTestimonial] =
    useState<TestimonialItem>(defaultItem);

  const backgroundImage = data.backgroundImage?.url
    ? data.backgroundImage.url.startsWith("http")
      ? data.backgroundImage.url
      : `${STRAPI_URL}${data.backgroundImage.url}`
    : "";

  const handlePrev = () => {
    const index = testimonials.findIndex(
      (item) => item.id === activeTestimonial.id
    );

    const prevIndex =
      (index - 1 + testimonials.length) %
      testimonials.length;

    setActiveTestimonial(testimonials[prevIndex]);
  };

  const handleNext = () => {
    const index = testimonials.findIndex(
      (item) => item.id === activeTestimonial.id
    );

    const nextIndex =
      (index + 1) % testimonials.length;

    setActiveTestimonial(testimonials[nextIndex]);
  };

  return (
    <section className={styles.section}>
      {/* Background Image */}

      {backgroundImage && (
        <Image
          src={backgroundImage}
          alt={
            data.backgroundImage.alternativeText ??
            data.heading
          }
          fill
          unoptimized
          priority={false}
          className={styles.backgroundImage}
        />
      )}

      <div className={styles.container}>

        {/* Heading */}

        <div className={styles.headingWrapper}>
          <h2 className={styles.heading}>
            {renderHeading(data.heading)}
          </h2>
        </div>

        {/* Content */}

        <div className={styles.content}>

          {/* Left Video */}

          <FeaturedVideo
            testimonial={activeTestimonial}
            onPrev={handlePrev}
            onNext={handleNext}
          />

          {/* Right List */}

          <TestimonialList
            testimonials={testimonials}
            activeId={activeTestimonial.id}
            onSelect={setActiveTestimonial}
          />

        </div>

      </div>
    </section>
  );
}
