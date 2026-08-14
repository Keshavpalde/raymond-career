export interface FooterButton {
  text: string;
  url: string;
}

export interface NavigationLink {
  id: number;

  title: string;

  url: string;

  displayOrder: number;

  column: "Left" | "Right";
}

export interface SocialLink {
  id: number;

  platform:
    | "Instagram"
    | "Facebook"
    | "YouTube"
    | "X"
    | "LinkedIn";

  url: string;

  displayOrder: number;
}

export interface FooterData {
  heading: string;

  ctaButton: FooterButton;

  backgroundImage: {
    url: string;
    alternativeText?: string;
  };

  logo: {
    url: string;
    alternativeText?: string;
  };

  navigationLinks: NavigationLink[];

  socialLinks: SocialLink[];

  copyright: string;
}