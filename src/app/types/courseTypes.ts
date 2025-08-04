export type Course = {
  id: string;
  title: string;
  description: string;
  creationDate: string;
  duration: number;
  authors: string[];
};

export type CoursesResponse = {
  successful: boolean;
  result: Course[];
};

export type CourseResponse = {
  successful: boolean;
  result: Course;
};
