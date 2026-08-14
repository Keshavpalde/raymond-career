export interface Media {
  url: string;
  alternativeText?: string;
}

export interface AwardItem {
  id: number;

  awardImage: Media;

  awardTitle: string;

  awardDescription: any[];

  displayOrder: number;
}

export interface AwardYear {
  id: number;

  year: number;

  activeByDefault: boolean;

  awards: AwardItem[];
}

export interface AwardsRecognitionData {
  heading: string;

  description: any[];

  awardsYear: AwardYear[];
}