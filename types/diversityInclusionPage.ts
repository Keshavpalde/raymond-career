// ============================================
// Strapi Media
// ============================================

export interface StrapiMedia {
  id: number;
  documentId?: string;
  url: string;
  alternativeText?: string | null;
  name?: string;
  width?: number;
  height?: number;
  mime?: string;
  formats?: Record<string, unknown>;
}

// ============================================
// Strapi Rich Text
// ============================================

export interface RichTextChild {
  type: string;
  text: string;
}

export interface RichTextBlock {
  type: string;
  children?: RichTextChild[];
}

// ============================================
// Diversity & Inclusion Hero
// ============================================

export interface DiversityInclusionHeroData {
  id: number;
  heading: string;
  description: RichTextBlock[] | null;
  image: StrapiMedia | null;
}

// ============================================
// Our Commitment To Inclusion
// ============================================

export interface InclusionPrinciple {
  id: number;
  icon: StrapiMedia | null;
  title: string;
  description: RichTextBlock[] | null;
}

export interface OurCommitmentToInclusionData {
  id: number;
  heading: string;
  description: RichTextBlock[] | null;
  principles: InclusionPrinciple[];
}

// ============================================
// Diversity In Action
// ============================================

export interface DiversityInitiative {
  id: number;
  image: StrapiMedia | null;
  title: string;
  hoverText: RichTextBlock[] | null;
}

export interface DiversityInActionData {
  id: number;
  heading: string;
  description: RichTextBlock[] | null;
  initiatives: DiversityInitiative[];
}

// ============================================
// Women Brigade
// ============================================

export interface WomenBrigadePoint {
  id: number;
  text: string;
}

export interface WomenBrigadeData {
  id: number;
  heading: string;
  description: RichTextBlock[] | null;
  points: WomenBrigadePoint[];
  Gif: StrapiMedia | null;
}

// ============================================
// Diversity Statistics
// ============================================

export interface DiversityStatistic {
  id: number;
  number: string;
  label: string;
}

export interface DiversityStatisticsData {
  id: number;
  statistics: DiversityStatistic[];
}

// ============================================
// Our Workplace Culture
// ============================================

export interface WorkplaceCultureSlide {
  id: number;
  media: StrapiMedia | null;
  mediaType: "image" | "video";
}

export interface OurWorkplaceCultureData {
  id: number;
  heading: string;
  description: RichTextBlock[] | null;
  slides: WorkplaceCultureSlide[];
}

// ============================================
// Complete Diversity & Inclusion Page
// ============================================

export interface DiversityInclusionPageData {
  id: number;
  documentId: string;

  createdAt?: string;
  updatedAt?: string;
  publishedAt?: string | null;

  // Section 1
  diversityInclusionHero:
    | DiversityInclusionHeroData
    | null;

  // Section 2
  ourCommitmentToInclusion:
    | OurCommitmentToInclusionData
    | null;

  // Section 3
  diversityInAction:
    | DiversityInActionData
    | null;

  // Section 4
  womenBrigade:
    | WomenBrigadeData
    | null;

  // Section 5
  diversityStatistics:
    | DiversityStatisticsData
    | null;

  // Section 6
  OurWorkplaceCulture:
    | OurWorkplaceCultureData
    | null;
}