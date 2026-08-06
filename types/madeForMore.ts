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

export interface MadeForMoreContentItem {
  id: number;

  title: string;

  description: RichTextBlock[];

  learnMoreText?: string;

  learnMoreLink?: string;
}

export interface MadeForMoreTab {
  id: number;

  tabTitle: string;

  contentImage: Media;

  activeByDefault?: boolean;

  contentItems: MadeForMoreContentItem[];
}

export interface MadeForMoreData {
  heading: string;

  description: RichTextBlock[];

  backgroundImage?: Media;

  tabs: MadeForMoreTab[];
}