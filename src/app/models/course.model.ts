export interface Course {
    id: number;
    title: string;
    description: string;
    creationDate: string;
    duration: number;
    authors: string[];
}

export interface ApiResponse<T> {
    successful: boolean;
    result: T;
  }