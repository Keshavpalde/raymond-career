import { HouseConceptPageData } from "@/types/houseConceptPage";

const STRAPI_URL = process.env.NEXT_PUBLIC_STRAPI_URL;

export async function getHouseConceptPage(): Promise<HouseConceptPageData> {
  const url =
    `${STRAPI_URL}/api/house-concept` +
    `?populate[houseConceptHero][populate]=*` +
    `&populate[houseConcept][populate][video][populate]=*` +
    `&populate[houseConcept][populate][backgroundImage][populate]=*` +
    `&populate[meetTheHouses][populate][houses][populate]=*` +
    `&populate[houseMoments][populate][moments][populate]=*`;

  const res = await fetch(url, {
    next: {
      revalidate: 60,
    },
  });

  if (!res.ok) {
    const errorText = await res.text();

    console.error(
      "Strapi House Concept API Error:",
      {
        status: res.status,
        statusText: res.statusText,
        response: errorText,
      }
    );

    throw new Error(
      `Failed to fetch House Concept page data: ${res.status}`
    );
  }

  const json = await res.json();

  console.log(
    "House Concept API Data:",
    JSON.stringify(
      json.data,
      null,
      2
    )
  );

  return json.data;
}