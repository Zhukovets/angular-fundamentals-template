export interface Course {
  creationDate: string | Date;
  id?: string;
  title: string;
  description: string;
  duration: number;
  authors: string[];
}
