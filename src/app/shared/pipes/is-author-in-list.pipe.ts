import { Pipe, PipeTransform } from '@angular/core';
import {IAuthor} from "@app/interfaces/courses/author-item.interface";

@Pipe({
    name: 'isAuthorInList'
})
export class isAuthorInList implements PipeTransform {
    transform(authors: IAuthor[], id: string, name: string): boolean {
        if (!authors || !id || !name) {
            return false;
        }
        return authors.some(author => author.id === id && author.name === name);
    }
}