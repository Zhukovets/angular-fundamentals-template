import {inject, Injectable} from "@angular/core";
import {HttpClient} from "@angular/common/http";
import {map, Observable} from "rxjs";
import {IAuthorApi} from "@app/interfaces/courses/api/author-item.api.interface";
import {IApiResponse} from "@app/interfaces/courses/api/api-response.interface";
import {INewAuthor} from "@app/interfaces/courses/author-item.interface";

const API_URL = 'http://localhost:4000';

@Injectable({
    providedIn: 'root'
})
export class AuthorsApiService {
    private http: HttpClient = inject(HttpClient);

    getAllAuthors(): Observable<IAuthorApi[]> {
        return this.http.get<IApiResponse<IAuthorApi[]>>(`${API_URL}/authors/all`)
            .pipe(
                map(response => response.result)
            );
    }

    createAuthor(author: INewAuthor): Observable<IApiResponse<IAuthorApi>> {
        return this.http.post<IApiResponse<IAuthorApi>>(`${API_URL}/authors/add`, author);
    }

    deleteAuthor(authorId: string): Observable<IApiResponse<string>> {
        return this.http.delete<IApiResponse<string>>(`${API_URL}/authors/${authorId}`);
    }
}