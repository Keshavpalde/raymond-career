import styles from "./MadeForMoreHero.module.css";
import {
  MadeForMoreHeroData,
  RichTextBlock,
} from "@/types/madeForMorePage";

interface MadeForMoreHeroProps {
  data: MadeForMoreHeroData;
}

function getRichText(blocks: RichTextBlock[] = []) {
  return blocks
    .map((block) =>
      block.children?.map((child) => child.text).join("")
    )
    .join("\n");
}

export default function MadeForMoreHero({
  data,
}: MadeForMoreHeroProps) {
  const imageUrl = data.backgroundImage?.url?.startsWith("http")
    ? data.backgroundImage.url
    : `${process.env.NEXT_PUBLIC_STRAPI_URL}${data.backgroundImage?.url}`;

  return (
    <section className={styles.hero}>
      <div
        className={styles.background}
        style={{
          backgroundImage: `url("${imageUrl}")`,
        }}
        aria-label={data.backgroundImage?.alternativeText || ""}
      />

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