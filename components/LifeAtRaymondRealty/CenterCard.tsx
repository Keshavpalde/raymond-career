"use client";

import Link from "next/link";

import styles from "./LifeAtRaymondRealty.module.css";

interface Props {
  heading: string;
  buttonText: string;
  buttonLink: string;
}

export default function CenterCard({
  heading,
  buttonText,
  buttonLink,
}: Props) {
  return (
    <div className={styles.centerCard}>
      <div className={styles.centerContent}>

        <h2 className={styles.centerHeading}>
          {heading}
        </h2>

        {buttonText && buttonLink && (
          <Link
            href={buttonLink}
            className={styles.viewAllButton}
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
        )}

      </div>
    </div>
  );
}