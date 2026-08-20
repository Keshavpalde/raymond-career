import { MadeForMorePageData } from "@/types/madeForMorePage";

const STRAPI_URL = process.env.NEXT_PUBLIC_STRAPI_URL;

export async function getMadeForMorePage(): Promise<MadeForMorePageData> {
  const res = await fetch(
    `${STRAPI_URL}/api/made-for-more?populate[madeForMoreHero][populate]=*&populate[madeForMoreIntro][populate]=*&populate[learnAndGrow][populate][learnAndGrowTabs][populate][learnAndGrowTabs][populate][images][populate][learnAndGrowImage][populate]=*&populate[recognition][populate][recognitionItems][populate][recognitionItemNew][populate]=*&populate[wellbeingFirst][populate][wellbeingSlides][populate][wellbeingSlide][populate]=*&populate[beyondWork][populate][beyondWorkSlides][populate][beyondWorkSlideNew][populate]=*&populate[celebrations][populate]=*&populate[activities][populate][activitiesSlides][populate][activitySlide][populate]=*`,
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
      `Failed to fetch Made For More page data: ${res.status}`
    );
  }

  const json = await res.json();

  return json.data;
}