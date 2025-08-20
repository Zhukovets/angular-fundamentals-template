import {IAuthor} from "@app/interfaces/courses/author-item.interface";

export interface ICourse extends ICourseBase {
    authors: string[];
}

interface ICourseBase {
    id: string;
    title: string;
    description: string;
    creationDate: Date;
    duration: number;
}

export interface ICourseWithAuthors extends ICourseBase {
    authors: IAuthor[];
}

export interface newCourse {
    "title": string,
    "description": string,
    "duration": number,
    "authors": string[],
}