import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ApiResponse } from '@app/models/course.model';
import { User } from '@app/models/user.model';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
    providedIn: 'root'
})
export class UserService {

    constructor(private http: HttpClient){}

    getUser(): Observable<ApiResponse<User>> {
        return this.http.get<ApiResponse<User>>(`${environment.apiBaseUrl}/users/me`);
    }
}
