/* =========================================
   STRAPI RICH TEXT
========================================= */

export interface RichTextChild {
  type?: string;
  text: string;
}

export interface RichTextBlock {
  type?: string;
  children?: RichTextChild[];
}

/* =========================================
   STRAPI MEDIA
========================================= */

export interface StrapiMedia {
  id?: number;

  documentId?: string;

  name?: string;

  url?: string;

  alternativeText?: string | null;

  caption?: string | null;

  width?: number;

  height?: number;

  formats?: {
    thumbnail?: {
      url?: string;
      width?: number;
      height?: number;
    };

    small?: {
      url?: string;
      width?: number;
      height?: number;
    };

    medium?: {
      url?: string;
      width?: number;
      height?: number;
    };

    large?: {
      url?: string;
      width?: number;
      height?: number;
    };
  };
}

/* =========================================
   HOUSE CONCEPT HERO
========================================= */

export interface HouseConceptHeroData {
  id?: number;

  heading: string;

  image?: StrapiMedia | null;

  overlay?: boolean;
}

/* =========================================
   HOUSE CONCEPT VIDEO SECTION
========================================= */

export interface HouseConceptData {
  id?: number;

  heading: string;

  description?: RichTextBlock[] | null;

  video?: StrapiMedia | null;

  backgroundImage?: StrapiMedia | null;
}

/* =========================================
   HOUSE
========================================= */

export interface HouseData {
  id?: number;

  logo?: StrapiMedia | null;

  name: string;

  description?: RichTextBlock[] | null;
}

/* =========================================
   MEET THE HOUSES
========================================= */

export interface MeetTheHousesData {
  id?: number;

  heading: string;

  description?: RichTextBlock[] | null;

  houses?: HouseData[];
}

/* =========================================
   HOUSE MOMENT
========================================= */

export interface HouseMomentData {
  id?: number;

  image?: StrapiMedia | null;
}

/* =========================================
   HOUSE MOMENTS
========================================= */

export interface HouseMomentsData {
  id?: number;

  heading: string;

  description?: RichTextBlock[] | null;

  moments?: HouseMomentData[];
}

/* =========================================
   FULL HOUSE CONCEPT PAGE
========================================= */

export interface HouseConceptPageData {
  id?: number;

  documentId?: string;

  createdAt?: string;

  updatedAt?: string;

  publishedAt?: string;

  houseConceptHero?: HouseConceptHeroData | null;

  houseConcept?: HouseConceptData | null;

  meetTheHouses?: MeetTheHousesData | null;

  houseMoments?: HouseMomentsData | null;
}