
export interface DhwaniMedia {
  id?: number;
  url: string;
  alternativeText?: string | null;
  mime?: string;
}

export interface DhwaniTextChild {
  type?: string;
  text?: string;
  children?: DhwaniTextChild[];
  url?: string;
}

export interface DhwaniTextBlock {
  type?: string;
  level?: number;
  children?: DhwaniTextChild[];
}

export interface DhwaniSectionData {
  heading: string;
  description: DhwaniTextBlock[];
  backgroundImage: DhwaniMedia | null;
  video: DhwaniMedia | null;
}
