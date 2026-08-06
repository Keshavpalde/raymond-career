import Image from "next/image";
import styles from "./ValuesSection.module.css";

import ValueCard from "./ValueCard";
import { getStrapiMedia } from "@/lib/getStrapiMedia";

import { ValuesSectionData } from "@/types/valuesSection";

interface Props {
  data?: ValuesSectionData;
}

export default function ValuesSection({
  data,
}: Props) {
  if (!data) {
    return null;
  }
  const imageUrl = getStrapiMedia(data.leftImage?.url ?? null);

  return (
    <section className={styles.valuesSection}>

      <div className={styles.container}>
        <div className={styles.content}>
          <div className={styles.wrapper}>

          {/* LEFT */}

          <div className={styles.left}>

            <Image
              src={imageUrl}
              alt={
                data.leftImage.alternativeText ||
                "Our Values"
              }
              fill
              unoptimized
              className={styles.leftImage}
            />

          </div>

          {/* RIGHT */}

          <div className={styles.right}>

            <h2 className={styles.heading}>
              {data.heading}
            </h2>

            <p className={styles.subHeading}>
              {data.subHeading}
            </p>

            <div className={styles.grid}>

              {(data.values ?? []).map((item) => (

                <ValueCard
                  key={item.id}
                  item={item}
                />

              ))}

            </div>

          </div>

        </div>
      </div>
    </div>

    </section>
  );
}