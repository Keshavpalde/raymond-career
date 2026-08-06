"use client";

import { useEffect, useMemo, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

import styles from "./StatsSection.module.css";
import { StatsCardData } from "@/types/statsSection";

gsap.registerPlugin(ScrollTrigger);

interface Props {
  card: StatsCardData;
}

function getRichText(blocks?: any[]): string {
  if (!blocks?.length) return "";

  return blocks
    .map((block) => {
      if (!block.children) return "";

      return block.children
        .map((child: any) => child.text)
        .join("");
    })
    .join("\n");
}

function parseCounter(value?: string) {
  if (!value) {
    return {
      number: 0,
      suffix: "",
    };
  }

  const match = value.match(/^([\d,.]+)(.*)$/);

  if (!match) {
    return {
      number: 0,
      suffix: "",
    };
  }

  return {
    number: Number(match[1].replace(/,/g, "")),
    suffix: match[2],
  };
}

export default function StatsCard({ card }: Props) {
  const counterRef = useRef<HTMLHeadingElement>(null);

  const { number, suffix } = useMemo(
    () => parseCounter(card.number),
    [card.number]
  );

  const content = useMemo(
    () => getRichText(card.hoverContent),
    [card.hoverContent]
  );

  useEffect(() => {
    if (!counterRef.current) return;

    const counter = {
      value: 0,
    };

    gsap.fromTo(
      counter,
      {
        value: 0,
      },
      {
        value: number,
        duration: 2,
        ease: "power3.out",

        scrollTrigger: {
          trigger: counterRef.current,
          start: "top 85%",
          once: true,
        },

        onUpdate: () => {
          if (!counterRef.current) return;

          counterRef.current.innerHTML =
            `${Math.floor(counter.value).toLocaleString()}${suffix}`;
        },
      }
    );

    return () => {
      ScrollTrigger.getAll().forEach((trigger) => {
        if (trigger.trigger === counterRef.current) {
          trigger.kill();
        }
      });
    };
  }, [number, suffix]);

  return (
    <article
      className={`
        ${styles.statsCard}
        ${
          card.background === "red"
            ? styles.red
            : styles.gray
        }
      `}
    >
      <div className={styles.cardInner}>

        {/* =======================
            TOP CONTENT
        ======================== */}

        <div className={styles.contentTop}>

          <h3
            ref={counterRef}
            className={styles.number}
          >
            0{suffix}
          </h3>

          <h4 className={styles.title}>
            {card.title}
          </h4>

        </div>

        {/* =======================
            HOVER CONTENT
        ======================== */}

        <div className={styles.hoverContent}>

          {content ? (
            <p className={styles.description}>
              {content}
            </p>
          ) : (
            <p className={styles.description}>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
            </p>
          )}

        </div>

      </div>
    </article>
  );
}