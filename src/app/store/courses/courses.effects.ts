// @ts-nocheck
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable()
export class CoursesEffects {
    constructor(
        // Add your code here
    ) {}

    getAll$: Observable<any>; // replace the type

    filteredCourses$: Observable<any>; // replace the type

    getSpecificCourse$: Observable<any>; // replace the type

    deleteCourse$: Observable<any>; // replace the type

    editCourse$: Observable<any> // replace the type

    createCourse$: Observable<any>; // replace the type

    redirectToTheCoursesPage$: Observable<any>; // replace the type
}
