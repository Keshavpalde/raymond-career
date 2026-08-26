import styles from "./ApplyNowHero.module.css";

import { ApplyNowHeroData } from "@/types/applyNowPage";

interface ApplyNowHeroProps {
  data: ApplyNowHeroData;
}

const STRAPI_URL = process.env.NEXT_PUBLIC_STRAPI_URL;

function getMediaUrl(url?: string) {
  if (!url) {
    return "";
  }

  return url.startsWith("http")
    ? url
    : `${STRAPI_URL}${url}`;
}

export default function ApplyNowHero({
  data,
}: ApplyNowHeroProps) {
  if (!data) {
    return null;
  }

  const imageUrl = getMediaUrl(data.image?.url);

  return (
    <section className={styles.hero}>
      {/* Background Image */}
      {imageUrl && (
        <img
          src={imageUrl}
          alt={
            data.image?.alternativeText ||
            data.heading ||
            "Apply Now"
          }
          className={styles.backgroundImage}
        />
      )}

      {/* Dark Overlay */}
      <div className={styles.overlay} />

      {/* Content */}
      <div className={styles.content}>
        <h1>{data.heading}</h1>
      </div>
    </section>
  );
}