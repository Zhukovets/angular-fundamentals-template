import {Component, inject, OnInit} from '@angular/core';
import {Router} from "@angular/router";
import {ROUTE_NAMES} from "@app/app-routing.module";
import {UserStoreService} from "@app/user/services/user-store.service";
import {CoursesStateFacade} from "@app/store/courses/courses.facade";

@Component({
    selector: 'app-courses',
    templateUrl: './courses.component.html',
    styleUrls: ['./courses.component.scss']
})
export class CoursesComponent implements OnInit {
    private userService = inject(UserStoreService);
    private router = inject(Router);
    private coursesFacade = inject(CoursesStateFacade);

    coursesWithAuthors$ = this.coursesFacade.courses$;
    searchTerm?: string;
    enabled$ = this.userService.isAdmin$;
    isLoading$ = this.coursesFacade.isAllCoursesLoading$;

    ngOnInit() {
        this.coursesFacade.getAllCourses();
    }

    handleSearch(searchTerm: string): void {
        this.searchTerm = searchTerm;
        const trimmedSearchTerm = (searchTerm ?? '').trim();

        trimmedSearchTerm === ''
            ? this.coursesFacade.getAllCourses()
            : this.coursesFacade.getFilteredCourses(trimmedSearchTerm);
    }

    deleteCourse(courseId: string): void {
        this.coursesFacade.deleteCourse(courseId);
    }

    editCourse(courseId: string): void {
        this.navigateToCourseForm(courseId);
    }

    showCourse(courseId: string): void {
        this.router.navigate([ROUTE_NAMES.COURSES, courseId]);
    }

    navigateToCourseForm(courseId?: string): void {
        courseId ? this.router.navigate([ROUTE_NAMES.COURSES, 'edit', courseId]) : this.router.navigate([ROUTE_NAMES.COURSES, 'add']);
    }
}
