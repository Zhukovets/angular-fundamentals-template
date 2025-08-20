import {inject, Injectable} from "@angular/core";
import {HttpClient} from "@angular/common/http";
import {map, Observable} from "rxjs";
import {IApiResponse} from "@app/interfaces/courses/api/api-response.interface";
import {ICourseApi} from "@app/interfaces/courses/api/course-item.api.interface";
import {newCourse} from "@app/interfaces/courses/course-item.interface";

const API_URL = 'http://localhost:4000';

@Injectable({
    providedIn: 'root'
})
export class CoursesApiService {
    private http: HttpClient = inject(HttpClient);

    getAllCourses(): Observable<ICourseApi[]> {
        return this.http.get<IApiResponse<ICourseApi[]>>(`${API_URL}/courses/all`)
            .pipe(
                map(res => res.result)
            );
    }

    getFilteredCourses(title: string): Observable<ICourseApi[]> {
        return this.http.get<IApiResponse<ICourseApi[]>>(`${API_URL}/courses/filter`, {params: {title: title}})
            .pipe(
                map(res => res.result)
            );
    }

    addCourse(courseData: newCourse): Observable<ICourseApi> {
        return this.http.post<IApiResponse<ICourseApi>>(`${API_URL}/courses/add`, courseData)
            .pipe(
                map(res => res.result)
            );
    }

    getCourseById(courseId: string): Observable<ICourseApi> {
        return this.http.get<IApiResponse<ICourseApi>>(`${API_URL}/courses/${courseId}`)
            .pipe(
                map(res => res.result)
            );
    }

    editCourse(id: string, courseData: newCourse): Observable<ICourseApi> {
        return this.http.put<IApiResponse<ICourseApi>>(`${API_URL}/courses/${id}`, courseData)
            .pipe(
                map(res => res.result)
            );
    }

    deleteCourse(courseId: string): Observable<IApiResponse<string>> {
        return this.http.delete<IApiResponse<string>>(`${API_URL}/courses/${courseId}`);
    }
}