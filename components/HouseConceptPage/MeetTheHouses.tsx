"use client";

import styles from "./MeetTheHouses.module.css";

import {
  MeetTheHousesData,
  RichTextBlock,
} from "@/types/houseConceptPage";

interface MeetTheHousesProps {
  data: MeetTheHousesData;
}

const STRAPI_URL = process.env.NEXT_PUBLIC_STRAPI_URL;

// Layout is authored against this fixed coordinate space, then
// converted to percentages so the track (SVG) and the cards
// (HTML) always line up regardless of the rendered width.
const VB_WIDTH = 900;
const VB_HEIGHT = 640;

const CARD_WIDTH = 272;
const CARD_HEIGHT = 116;
const CARD_INSET = 134;

const ROW_Y = [101, 249, 390, 541];

function getRichText(blocks?: RichTextBlock[] | null) {
  return (blocks || [])
    .map((block) =>
      block.children
        ?.map((child) => child.text)
        .join("")
    )
    .join("\n");
}

function getMediaUrl(url?: string) {
  if (!url) {
    return "";
  }

  return url.startsWith("http")
    ? url
    : `${STRAPI_URL}${url}`;
}

function pct(value: number, of: number) {
  return `${(value / of) * 100}%`;
}

// Each row's card has one open (rounded) end and one "proximal"
// end that faces the center. The connecting track only needs to
// run between consecutive rows' proximal edges — a short flat
// run out of each card, a rounded 90deg turn, a straight vertical
// drop, then a mirrored turn into the next card.
const TURN_RADIUS = 22;

function buildTrackPath(rowCount: number) {
  const proximalX = (index: number) =>
    index % 2 === 0
      ? CARD_INSET + CARD_WIDTH
      : VB_WIDTH - CARD_INSET - CARD_WIDTH;

  const segments: string[] = [];

  for (let i = 0; i < rowCount - 1; i += 1) {
    const x1 = proximalX(i);
    const y1 = ROW_Y[i];
    const x2 = proximalX(i + 1);
    const y2 = ROW_Y[i + 1];

    const midX = (x1 + x2) / 2;
    const dirX = x2 > x1 ? 1 : -1;
    const sweep1 = dirX === 1 ? 1 : 0;
    const sweep2 = dirX === 1 ? 0 : 1;

    segments.push(
      `M ${x1} ${y1}` +
        ` L ${midX - dirX * TURN_RADIUS} ${y1}` +
        ` A ${TURN_RADIUS} ${TURN_RADIUS} 0 0 ${sweep1} ${midX} ${y1 + TURN_RADIUS}` +
        ` L ${midX} ${y2 - TURN_RADIUS}` +
        ` A ${TURN_RADIUS} ${TURN_RADIUS} 0 0 ${sweep2} ${midX + dirX * TURN_RADIUS} ${y2}` +
        ` L ${x2} ${y2}`
    );
  }

  return segments.join(" ");
}

export default function MeetTheHouses({
  data,
}: MeetTheHousesProps) {
  if (!data) {
    return null;
  }

  const houses = data.houses || [];
  const trackPath = buildTrackPath(houses.length);

  return (
    <section className={styles.section}>
      <div className={styles.container}>

        {/* Heading */}
        <div className={styles.headingWrapper}>
          <h2 className={styles.heading}>
            {data.heading}
          </h2>

          {data.description && (
            <div className={styles.description}>
              <p>
                {getRichText(data.description)}
              </p>
            </div>
          )}
        </div>

        {/* Houses */}
        <div className={styles.housesWrapper}>

          <svg
            className={styles.track}
            viewBox={`0 0 ${VB_WIDTH} ${VB_HEIGHT}`}
            preserveAspectRatio="none"
            aria-hidden="true"
          >
            <path d={trackPath} />
          </svg>

          {houses.map((house, index) => {
            const logoUrl = getMediaUrl(
              house.logo?.url
            );

            const isLeft = index % 2 === 0;

            const cardLeft = isLeft
              ? CARD_INSET
              : VB_WIDTH - CARD_INSET - CARD_WIDTH;

            const cardTop = ROW_Y[index] - CARD_HEIGHT / 2;

            return (
              <div
                key={house.id || index}
                className={`${styles.houseCard} ${
                  styles[`house${index + 1}`]
                }`}
                style={{
                  left: pct(cardLeft, VB_WIDTH),
                  top: pct(cardTop, VB_HEIGHT),
                  width: pct(CARD_WIDTH, VB_WIDTH),
                  height: pct(CARD_HEIGHT, VB_HEIGHT),
                }}
              >
                {/* Logo */}
                <div className={styles.logoWrapper}>
                  {logoUrl && (
                    <img
                      src={logoUrl}
                      alt={
                        house.logo
                          ?.alternativeText ||
                        house.name
                      }
                      className={styles.logo}
                    />
                  )}
                </div>

                {/* Content */}
                <div className={styles.houseContent}>
                  <h3>{house.name}</h3>

                  {house.description && (
                    <p>
                      {getRichText(
                        house.description
                      )}
                    </p>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
