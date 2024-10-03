import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {usersUrl} from '@app/api.config';
import {UserResponse} from '@app/models/card.model'
import {Observable} from "rxjs";

@Injectable()
export class UserService {
    constructor(private http: HttpClient) {}

    createHeaders(): HttpHeaders {
        return new HttpHeaders({
            'Accept': '*/*',
            'Content-Type': 'application/json'
        });
    }

    getUser(): Observable<UserResponse> {
        return this.http.get<UserResponse>(`${usersUrl}`, {headers: this.createHeaders()});
    }
}
