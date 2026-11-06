export interface Testimonial {
  id: string;
  name: string;
  content: string;
  rating: number;
  image: string | null;
  createdAt: string;
}

export interface TestimonialsResponse {
  payload: {
    data: Testimonial[];
  };
}