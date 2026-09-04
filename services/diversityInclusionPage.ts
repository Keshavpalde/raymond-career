import {
  DiversityInclusionPageData,
} from "@/types/diversityInclusionPage";

const STRAPI_URL =
  process.env.NEXT_PUBLIC_STRAPI_URL;

export async function getDiversityInclusionPage(): Promise<DiversityInclusionPageData> {
  const res = await fetch(
    `${STRAPI_URL}/api/diversity-and-inclusion?populate[diversityInclusionHero][populate]=*&populate[ourCommitmentToInclusion][populate][principles][populate]=*&populate[diversityInAction][populate][initiatives][populate]=*&populate[womenBrigade][populate][points][populate]=*&populate[womenBrigade][populate][Gif][populate]=*&populate[womenBrigade][populate][backgroundImage][populate]=*&populate[diversityStatistics][populate][statistics][populate]=*&populate[OurWorkplaceCulture][populate][slides][populate]=*`,
    {
      next: {
        revalidate: 60,
      },
    }
  );

  if (!res.ok) {
    const errorText = await res.text();

    console.error(
      "Strapi Diversity & Inclusion API Error:",
      {
        status: res.status,
        statusText: res.statusText,
        response: errorText,
      }
    );

    throw new Error(
      `Failed to fetch Diversity & Inclusion page data: ${res.status}`
    );
  }

  const json = await res.json();

  return json.data;
}