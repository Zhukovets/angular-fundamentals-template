import {IAuthorApi} from "@app/interfaces/courses/api/author-item.api.interface";
import {IAuthor} from "@app/interfaces/courses/author-item.interface";

export function transformAuthor(author: IAuthorApi): IAuthor {
    return {
        id: author.id,
        name: author.name
    }
}

export function transformAuthors(authors: IAuthorApi[]): IAuthor[] {
    return authors.map(transformAuthor);
}