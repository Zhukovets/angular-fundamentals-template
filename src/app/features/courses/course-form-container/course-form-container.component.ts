import {Component, inject, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {IAuthor, INewAuthor} from "@app/interfaces/courses/author-item.interface";
import {Observable} from "rxjs";
import {ICourseWithAuthors, newCourse} from "@app/interfaces/courses/course-item.interface";
import {ROUTE_NAMES} from "@app/app-routing.module";
import {CoursesStateFacade} from "@app/store/courses/courses.facade";

@Component({
    selector: 'app-course-form-container',
    templateUrl: './course-form-container.component.html',
    styleUrls: ['./course-form-container.component.css']
})
export class CourseFormContainerComponent implements OnInit {
    private coursesFacade = inject(CoursesStateFacade);
    private router = inject(Router);
    private route = inject(ActivatedRoute);

    courseId?: string | null;
    allAuthors$: Observable<IAuthor[]> = this.coursesFacade.authors$;
    course$: Observable<ICourseWithAuthors | null> = this.coursesFacade.course$;

    ngOnInit() {
        this.handleDataInitialization();
    }

    handleDataInitialization(): void {
        this.coursesFacade.clearSingleCourse();
        this.courseId = this.route.snapshot.paramMap.get('id');
        this.coursesFacade.getAllAuthors();

        if (this.courseId) {
            this.coursesFacade.getSingleCourse(this.courseId);
        }
    }

    navToCourses(): void {
        this.router.navigate([ROUTE_NAMES.COURSES]);
    }

    createNewAuthor(newAuthorName: string) {
        const newAuthor: INewAuthor = {name: newAuthorName};
        this.coursesFacade.createAuthor(newAuthor);
    }

    deleteAuthor(id: string): void {
        this.coursesFacade.deleteAuthor(id);
    }

    handleCourse(course: newCourse): void {
        if (this.courseId) {
            this.coursesFacade.editCourse(course, this.courseId);
        } else {
            this.coursesFacade.createCourse(course);
        }
    }
}
