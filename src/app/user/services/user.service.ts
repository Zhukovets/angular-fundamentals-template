import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class UserService {

    private apiUrl = 'http://localhost:4000'

    constructor( private http: HttpClient ){}

    getUser(): Observable<any> {
        return this.http.get(`${this.apiUrl}/users/me`)
        // Add your code here
    }
}
