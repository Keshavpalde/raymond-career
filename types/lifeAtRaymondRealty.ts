export interface GalleryImage {
  id: number;

  image: {
    url: string;
    alternativeText?: string;
  };

  altText?: string;

  order: number;

  imageLink?: string;

  openInNewTab?: boolean;
}

export interface LifeAtRaymondRealtyData {
  heading: string;

  buttonText: string;

  buttonLink: string;

  galleryItems: GalleryImage[];
}