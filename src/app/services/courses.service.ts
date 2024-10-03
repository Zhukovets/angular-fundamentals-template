import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {
    coursesAllUrl,
    coursesFilterUrl,
    coursesAddUrl,
    authorsAllUrl,
    coursesUrl,
    authorAddUrl, authorByIdUrl
} from '@app/api.config'
import {
    CoursesAllResponse, AuthorsAllResponse,
    CourseResponse, CreateCourseRequest,
    CreateCourseResponse, CardItem,
    UpdateCourseRequest, UpdateCourseResponse,
    CreateAuthorResponse, AuthorResponse,
} from '@app/models/card.model'


@Injectable({
    providedIn: 'root'
})
export class CoursesService {

    constructor(private http: HttpClient) {}

    createHeaders(): HttpHeaders {
        return new HttpHeaders({
            'Accept': '*/*',
            'Content-Type': 'application/json'
        });
    }

    getAll() {
        return this.http.get<CoursesAllResponse>(`${coursesAllUrl}`, {headers: this.createHeaders()});
    }

    createCourse(course: CreateCourseRequest) {
        return this.http.post<CreateCourseResponse>(`${coursesAddUrl}`, JSON.stringify(course), {headers: this.createHeaders()})
    }

    editCourse(id: string, course: UpdateCourseRequest) {
        return this.http.put<UpdateCourseResponse>(`${coursesUrl}/${id}`, JSON.stringify(course), {headers: this.createHeaders()});
    }

    getCourse(id: string) {
        return this.http.get<CourseResponse>(`${coursesUrl}/${id}`, {headers: this.createHeaders()});
    }

    deleteCourse(id: string) {
        return this.http.delete<CardItem>(`${coursesUrl}/${id}`, {headers: this.createHeaders()});
    }

    filterCourses(value: string) {
        return this.http.get<CoursesAllResponse>(`${coursesFilterUrl}?title=${value}`, {headers: this.createHeaders()});
    }

    getAllAuthors() {
        return this.http.get<AuthorsAllResponse>(`${authorsAllUrl}`, {headers: this.createHeaders()})
    }

    createAuthor(name: string) {
        return this.http.post<CreateAuthorResponse>(`${authorAddUrl}`, JSON.stringify({name: name}), {headers: this.createHeaders()})
    }

    getAuthorById(id: string) {
        return this.http.get<AuthorResponse>(`${authorByIdUrl}/${id}`, {headers: this.createHeaders()})
    }
}
