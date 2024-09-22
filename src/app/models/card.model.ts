interface CardItem {
    id?: string;
    title: string;
    description: string;
    creationDate: Date;
    duration: number;
    authors: string[];
}

interface Author {
    id: string;
    name: string;
}

interface AuthDate {
    email: string;
    password: string;
}

export { Author, CardItem, AuthDate }