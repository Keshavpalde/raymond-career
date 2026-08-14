"use client";

import Image from "next/image";

import styles from "./EmployeeTestimonials.module.css";

import { TestimonialItem } from "@/types/employeeTestimonials";

interface Props {
  testimonial: TestimonialItem;
  active: boolean;
  onClick: () => void;
}

const STRAPI_URL =
  process.env.NEXT_PUBLIC_STRAPI_URL ||
  "http://localhost:1337";

export default function TestimonialCard({
  testimonial,
  active,
  onClick,
}: Props) {
  const photo =
    testimonial.employeePhoto?.url?.startsWith("http")
      ? testimonial.employeePhoto.url
      : `${STRAPI_URL}${testimonial.employeePhoto?.url}`;

  return (
    <button
      type="button"
      onClick={onClick}
      className={`${styles.card} ${
        active ? styles.activeCard : ""
      }`}
    >
      <div className={styles.cardImage}>
        <Image
          src={photo}
          alt={testimonial.employeeName}
          fill
          unoptimized
          className={styles.image}
        />

        <span className={styles.playCircle}>
          <svg
            width="14"
            height="14"
            viewBox="0 0 24 24"
            fill="white"
          >
            <path d="M8 5v14l11-7z" />
          </svg>
        </span>
      </div>

      <div className={styles.cardContent}>
        <h4>{testimonial.employeeName}</h4>

        <span>{testimonial.designation}</span>
      </div>
    </button>
  );
}
