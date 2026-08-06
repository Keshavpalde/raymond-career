export interface StrapiTextNode {
  type: string;
  text?: string;
  children?: StrapiTextNode[];
}

export interface HeroButton {
  text: string;
  url: string;
}

export interface HeroData {
  eyebrow?: string;
  heading: string;
  description: StrapiTextNode[];
  primaryButton?: HeroButton;
  backgroundVideo?:
    | {
        url: string;
      }
    | {
        data?: {
          attributes?: {
            url: string;
          };
        };
      };
}
