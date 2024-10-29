export interface Card {
    id?: string;
    title: string;
    description: string;
    creationDate: Date;
    duration: number;
    authors: string[];
}