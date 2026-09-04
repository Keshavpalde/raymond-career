/* =========================================
   STRAPI MEDIA
========================================= */

export interface StrapiMedia {
  id?: number;
  documentId?: string;
  name?: string;
  url?: string;
  alternativeText?: string | null;
  caption?: string | null;
  width?: number;
  height?: number;
  mime?: string;

  formats?: {
    thumbnail?: {
      url?: string;
      width?: number;
      height?: number;
    };

    small?: {
      url?: string;
      width?: number;
      height?: number;
    };

    medium?: {
      url?: string;
      width?: number;
      height?: number;
    };

    large?: {
      url?: string;
      width?: number;
      height?: number;
    };
  };
}

/* =========================================
   HOME JOB OPPORTUNITIES
========================================= */

export interface HomeJobOpportunitiesData {
  id?: number;

  heading: string;

  buttonText?: string | null;

  buttonUrl?: string | null;

  bgImage?: StrapiMedia | null;
}

/* =========================================
   JOB OPENING
========================================= */

export interface JobOpening {
  id?: number;

  documentId?: string;

  title: string;

  department?: string | null;

  location?: string | null;

  employmentType?: string | null;

  workMode?: string | null;

  experience?: string | null;

  postedOn?: string | null;

  atsUrl?: string | null;
}

/* =========================================
   STRAPI RESPONSE
========================================= */

export interface JobOpeningResponse {
  data: JobOpening[];
  meta?: {
    pagination?: {
      page: number;
      pageSize: number;
      pageCount: number;
      total: number;
    };
  };
}