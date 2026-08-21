/* =========================================
   Common Strapi Media
========================================= */

export interface StrapiMedia {
  id?: number;
  url: string;
  alternativeText?: string | null;
  mime?: string;
  width?: number;
  height?: number;
}


/* =========================================
   Rich Text
========================================= */

export interface RichTextChild {
  type: string;
  text: string;
}

export interface RichTextBlock {
  type: string;
  children: RichTextChild[];
}


/* =========================================
   Life At Raymond Realty Hero
========================================= */

export interface LifeAtRaymondHeroData {
  backgroundVideo: StrapiMedia;
  heading: string;
  description: RichTextBlock[];
}


/* =========================================
   Inside Our Workplace
========================================= */

export interface WorkplaceItemData {
  image: StrapiMedia;
  title: string;
}

export interface InsideOurWorkplaceData {
  heading: string;
  description: RichTextBlock[];
  workplaceItems: WorkplaceItemData[];
}


/* =========================================
   Life Beyond Job Title
========================================= */

export interface LifeBeyondItemData {
  image: StrapiMedia;
  title: string;
  description: RichTextBlock[];
}

export interface LifeBeyondJobTitleData {
  heading: string;
  lifeBeyondItems: LifeBeyondItemData[];
}
/* =========================================
   Glimpse Into Our World
========================================= */

export interface GlimpseItemData {
  image: StrapiMedia;
  title: string;
  description: RichTextBlock[];
  galleryImages: StrapiMedia[];
}

export interface GlimpseIntoOurWorldData {
  heading: string;
  description: RichTextBlock[];
  glimpseItem: GlimpseItemData[];
}
/* =========================================
   Stories That Inspire
========================================= */

export interface StoryItemData {
  image: StrapiMedia;
  name: string;
  designation: string;
  description: RichTextBlock[];
}

export interface StoriesThatInspireData {
  heading: string;
  description: RichTextBlock[];
  storyItems: StoryItemData[];
}

/* =========================================
   Growth Environment
========================================= */

export interface GrowthItemData {
  title: string;
  description: RichTextBlock[];
}

export interface GrowthEnvironmentData {
  heading: string;
  growthItems: GrowthItemData[];
  image: StrapiMedia;
  quote: string;
  quoteBy: string;
}
/* =========================================
   Life At Raymond Realty Page
========================================= */


export interface LifeAtRaymondRealtyPageData {
  lifeAtRaymondHero: LifeAtRaymondHeroData;
  insideOurWorkplace: InsideOurWorkplaceData;
  lifeBeyondJobTitle: LifeBeyondJobTitleData;
  glimpseIntoOurWorld: GlimpseIntoOurWorldData;
  storiesThatInspire: StoriesThatInspireData;
  growthEnvironment: GrowthEnvironmentData;
}