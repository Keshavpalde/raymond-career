"use client";

import { useMemo, useState } from "react";

import styles from "./AwardsRecognition.module.css";

import YearTabs from "./YearTabs";
import AwardSlider from "./AwardSlider";

import {
  AwardsRecognitionData,
  AwardYear,
} from "@/types/awardsRecognition";

interface Props {
  data: AwardsRecognitionData;
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

export default function AwardsRecognition({
  data,
}: Props) {

  /**
   * Sort Years (Latest First)
   */

  const years = useMemo(() => {
    return [...data.awardsYear].sort(
      (a, b) => b.year - a.year
    );
  }, [data]);

  /**
   * Default Active Year
   */

  const defaultYear =
    years.find(
      (year) => year.activeByDefault
    ) ?? years[0];

  /**
   * Active Year
   */

  const [activeYear, setActiveYear] =
    useState<AwardYear>(defaultYear);

  /**
   * Sort Awards
   */

  const sortedAwards = useMemo(() => {
    return [...(activeYear.awards ?? [])].sort(
      (a, b) =>
        (a.displayOrder ?? 0) -
        (b.displayOrder ?? 0)
    );
  }, [activeYear]);

  return (
    <section className={styles.section}>

      <div className={styles.container}>

        {/* Header */}

        <div className={styles.header}>

          <div className={styles.headingWrapper}>

            <h2 className={styles.heading}>
              {renderHeading(data.heading)}
            </h2>

            <div
              className={styles.description}
            >
              {data.description?.map(
                (block: any, index: number) => (
                  <p key={index}>
                    {block.children
                      ?.map(
                        (child: any) =>
                          child.text
                      )
                      .join("")}
                  </p>
                )
              )}
            </div>

          </div>

          {/* Year Tabs */}

          <YearTabs
            years={years}
            activeYear={activeYear.year}
            onChange={setActiveYear}
          />

        </div>

        {/* Awards Slider */}

        <AwardSlider
          awards={sortedAwards}
        />

      </div>

    </section>
  );
}