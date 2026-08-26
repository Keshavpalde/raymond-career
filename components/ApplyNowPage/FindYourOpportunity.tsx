"use client";

import { useMemo, useState } from "react";
import styles from "./FindYourOpportunity.module.css";

import {
  FindYourOpportunityData,
  JobOpening,
  RichTextBlock,
} from "@/types/applyNowPage";

interface FindYourOpportunityProps {
  data: FindYourOpportunityData;
  jobs: JobOpening[];
}

function getRichText(blocks?: RichTextBlock[] | null) {
  return (blocks || [])
    .map((block) =>
      block.children
        ?.map((child) => child.text || "")
        .join("")
    )
    .join("\n");
}

function formatDate(date?: string) {
  if (!date) {
    return "";
  }

  const parsedDate = new Date(date);

  if (Number.isNaN(parsedDate.getTime())) {
    return date;
  }

  return parsedDate.toLocaleDateString("en-GB", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  });
}

export default function FindYourOpportunity({
  data,
  jobs,
}: FindYourOpportunityProps) {
  const [search, setSearch] = useState("");
  const [department, setDepartment] = useState("");
  const [location, setLocation] = useState("");
  const [experience, setExperience] = useState("");

  const departments = useMemo(() => {
    return Array.from(
      new Set(
        jobs
          .map((job) => job.department)
          .filter(Boolean)
      )
    ).sort();
  }, [jobs]);

  const locations = useMemo(() => {
    return Array.from(
      new Set(
        jobs
          .map((job) => job.location)
          .filter(Boolean)
      )
    ).sort();
  }, [jobs]);

  const experiences = useMemo(() => {
    return Array.from(
      new Set(
        jobs
          .map((job) => job.experience)
          .filter(Boolean)
      )
    ).sort();
  }, [jobs]);

  const filteredJobs = useMemo(() => {
    const searchValue = search.trim().toLowerCase();

    return jobs.filter((job) => {
      const matchesSearch =
        !searchValue ||
        job.title?.toLowerCase().includes(searchValue) ||
        job.department?.toLowerCase().includes(searchValue) ||
        job.location?.toLowerCase().includes(searchValue);

      const matchesDepartment =
        !department ||
        job.department === department;

      const matchesLocation =
        !location ||
        job.location === location;

      const matchesExperience =
        !experience ||
        job.experience === experience;

      return (
        matchesSearch &&
        matchesDepartment &&
        matchesLocation &&
        matchesExperience
      );
    });
  }, [
    jobs,
    search,
    department,
    location,
    experience,
  ]);

  if (!data) {
    return null;
  }

  return (
    <section className={styles.section}>
      <div className={styles.container}>

        {/* Heading */}

        <div className={styles.header}>
          <h2>{data.heading}</h2>

          {data.description && (
            <p>
              {getRichText(data.description)}
            </p>
          )}
        </div>

        {/* Filters */}

        <div className={styles.filters}>

          <input
            type="text"
            placeholder="Search roles..."
            value={search}
            onChange={(event) =>
              setSearch(event.target.value)
            }
          />

          <select
            value={department}
            onChange={(event) =>
              setDepartment(event.target.value)
            }
          >
            <option value="">
              Department
            </option>

            {departments.map((item) => (
              <option
                key={item}
                value={item}
              >
                {item}
              </option>
            ))}
          </select>

          <select
            value={location}
            onChange={(event) =>
              setLocation(event.target.value)
            }
          >
            <option value="">
              All Locations
            </option>

            {locations.map((item) => (
              <option
                key={item}
                value={item}
              >
                {item}
              </option>
            ))}
          </select>

          <select
            value={experience}
            onChange={(event) =>
              setExperience(event.target.value)
            }
          >
            <option value="">
              Experience
            </option>

            {experiences.map((item) => (
              <option
                key={item}
                value={item}
              >
                {item}
              </option>
            ))}
          </select>

          <button
            type="button"
            onClick={() => {
              // Filters are already applied live.
              // This button intentionally does not
              // reload the page.
            }}
          >
            Search
          </button>
        </div>

        {/* Job count */}

        <div className={styles.jobCount}>
          {filteredJobs.length}{" "}
          {filteredJobs.length === 1
            ? "role"
            : "roles"}{" "}
          open now
        </div>

        {/* Job Cards */}

        {filteredJobs.length > 0 ? (
          <div className={styles.jobGrid}>
            {filteredJobs.map((job) => (
              <article
                className={styles.jobCard}
                key={
                  job.documentId || job.id
                }
              >

                <div className={styles.cardTop}>
                  <h3>{job.title}</h3>

                  {job.postedOn && (
                    <span className={styles.posted}>
                      Posted On{" "}
                      <u>
                        {formatDate(
                          job.postedOn
                        )}
                      </u>
                    </span>
                  )}
                </div>

                <div className={styles.departmentLocation}>
                  {job.department}

                  {job.location && (
                    <>
                      {" "}
                      | {job.location}
                    </>
                  )}
                </div>

                <div className={styles.tags}>

                  {job.employmentType && (
                    <span className={styles.tag}>
                      <span>▢</span>
                      {job.employmentType}
                    </span>
                  )}

                  {job.workMode && (
                    <span className={styles.tag}>
                      <span>⌖</span>
                      {job.workMode}
                    </span>
                  )}

                </div>

                <div className={styles.divider} />

                <div className={styles.cardBottom}>

                  <div>
                    <div
                      className={
                        styles.experienceLabel
                      }
                    >
                      REQUIRED EXPERIENCE
                    </div>

                    <div
                      className={
                        styles.experienceValue
                      }
                    >
                      {job.experience}
                    </div>
                  </div>

                  {job.atsUrl && (
                    <a
                      href={job.atsUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className={styles.arrow}
                      aria-label={`Apply for ${job.title}`}
                    >
                      →
                    </a>
                  )}

                </div>
              </article>
            ))}
          </div>
        ) : (
          <div className={styles.noResults}>
            No roles found matching your criteria.
          </div>
        )}

      </div>
    </section>
  );
}