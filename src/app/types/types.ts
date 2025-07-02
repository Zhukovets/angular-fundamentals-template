export type Course = {
  id: string;
  title: string;
  description: string;
  creationDate: Date;
  duration: number;
  authors: string[];
};

export type Author = {
  id: string;
  name: string;
};
