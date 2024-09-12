const loremMock: string =
  "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.";

export interface Post {
  id: string;
  title: string;
  description: string;
  creationDate: Date;
  duration: number;
  authors: string[];
}

const postMock0: Post = {
  id: "1",
  title: "Angular",
  description: loremMock,
  creationDate: new Date("03.20.2012"),
  duration: 150,
  authors: ["Dave Haisenberg", "Tony Ja"],
};

const postMock1: Post = {
  id: "2",
  title: "Java",
  description: loremMock,
  creationDate: new Date("08.14.2017"),
  duration: 60,
  authors: ["Dave Simonnds", "Valentina Lary"],
};

const postMock2: Post = {
  id: "3",
  title: "ASP .NET",
  description: loremMock,
  creationDate: new Date("06.01.2022"),
  duration: 210,
  authors: ["Sam Smith", "Tony Robbins"],
};

export const posts: Post[] = [postMock0, postMock1, postMock2];
