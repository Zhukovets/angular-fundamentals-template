import {Pipe, PipeTransform} from "@angular/core";
import {IAuthor} from "@app/interfaces/courses/author-item.interface";

@Pipe({
    name: 'authorsToNames'
})

export class AuthorsToNamesPipe implements PipeTransform {
    transform(authors: IAuthor[]): string[] {
        return authors.map(author => author.name)
    }
}