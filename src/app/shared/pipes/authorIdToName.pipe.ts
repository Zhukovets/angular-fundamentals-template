import { Pipe, PipeTransform } from "@angular/core";
import { CoursesStoreService } from '@app/services/courses-store.service';
import { map, Observable } from "rxjs";


@Pipe({
    name: 'authorIdToName',
    pure: false
})
export class AuthorPipe implements PipeTransform{
  authors$: Observable<any[]>;

  constructor(private coursesStoreService: CoursesStoreService){
    this.authors$ = this.coursesStoreService.authors$;
  }

  transform(ids: string[]): Observable<string[]> {
    return this.authors$.pipe(
      map((authors) =>
        ids.map((id) => {
          const author = authors.find((a) => a.id === id);
          return author ? author.name : 'Unknown';
        })
      )
    );
}
}
