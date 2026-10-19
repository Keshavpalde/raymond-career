"use client";

import { useEffect, useMemo, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

import styles from "./DiversityStatistics.module.css";

import {
  DiversityStatisticsData,
} from "@/types/diversityInclusionPage";

gsap.registerPlugin(ScrollTrigger);

interface DiversityStatisticsProps {
  data: DiversityStatisticsData | null;
}

/*
 * Splits a Strapi value like "60+", "1,200+" or "4.5x"
 * into the part that counts up and the text around it.
 */
function parseCounter(value: string) {
  const match = value.trim().match(/^(\D*)([\d,]*\.?\d+)(.*)$/);

  if (!match) return null;

  const [, prefix, digits, suffix] = match;

  return {
    prefix,
    suffix,
    target: Number(digits.replace(/,/g, "")),
    decimals: digits.split(".")[1]?.length ?? 0,
    useGrouping: digits.includes(","),
  };
}

function AnimatedNumber({ value }: { value: string }) {
  const valueRef = useRef<HTMLSpanElement>(null);

  const counter = useMemo(() => parseCounter(value), [value]);

  useEffect(() => {
    const element = valueRef.current;

    if (!element || !counter) return;

    const format = (current: number) =>
      `${counter.prefix}${current.toLocaleString("en-US", {
        minimumFractionDigits: counter.decimals,
        maximumFractionDigits: counter.decimals,
        useGrouping: counter.useGrouping,
      })}${counter.suffix}`;

    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      element.textContent = value;
      return;
    }

    const state = { current: 0 };

    element.textContent = format(0);

    const tween = gsap.to(state, {
      current: counter.target,
      duration: 2,
      ease: "power3.out",
      scrollTrigger: {
        trigger: element,
        start: "top 85%",
        once: true,
      },
      onUpdate: () => {
        const factor = 10 ** counter.decimals;

        element.textContent = format(
          Math.floor(state.current * factor) / factor
        );
      },
      onComplete: () => {
        element.textContent = value;
      },
    });

    return () => {
      tween.scrollTrigger?.kill();
      tween.kill();
    };
  }, [counter, value]);

  if (!counter) {
    return <div className={styles.number}>{value}</div>;
  }

  return (
    <div className={styles.number}>
      {/* Reserves the final width so the label doesn't shift while counting */}
      <span className={styles.numberSizer} aria-hidden="true">
        {value}
      </span>

      <span ref={valueRef} className={styles.numberValue}>
        {value}
      </span>
    </div>
  );
}

export default function DiversityStatistics({
  data,
}: DiversityStatisticsProps) {
  if (!data) {
    return null;
  }

  const statistics = data.statistics || [];

  if (statistics.length === 0) {
    return null;
  }

  return (
    <section className={styles.section}>
      <div className={styles.container}>
        {statistics.map((stat) => (
          <div
            className={styles.stat}
            key={stat.id}
          >
            <AnimatedNumber value={stat.number} />

            <div className={styles.label}>
              {stat.label}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}