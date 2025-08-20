import {inject, Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {map, Observable} from "rxjs";
import {IUserInfo} from "@app/interfaces/user/user-item.interface";
import {IApiResponse} from "@app/interfaces/courses/api/api-response.interface";

const API_URL = 'http://localhost:4000';

@Injectable({
    providedIn: 'root'
})
export class UserService {

    private http: HttpClient = inject(HttpClient);

    getUser(): Observable<IUserInfo> {
        // Add your code here
        return this.http
            .get<IApiResponse<IUserInfo>>(`${API_URL}/users/me`)
            .pipe(
                map(response => response.result)
            )
    }
}
