export interface Course {
  title: string;
  description: string;
  duration: number;
  authors: string[]; // List of author IDs (or names depending on your API)
}
