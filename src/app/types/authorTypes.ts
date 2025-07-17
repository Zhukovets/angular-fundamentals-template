export type Author = {
  id: string;
  name: string;
};

export type AuthorsResponse = {
  successful?: boolean;
  result: Author[];
};

export type AuthorResponse = {
  successful?: boolean;
  result: Author;
};
