import {
  ApplyNowPageData,
  JobOpening,
} from "@/types/applyNowPage";

const STRAPI_URL = process.env.NEXT_PUBLIC_STRAPI_URL;

export async function getApplyNowPage(): Promise<ApplyNowPageData> {
  const res = await fetch(
    `${STRAPI_URL}/api/apply-now?populate[applyNowHero][populate]=*&populate[findYourOpportunity][populate]=*`,
    {
      next: {
        revalidate: 60,
      },
    }
  );

  if (!res.ok) {
    const errorText = await res.text();

    console.error("Strapi API Error:", {
      status: res.status,
      statusText: res.statusText,
      response: errorText,
    });

    throw new Error(
      `Failed to fetch Apply Now page data: ${res.status}`
    );
  }

  const json = await res.json();

  return json.data;
}

export async function getJobOpenings(): Promise<JobOpening[]> {
  const res = await fetch(
    `${STRAPI_URL}/api/job-openings?pagination[pageSize]=100&sort=postedOn:desc`,
    {
      next: {
        revalidate: 60,
      },
    }
  );

  if (!res.ok) {
    const errorText = await res.text();

    console.error("Strapi Job Opening API Error:", {
      status: res.status,
      statusText: res.statusText,
      response: errorText,
    });

    throw new Error(
      `Failed to fetch job openings: ${res.status}`
    );
  }

  const json = await res.json();

  return json.data || [];
}