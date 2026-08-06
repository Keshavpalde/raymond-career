import { fetchAPI } from "@/lib/strapi";

import { HomeData } from "@/types/home";
import { ValuesSectionData } from "@/types/valuesSection";
import { LeadershipSectionData } from "@/types/leadership";
import { MadeForMoreData } from "@/types/madeForMore";
import { LifeAtRaymondRealtyData } from "@/types/lifeAtRaymondRealty";

export async function getHome(): Promise<HomeData> {
  const response = await fetchAPI<{ data: any }>(
    "/api/home?populate=hero.backgroundVideo,hero,statsSection.cards.image,statsSection.cards,ourValues.leftImage,ourValues.ValueItem.icon,leadershipThoughts.backgroundImage,leadershipThoughts.leaderItem.image,leadershipThoughts.leaderItem.expandedImage,leadershipThoughts.leaderItem.video,madeForMore.backgroundImage,madeForMore.tabs.contentImage,madeForMore.tabs.contentItems,lifeAtRaymondRealty.galleryItems.image"
  );

  const home = response.data;

  /* ==========================================================
     OUR VALUES
  ========================================================== */

  const ourValuesRaw = home?.ourValues;

  const ourValues: ValuesSectionData | undefined =
    ourValuesRaw
      ? {
          heading: ourValuesRaw.heading ?? "",

          subHeading:
            ourValuesRaw.subHeading ?? "",

          leftImage:
            ourValuesRaw.leftImage ?? {
              url: "",
              alternativeText: "",
            },

          values:
            ourValuesRaw.values ??
            ourValuesRaw.ValueItem ??
            [],
        }
      : undefined;

  /* ==========================================================
     LEADERSHIP
  ========================================================== */

  const leadershipRaw =
    home?.leadershipThoughts;

  const leadershipThoughts:
    | LeadershipSectionData
    | undefined = leadershipRaw
    ? {
        heading:
          leadershipRaw.heading ?? "",

        description:
          leadershipRaw.description ?? [],

        backgroundImage:
          leadershipRaw.backgroundImage ?? {
            url: "",
            alternativeText: "",
          },

        leaders:
          leadershipRaw.leaders ??
          leadershipRaw.leaderItem ??
          leadershipRaw.LeaderItem ??
          [],
      }
    : undefined;

  /* ==========================================================
     MADE FOR MORE
  ========================================================== */

  const madeForMoreRaw =
    home?.madeForMore;

  const madeForMore:
    | MadeForMoreData
    | undefined = madeForMoreRaw
    ? {
        heading:
          madeForMoreRaw.heading ?? "",

        description:
          madeForMoreRaw.description ?? [],

        backgroundImage:
          madeForMoreRaw.backgroundImage ?? {
            url: "",
            alternativeText: "",
          },

        tabs:
          madeForMoreRaw.tabs ?? [],
      }
    : undefined;

  /* ==========================================================
     LIFE AT RAYMOND REALTY
  ========================================================== */

  const lifeAtRaymondRealtyRaw =
    home?.lifeAtRaymondRealty;

  const lifeAtRaymondRealty:
    | LifeAtRaymondRealtyData
    | undefined = lifeAtRaymondRealtyRaw
    ? {
        heading:
          lifeAtRaymondRealtyRaw.heading ?? "",

        buttonText:
          lifeAtRaymondRealtyRaw.buttonText ?? "",

        buttonLink:
          lifeAtRaymondRealtyRaw.buttonLink ?? "",

        galleryItems:
          lifeAtRaymondRealtyRaw.galleryItems ?? [],
      }
    : undefined;

  /* ==========================================================
     RETURN
  ========================================================== */

  return {
    hero: home.hero,

    statsSection: home.statsSection,

    ourValues,

    leadershipThoughts,

    madeForMore,

    lifeAtRaymondRealty,
  };
}