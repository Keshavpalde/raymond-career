import styles from "./DiversityInclusionHero.module.css";

import {
  DiversityInclusionHeroData,
  RichTextBlock,
} from "@/types/diversityInclusionPage";

interface DiversityInclusionHeroProps {
  data: DiversityInclusionHeroData | null;
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

export default function DiversityInclusionHero({
  data,
}: DiversityInclusionHeroProps) {
  if (!data) {
    return null;
  }

  const imageUrl = getMediaUrl(data.image?.url);

  return (
    <section className={styles.hero}>
      <div className={styles.imageWrapper}>
        {imageUrl && (
          <img
            src={imageUrl}
            alt={
              data.image?.alternativeText ||
              data.heading
            }
            className={styles.image}
          />
        )}

        <div className={styles.overlay} />
      </div>

      <div className={styles.container}>
        <div className={styles.content}>
          <h1>{data.heading}</h1>

          {data.description && (
            <div className={styles.description}>
              <p>
                {getRichText(data.description)}
              </p>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}