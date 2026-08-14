export interface Media {
  url: string;
  alternativeText?: string;
}

export interface TestimonialItem {
  id: number;

  employeeName: string;

  designation: string;

  employeePhoto: Media;

  quote: any[];

  videoType: "youtube" | "uploaded";

  youtubeUrl?: string;

  uploadedVideo?: Media;

  thumbnailImage?: Media;

  activeByDefault: boolean;

  displayOrder: number;
}

export interface EmployeeTestimonialsData {
  heading: string;

  backgroundImage: Media;

  testimonials: TestimonialItem[];
}