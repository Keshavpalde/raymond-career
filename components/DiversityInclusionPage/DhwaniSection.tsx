
import type { CSSProperties, ReactNode } from "react";
import type {
  DhwaniSectionData,
  DhwaniTextChild,
} from "@/types/dhwaniSection";
import styles from "./DhwaniSection.module.css";

interface DhwaniSectionProps {
  data: DhwaniSectionData;
}

function getMediaUrl(url?: string | null): string {
  if (!url) return "";

  if (/^https?:\/\//i.test(url)) {
    return url;
  }

  const baseUrl = process.env.NEXT_PUBLIC_STRAPI_URL;

  if (!baseUrl) return url;

  return `${baseUrl.replace(/\/$/, "")}/${url.replace(/^\//, "")}`;
}

function renderHeading(heading: string) {
  const [firstWord, ...rest] = heading.trim().split(" ");

  return (
    <>
      <span className={styles.headingAccent}>{firstWord}</span>{" "}
      {rest.join(" ")}
    </>
  );
}

function renderInlineContent(
  children: DhwaniTextChild[],
  keyPrefix: string
): ReactNode[] {
  return children.map((child, index) => {
    const key = `${keyPrefix}-${index}`;

    if (child.type === "link" && child.children) {
      return (
        <a
          key={key}
          href={child.url || "#"}
          target={child.url?.startsWith("http") ? "_blank" : undefined}
          rel={child.url?.startsWith("http") ? "noreferrer" : undefined}
        >
          {renderInlineContent(child.children, key)}
        </a>
      );
    }

    if (child.type === "bold" || child.type === "strong") {
      return <strong key={key}>{child.text}</strong>;
    }

    if (child.type === "italic") {
      return <em key={key}>{child.text}</em>;
    }

    if (child.text !== undefined) {
      return <span key={key}>{child.text}</span>;
    }

    if (child.children) {
      return (
        <span key={key}>
          {renderInlineContent(child.children, key)}
        </span>
      );
    }

    return null;
  });
}

export default function DhwaniSection({
  data,
}: DhwaniSectionProps) {
  if (!data) return null;

  const backgroundUrl = getMediaUrl(data.backgroundImage?.url);
  const videoUrl = getMediaUrl(data.video?.url);

  const sectionStyle = {
    "--dhwani-background": backgroundUrl
      ? `url("${backgroundUrl.replace(/["\\]/g, "\\$&")}")`
      : "none",
  } as CSSProperties;

  return (
    <section
      className={styles.dhwaniSection}
      style={sectionStyle}
      aria-label={data.heading || "Dhwani"}
    >
      <div className={styles.overlay}>
        <div className={styles.container}>
          <div className={styles.content}>
            {data.heading && (
              <h2 className={styles.heading}>
                {renderHeading(data.heading)}
              </h2>
            )}

            {data.description?.length > 0 && (
              <div className={styles.description}>
                {data.description.map((block, index) => {
                  const content = renderInlineContent(
                    block.children || [],
                    `block-${index}`
                  );

                  if (block.type === "heading") {
                    const level = Math.min(
                      Math.max(block.level ?? 3, 3),
                      6
                    );

                    if (level === 3) {
                      return <h3 key={index}>{content}</h3>;
                    }

                    if (level === 4) {
                      return <h4 key={index}>{content}</h4>;
                    }

                    if (level === 5) {
                      return <h5 key={index}>{content}</h5>;
                    }

                    return <h6 key={index}>{content}</h6>;
                  }

                  if (block.type === "list") {
                    return (
                      <ul key={index}>
                        <li>{content}</li>
                      </ul>
                    );
                  }

                  return <p key={index}>{content}</p>;
                })}
              </div>
            )}
          </div>

          <div className={styles.videoWrapper}>
            {videoUrl ? (
              <video
                className={styles.video}
                controls
                playsInline
                preload="metadata"
                aria-label={data.heading || "Dhwani video"}
              >
                <source
                  src={videoUrl}
                  type={data.video?.mime || undefined}
                />
                Your browser does not support HTML video.
              </video>
            ) : (
              <div className={styles.videoPlaceholder}>
                Video will appear here once uploaded in Strapi.
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
