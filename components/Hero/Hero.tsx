import styles from "./Hero.module.css";
import HeroVideo from "./HeroVideo";
import HeroContent from "./HeroContent";
import { HeroData } from "@/types/hero";

interface HeroProps {
  data: HeroData;
}

export default function Hero({ data }: HeroProps) {
  return (
    <section className={styles.hero}>
      {/* Support both flat and nested Strapi shapes for backgroundVideo */}
      {(() => {
        const raw = data.backgroundVideo as any;
        const url = raw && "url" in raw ? raw.url : raw?.data?.attributes?.url;
        return url ? <HeroVideo videoUrl={url} /> : null;
      })()}

      <div className={styles.overlay} />

      <HeroContent hero={data} />
    </section>
  );
}