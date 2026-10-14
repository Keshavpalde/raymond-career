export interface StrapiMedia {
  id: number;
  documentId?: string;
  url: string;
  name?: string;
  alternativeText?: string | null;
  width?: number;
  height?: number;
  mime?: string;
}

export interface RichTextChild {
  type?: string;
  text?: string;
  children?: RichTextChild[];
}

export interface RichTextBlock {
  type?: string;
  level?: number;
  format?: string;
  children?: RichTextChild[];
}

export interface FunctionalHead {
  id: number;
  name: string;
  designation: string;
  image: StrapiMedia;
  video: StrapiMedia;
  description: RichTextBlock[];
}

export interface FunctionalHeadsData {
  id: number;
  heading: string;
  description?: RichTextBlock[];
  functionHeads: FunctionalHead[];
}