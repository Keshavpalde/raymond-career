export interface StrapiTextNode {
  type: string;
  text?: string;
  children?: StrapiTextNode[];
}

export interface ValueItem {
  id: number;

  title: string;

  description?: StrapiTextNode[];

  icon?:
    | {
        url: string;
        alternativeText?: string;
      }
    | {
        data?: {
          attributes?: {
            url: string;
            alternativeText?: string;
          };
        };
      };
}

export interface ValuesSectionData {
  heading: string;

  subHeading: string;

  leftImage: {
    url: string;
    alternativeText?: string;
  };

  values: ValueItem[];
}