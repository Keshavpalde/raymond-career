import { fetchAPI } from "@/lib/strapi";

import { FooterData } from "@/types/footer";

export async function getFooter(): Promise<FooterData> {
  const response = await fetchAPI<{ data: any }>(
    "/api/footer?populate=backgroundImage,logo,navigationLinks,socialLinks,ctaButton"
  );

  const footer = response.data;

  return {
    heading: footer.heading ?? "",

    ctaButton: {
      text: footer.ctaButton?.text ?? "",
      url: footer.ctaButton?.url ?? "",
    },

    backgroundImage:
      footer.backgroundImage ?? {
        url: "",
        alternativeText: "",
      },

    logo:
      footer.logo ?? {
        url: "",
        alternativeText: "",
      },

    navigationLinks: (footer.navigationLinks ?? []).sort(
      (a: any, b: any) =>
        a.displayOrder - b.displayOrder
    ),

    socialLinks: (footer.socialLinks ?? []).sort(
      (a: any, b: any) =>
        a.displayOrder - b.displayOrder
    ),

    copyright: footer.copyright ?? "",
  };
}