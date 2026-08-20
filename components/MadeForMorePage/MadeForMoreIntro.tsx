import styles from "./MadeForMoreIntro.module.css";
import {
  MadeForMoreIntroData,
  RichTextBlock,
} from "@/types/madeForMorePage";

interface MadeForMoreIntroProps {
  data: MadeForMoreIntroData;
}

function getRichText(blocks: RichTextBlock[] = []) {
  return blocks
    .map((block) =>
      block.children?.map((child) => child.text).join("")
    )
    .join("\n");
}

export default function MadeForMoreIntro({
  data,
}: MadeForMoreIntroProps) {
  return (
    <section className={styles.intro}>
      <div className={styles.container}>
        <h2 className={styles.heading}>
          <span className={styles.redText}>MADE FOR</span>{" "}
          <span className={styles.darkText}>MORE</span>
        </h2>

        <div className={styles.description}>
          {getRichText(data.description)}
        </div>
      </div>
    </section>
  );
}