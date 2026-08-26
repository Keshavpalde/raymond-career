import styles from "./EmployeeStoriesHero.module.css";
import { EmployeeStoriesHeroData } from "@/types/employeeStoriesPage";

interface EmployeeStoriesHeroProps {
  data: EmployeeStoriesHeroData | null;
}

const STRAPI_URL = process.env.NEXT_PUBLIC_STRAPI_URL;

export default function EmployeeStoriesHero({
  data,
}: EmployeeStoriesHeroProps) {
  if (!data) {
    return null;
  }

  const imageUrl = data.image?.url
    ? data.image.url.startsWith("http")
      ? data.image.url
      : `${STRAPI_URL}${data.image.url}`
    : "";

  return (
    <section className={styles.hero}>
      <div className={styles.imageWrapper}>
        {imageUrl && (
          <img
            src={imageUrl}
            alt={data.image?.alternativeText || data.heading}
            className={styles.image}
          />
        )}

        <div className={styles.overlay} />
      </div>

      <div className={styles.container}>
        <div className={styles.content}>
          <h1>{data.heading}</h1>
        </div>
      </div>
    </section>
  );
}