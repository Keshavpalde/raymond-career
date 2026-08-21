import { LifeAtRaymondRealtyPageData } from "@/types/lifeAtRaymondRealtyPage";

const STRAPI_URL = process.env.NEXT_PUBLIC_STRAPI_URL;

export async function getLifeAtRaymondRealtyPage(): Promise<LifeAtRaymondRealtyPageData> {
  const res = await fetch(
    `${STRAPI_URL}/api/life-at-raymond-realty?populate[lifeAtRaymondHero][populate]=*&populate[insideOurWorkplace][populate][workplaceItems][populate]=*&populate[lifeBeyondJobTitle][populate][lifeBeyondItems][populate]=*&populate[glimpseIntoOurWorld][populate][glimpseItem][populate]=*&populate[storiesThatInspire][populate][storyItems][populate]=*&populate[growthEnvironment][populate][growthItems][populate]=*&populate[growthEnvironment][populate][image][populate]=*`,
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
      `Failed to fetch Life At Raymond Realty page data: ${res.status}`
    );
  }

  const json = await res.json();

  return json.data;
}