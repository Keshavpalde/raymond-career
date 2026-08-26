"use client";

import { useState } from "react";
import styles from "./OurCommitmentToInclusion.module.css";

import {
  OurCommitmentToInclusionData,
  RichTextBlock,
} from "@/types/diversityInclusionPage";

interface OurCommitmentToInclusionProps {
  data: OurCommitmentToInclusionData | null;
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

function renderHeading(heading: string) {
  const [firstWord, ...rest] = heading.trim().split(" ");

  return (
    <>
      <span className={styles.headingAccent}>{firstWord}</span>{" "}
      {rest.join(" ")}
    </>
  );
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

export default function OurCommitmentToInclusion({
  data,
}: OurCommitmentToInclusionProps) {
  const [activeIndex, setActiveIndex] = useState<number | null>(null);

  if (!data) {
    return null;
  }

  const principles = data.principles || [];

  const togglePrinciple = (index: number) => {
    setActiveIndex((current) =>
      current === index ? null : index
    );
  };

  return (
    <section className={styles.section}>
      <div className={styles.container}>

        {/* ================================
            Section Header
        ================================= */}

        <div className={styles.header}>
          <h2>{renderHeading(data.heading)}</h2>

          {data.description && (
            <div className={styles.description}>
              <p>
                {getRichText(data.description)}
              </p>
            </div>
          )}
        </div>

        {/* ================================
            Principles Grid
        ================================= */}

        <div className={styles.grid}>
          {principles.map((principle, index) => {
            const isActive = activeIndex === index;

            const iconUrl = getMediaUrl(
              principle.icon?.url
            );

            return (
              <div
                className={`${styles.card} ${
                  isActive ? styles.active : ""
                }`}
                key={principle.id || index}
              >
                <button
                  type="button"
                  className={styles.cardButton}
                  onClick={() => togglePrinciple(index)}
                  aria-expanded={isActive}
                >
                  {/* Icon */}

                  {iconUrl && (
                    <div className={styles.iconWrapper}>
                      <img
                        src={iconUrl}
                        alt={
                          principle.icon
                            ?.alternativeText ||
                          principle.title
                        }
                        className={styles.icon}
                      />
                    </div>
                  )}

                  {/* Title */}

                  <h3>{principle.title}</h3>
                </button>

                {/* Expandable Content */}

                <div
                  className={`${styles.expandable} ${
                    isActive
                      ? styles.expandableOpen
                      : ""
                  }`}
                >
                  <div className={styles.expandableInner}>
                    {principle.description && (
                      <p>
                        {getRichText(
                          principle.description
                        )}
                      </p>
                    )}
                  </div>
                </div>

                {/* Arrow */}

                <button
                  type="button"
                  className={styles.arrow}
                  onClick={() =>
                    togglePrinciple(index)
                  }
                  aria-label={
                    isActive
                      ? `Collapse ${principle.title}`
                      : `Expand ${principle.title}`
                  }
                >
                  <span
                    className={
                      isActive
                        ? styles.arrowUp
                        : styles.arrowDown
                    }
                  >
                    ↓
                  </span>
                </button>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}