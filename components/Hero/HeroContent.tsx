import Link from "next/link";
import { HeroData } from "@/types/hero";
import styles from "./Hero.module.css";

interface HeroContentProps {
  hero: HeroData;
}

export default function HeroContent({ hero }: HeroContentProps) {
  return (
    <div className={styles.content}>
      <div className={styles.container}>

        {hero.eyebrow && (
          <span className={styles.eyebrow}>
            {hero.eyebrow}
          </span>
        )}

        <h1 className={styles.heading}>
          {hero.heading}
        </h1>

        <p className={styles.description}>
          {hero.description?.[0]?.children?.[0]?.text ?? ""}
        </p>

        {hero.primaryButton && (
          <Link
            href={hero.primaryButton.url}
            className={styles.button}
          >
            {hero.primaryButton.text}
          </Link>
        )}

      </div>
    </div>
  );
}