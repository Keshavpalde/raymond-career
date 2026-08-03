import { fetchAPI } from "@/lib/strapi";
import { HomeData } from "@/types/home";
import { ValuesSectionData } from "@/types/valuesSection";

export async function getHome(): Promise<HomeData> {
  const response = await fetchAPI<{ data: any }>(
    "/api/home?populate=hero.backgroundVideo,hero,statsSection.cards.image,statsSection.cards,ourValues.leftImage,ourValues.ValueItem.icon"
  );

  const home = response.data;
  const ourValuesRaw = home?.ourValues;

  const ourValues: ValuesSectionData | undefined = ourValuesRaw
    ? {
        heading: ourValuesRaw.heading ?? "",
        subHeading: ourValuesRaw.subHeading ?? "",
        leftImage: ourValuesRaw.leftImage ?? {
          url: "",
          alternativeText: "",
        },
        values: ourValuesRaw.values ?? ourValuesRaw.ValueItem ?? [],
      }
    : undefined;

  return {
    hero: home.hero,
    statsSection: home.statsSection,
    ourValues,
  } as HomeData;
}