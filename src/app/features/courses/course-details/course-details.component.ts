import {Component, inject, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {Observable} from "rxjs";
import {ICourseWithAuthors} from "@app/interfaces/courses/course-item.interface";
import {ROUTE_NAMES} from "@app/app-routing.module";
import {CoursesStateFacade} from "@app/store/courses/courses.facade";

@Component({
    selector: 'app-course-details',
    templateUrl: './course-details.component.html',
    styleUrls: ['./course-details.component.css']
})
export class CourseDetailsComponent implements OnInit {
    private coursesFacade = inject(CoursesStateFacade);
    private router = inject(Router);
    private route = inject(ActivatedRoute);

    courseId!: string;
    course$: Observable<ICourseWithAuthors | null> = this.coursesFacade.course$;

    ngOnInit(): void {
        this.initCourse();
    }

    initCourse(): void {
        const courseId = this.route.snapshot.paramMap.get('id');
        if (courseId) {
            this.coursesFacade.getSingleCourse(courseId);
        } else {
            this.navToCourses();
        }
    }

    navToCourses(): void {
        this.router.navigate([ROUTE_NAMES.COURSES]);
    }
}

