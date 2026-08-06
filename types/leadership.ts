export interface Media {
  id: number;
  url: string;
  alternativeText?: string | null;
}

export interface RichTextChild {
  type: string;
  text: string;
}

export interface RichTextBlock {
  type: string;
  children: RichTextChild[];
}

export type VideoType = "youtube" | "upload";

export interface LeaderItem {
  id: number;

  name: string;

  designation: string;

  image: Media;

  expandedImage?: Media;

  videoType: VideoType;

  youtubeUrl?: string;

  video?: Media;

  quote?: string;

  expanded?: boolean;

  order?: number;
}

export interface LeadershipSectionData {
  heading: string;

  description: RichTextBlock[];

  backgroundImage?: Media;

  leaders: LeaderItem[];
}