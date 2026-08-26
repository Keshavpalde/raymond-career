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

export interface EmployeeStoriesHeroData {
  id: number;
  heading: string;
  image: StrapiMedia | null;
}

export interface EmployeeStoryData {
  id: number;
  video: StrapiMedia | null;
  thumbnail: StrapiMedia | null;
  employeeImage: StrapiMedia | null;
  name: string;
  designation: string;
  quote: RichTextBlock[] | null;
}

export interface EmployeeStoriesData {
  id: number;
  heading: string;
  description: RichTextBlock[] | null;
  stories: EmployeeStoryData[];
}

export interface RichTextBlock {
  type: string;
  children?: RichTextChild[];
}

export interface RichTextChild {
  type: string;
  text: string;
}

export interface EmployeeStoriesPageData {
  id: number;
  documentId: string;
  createdAt?: string;
  updatedAt?: string;
  publishedAt?: string | null;

  employeeStoriesHero: EmployeeStoriesHeroData | null;
  employeeStories: EmployeeStoriesData | null;
}