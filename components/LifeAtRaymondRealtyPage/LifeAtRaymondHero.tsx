import styles from "./LifeAtRaymondHero.module.css";
import {
  LifeAtRaymondHeroData,
  RichTextBlock,
} from "@/types/lifeAtRaymondRealtyPage";

interface LifeAtRaymondHeroProps {
  data: LifeAtRaymondHeroData;
}

function getRichText(blocks?: RichTextBlock[] | null) {
  return (blocks || [])
    .map((block) =>
      block.children?.map((child) => child.text).join("")
    )
    .join("\n");
}

export default function LifeAtRaymondHero({
  data,
}: LifeAtRaymondHeroProps) {
  if (!data) {
    return null;
  }

  const videoUrl = data.backgroundVideo?.url?.startsWith("http")
    ? data.backgroundVideo.url
    : `${process.env.NEXT_PUBLIC_STRAPI_URL}${data.backgroundVideo?.url}`;

  return (
    <section className={styles.hero}>
      {videoUrl && (
        <video
          className={styles.backgroundVideo}
          autoPlay
          muted
          loop
          playsInline
        >
          <source src={videoUrl} type="video/mp4" />
        </video>
      )}

      <div className={styles.overlay} />

      <div className={styles.content}>
        <div className={styles.headingWrapper}>
          <h1>{data.heading}</h1>
        </div>

        <div className={styles.descriptionWrapper}>
          <p>{getRichText(data.description)}</p>
        </div>
      </div>
    </section>
  );
}