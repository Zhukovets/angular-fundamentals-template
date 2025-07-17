export type Course = {
  id: number | string;
  title: string;
  description?: string;
  creationDate?: string;
  duration?: number;
  authors?: string[];
};

export type CoursesResponse = {
  successful?: boolean;
  result: Course[];
};

export type CourseResponse = {
  successful?: boolean;
  result: Course;
};
