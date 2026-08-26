export interface MediaData {
  id?: number;
  url?: string;
  alternativeText?: string | null;
  name?: string;
  width?: number;
  height?: number;
}

export interface RichTextChild {
  text?: string;
  type?: string;
}

export interface RichTextBlock {
  type?: string;
  children?: RichTextChild[];
}

export interface ApplyNowHeroData {
  heading: string;
  image?: MediaData | null;
}

export interface FindYourOpportunityData {
  heading: string;
  description?: RichTextBlock[] | null;
}

export interface ApplyNowPageData {
  applyNowHero: ApplyNowHeroData;
  findYourOpportunity: FindYourOpportunityData;
}

export interface JobOpening {
  id: number;
  documentId?: string;

  title: string;
  department: string;
  location: string;

  employmentType:
    | "Full Time"
    | "Part Time"
    | "Contract"
    | "Internship"
    | string;

  workMode:
    | "On-site"
    | "Hybrid"
    | "Remote"
    | string;

  experience: string;

  postedOn: string;

  atsUrl: string;
}