export interface StrapiImage {
  id?: number;
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

/* =========================================
   Made For More Hero
========================================= */

export interface MadeForMoreHeroData {
  backgroundImage: StrapiImage;
  heading: string;
  description: RichTextBlock[];
}

/* =========================================
   Made For More Intro
========================================= */

export interface MadeForMoreIntroData {
  heading: string;
  description: RichTextBlock[];
}

/* =========================================
   Learn & Grow
========================================= */

export interface LearnAndGrowImageData {
  learnAndGrowImage: {
    image: StrapiImage;
  };
}

export interface LearnAndGrowTabData {
  title: string;
  images: LearnAndGrowImageData[];
  description: RichTextBlock[];
}

export interface LearnAndGrowTabWrapperData {
  learnAndGrowTabs: LearnAndGrowTabData;
}

export interface LearnAndGrowData {
  heading: string;
  description: RichTextBlock[];
  learnAndGrowTabs: LearnAndGrowTabWrapperData[];
}

/* =========================================
   Recognition
========================================= */

export interface RecognitionItemData {
  image: StrapiImage;
  title: string;
  description: RichTextBlock[];
}

export interface RecognitionItemWrapperData {
  recognitionItemNew: RecognitionItemData;
}

export interface RecognitionData {
  heading: string;
  description: RichTextBlock[];
  recognitionItems: RecognitionItemWrapperData[];
}

/* =========================================
   Wellbeing First
========================================= */

export interface WellbeingSlideData {
  title: string;
  description: RichTextBlock[];
  images: StrapiImage[];
}

export interface WellbeingSlideWrapperData {
  wellbeingSlide: WellbeingSlideData;
}

export interface WellbeingFirstData {
  heading: string;
  description: RichTextBlock[];
  wellbeingSlides: WellbeingSlideWrapperData[];
}

/* =========================================
   Beyond Work
========================================= */

export interface BeyondWorkSlideData {
  title: string;
  description: RichTextBlock[];
  images: StrapiImage[];
}

export interface BeyondWorkSlideWrapperData {
  beyondWorkSlideNew: BeyondWorkSlideData;
}

export interface BeyondWorkData {
  heading: string;
  description: RichTextBlock[];
  beyondWorkSlides: BeyondWorkSlideWrapperData[];
}

/* =========================================
   Celebrations
========================================= */

export interface CelebrationsData {
  heading: string;
  description: RichTextBlock[];
  images: StrapiImage[];
}

/* =========================================
   Activities
========================================= */

export interface ActivitySlideData {
  title: string;
  description: RichTextBlock[];
  images: StrapiImage[];
}

export interface ActivitySlideWrapperData {
  activitySlide: ActivitySlideData;
}

export interface ActivitiesData {
  heading: string;
  description: RichTextBlock[];
  activitiesSlides: ActivitySlideWrapperData[];
}

/* =========================================
   Made For More Page
========================================= */

export interface MadeForMorePageData {
  madeForMoreHero: MadeForMoreHeroData;
  madeForMoreIntro: MadeForMoreIntroData;
  learnAndGrow: LearnAndGrowData;
  recognition: RecognitionData;
  wellbeingFirst: WellbeingFirstData;
  beyondWork: BeyondWorkData;
  celebrations: CelebrationsData;
  activities: ActivitiesData;
}