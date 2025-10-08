export interface Course {
  id: string;
  title: string;
  description?: string;
  creationDate?: string;
  duration?: number;
  authors?: string[];
}
export type CoursesError = string;

export interface CoursesResponse {
  successful: boolean;
  result: Course[];
}