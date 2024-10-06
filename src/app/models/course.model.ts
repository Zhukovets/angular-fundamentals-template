export interface Course {
    title: string;
    description: string,
    id: string;
    creationDate: Date | string;
    duration: number;
    authors: string[];
}