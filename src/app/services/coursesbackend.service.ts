import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

const SERVER_URL = 'http://localhost:4000'

@Injectable({
    providedIn: 'root'
})
export class CoursesBackendService {

    constructor(private httpClient: HttpClient) { }

    get<T>(url: string) {
        return this.httpClient.get<T>(this.getAbsoluteUrl(url));
    }

    post<T>(url: string, body: any) {
        return this.httpClient.post(this.getAbsoluteUrl(url), body);
    }

    put<T>(url: string, body: any) {
        return this.httpClient.put(this.getAbsoluteUrl(url), body);
    }

    delete(url: string) {
        return this.httpClient.delete(this.getAbsoluteUrl(url));
    }

    getAbsoluteUrl(url: string) {
        return `${SERVER_URL}${url}`;
    }
}