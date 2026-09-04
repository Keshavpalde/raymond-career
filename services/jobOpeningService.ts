import { JobOpening, JobOpeningResponse } from "@/types/homeJobOpportunities";

const STRAPI_URL =
  process.env.NEXT_PUBLIC_STRAPI_URL || "http://localhost:1337";

/**
 * Get latest 6 job openings for Home Page
 */
export async function getHomeJobOpenings(): Promise<JobOpening[]> {
  try {
    const params = new URLSearchParams();

    params.append("sort[0]", "postedOn:desc");
    params.append("pagination[pageSize]", "6");
    params.append("pagination[page]", "1");

    const response = await fetch(
      `${STRAPI_URL}/api/job-openings?${params.toString()}`,
      {
        next: {
          revalidate: 60,
        },
      }
    );

    if (!response.ok) {
      console.error(
        "Failed to fetch job openings:",
        response.status,
        response.statusText
      );

      return [];
    }

    const result: JobOpeningResponse = await response.json();

    return result?.data || [];
  } catch (error) {
    console.error("Job Opening API Error:", error);

    return [];
  }
}