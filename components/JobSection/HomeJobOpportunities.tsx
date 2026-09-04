import styles from "./HomeJobOpportunities.module.css";

import {
  HomeJobOpportunitiesData,
  JobOpening,
  StrapiMedia,
} from "@/types/homeJobOpportunities";

interface HomeJobOpportunitiesProps {
  data: HomeJobOpportunitiesData;
  jobs: JobOpening[];
}

const STRAPI_URL =
  process.env.NEXT_PUBLIC_STRAPI_URL || "http://localhost:1337";

/* =========================================
   MEDIA URL
========================================= */

function getMediaUrl(media?: StrapiMedia | null): string {
  if (!media?.url) {
    return "";
  }

  if (media.url.startsWith("http")) {
    return media.url;
  }

  return `${STRAPI_URL}${media.url}`;
}

/* =========================================
   DATE FORMAT
========================================= */

function formatPostedDate(date?: string | null): string {
  if (!date) {
    return "";
  }

  try {
    return new Date(date).toLocaleDateString("en-GB", {
      day: "2-digit",
      month: "short",
      year: "numeric",
    });
  } catch {
    return "";
  }
}

/* =========================================
   JOB CARD
========================================= */

function JobCard({ job }: { job: JobOpening }) {
  const locationText = [job.department, job.location]
    .filter(Boolean)
    .join(" • ");

  return (
    <article className={styles.jobCard}>
      <div className={styles.jobTop}>
        <div className={styles.jobTitleArea}>
          <h3>{job.title}</h3>

          {locationText && (
            <p className={styles.location}>
              {locationText}
            </p>
          )}
        </div>

        {job.postedOn && (
          <p className={styles.postedDate}>
            Posted On{" "}
            <span>{formatPostedDate(job.postedOn)}</span>
          </p>
        )}
      </div>

      <div className={styles.jobTags}>
        {job.employmentType && (
          <span className={styles.tag}>
            <span className={styles.tagIcon}>▣</span>
            {job.employmentType}
          </span>
        )}

        {job.workMode && (
          <span className={styles.tag}>
            <span className={styles.tagIcon}>⌂</span>
            {job.workMode}
          </span>
        )}
      </div>

      <div className={styles.jobBottom}>
        <div className={styles.experience}>
          <span className={styles.experienceLabel}>
            REQUIRED EXPERIENCE
          </span>

          <span className={styles.experienceValue}>
            {job.experience || "Not specified"}
          </span>
        </div>

        {job.atsUrl && (
          <a
            href={job.atsUrl}
            target="_blank"
            rel="noopener noreferrer"
            className={styles.arrowButton}
            aria-label={`View ${job.title}`}
          >
            →
          </a>
        )}
      </div>
    </article>
  );
}

/* =========================================
   MAIN COMPONENT
========================================= */

export default function HomeJobOpportunities({
  data,
  jobs,
}: HomeJobOpportunitiesProps) {
  const backgroundImage = getMediaUrl(data?.bgImage);

  const sectionStyle = backgroundImage
    ? {
        backgroundImage: `url("${backgroundImage}")`,
      }
    : undefined;

  return (
    <section
      className={styles.section}
      style={sectionStyle}
    >
      <div className={styles.overlay} />

      <div className={styles.container}>
        {/* =====================================
            HEADER
        ===================================== */}

        <div className={styles.header}>
          <div className={styles.headingWrap}>
            <h2>{data?.heading}</h2>
          </div>
        </div>

        {/* =====================================
            JOB GRID
        ===================================== */}

        <div className={styles.jobsGrid}>
          {jobs?.slice(0, 6).map((job, index) => (
            <JobCard
              key={job.documentId || job.id || index}
              job={job}
            />
          ))}
        </div>

        {/* =====================================
            VIEW ALL BUTTON
        ===================================== */}

        {data?.buttonText && (
          <div className={styles.buttonWrapper}>
            <a
              href={data.buttonUrl || "/apply-now"}
              className={styles.viewAllButton}
            >
              {data.buttonText}
            </a>
          </div>
        )}
      </div>
    </section>
  );
}