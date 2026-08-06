export interface StrapiTextNode {
  type: string;
  text?: string;
  children?: StrapiTextNode[];
}

export interface StatsCardData {
  id: number;
  type: "stats" | "image";

  number?: string;
  title?: string;

  hoverContent?: StrapiTextNode[];

  background?: "red" | "gray";

  image?: {
    url: string;
    alternativeText?: string;
  };
}

export interface StatsSectionData {
  heading: string;
  cards: StatsCardData[];
}