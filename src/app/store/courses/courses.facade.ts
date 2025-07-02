// @ts-nocheck
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class CoursesStateFacade {
    isAllCoursesLoading$: Observable<boolean>;
    isSingleCourseLoading$: Observable<boolean>;
    isSearchingState$: Observable<boolean>;
    courses$: Observable<any[]>;
    allCourses$: Observable<any[]>;
    course$: Observable<any>;
    errorMessage$: Observable<string>;


    constructor() {
        // Add your code here
    }

    getAllCourses(): void {
        // Add your code here
    }

    getSingleCourse(id: string): void {
        // Add your code here
    }

    getFilteredCourses(searchValue: string): void {
        // Add your code here
    }

    editCourse(body: any, id: string): void {
        // Add your code here
    }

    createCourse(body: any): void {
        // Add your code here
    }

    deleteCourse(id: string): void {
        // Add your code here
    }
}
