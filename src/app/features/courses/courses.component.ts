import {Component, Input, OnInit} from '@angular/core';
import {Author, CardItem} from "@app/models/card.model";
import {ButtonText} from "@app/models/const";
import {Router} from '@angular/router';
import {CoursesStoreService} from '@app/services/courses-store.service'
import {Subject} from "rxjs";
import {UserStoreService} from "@app/user/services/user-store.service";

@Component({
    selector: 'app-courses',
    templateUrl: './courses.component.html',
    styleUrls: ['./courses.component.scss']
})

export class CoursesComponent implements OnInit {
    buttonTexts = ButtonText;
    @Input() coursesList: CardItem[] = [];
    @Input() authorsList: Author[] = [];

    //for subscriptions
    destroyCourses$ = new Subject<void>();
    destroyAuthors$ = new Subject<void>();

    constructor(private router: Router, private coursesStoreService: CoursesStoreService,
                protected userStoreService: UserStoreService) {
    }

    search(data: string) {
        this.coursesStoreService.filterCourses(data.toLowerCase());
        this.coursesStoreService.courses$.subscribe({
            next: (resp) => {
                this.coursesList = resp;
            },
            error: (err) => {
                console.error('Error combining observables:', err);
            }
        })
    }

    showCourseInfo(id: string) {
        this.router.navigate(['/courses', id]);
    }

    editCourse(id: string) {
        this.router.navigate(['/courses/edit', id]);
    }

    deleteCourse(id: string) {
        this.coursesStoreService.deleteCourse(id).subscribe({
            next: () => {
                this.coursesList = this.coursesList.filter((course) => course.id !== id);
            },
            error: (err) => {
                console.error('Error deleting course:', err);
            }
        });
    }

    ngOnInit() {
        this.coursesStoreService.getAll();
        this.coursesStoreService.courses$.subscribe({
            next: (resp) => {
                this.coursesList = resp;
            },
            error: (err) => {
                console.error('Error combining observables:', err);
            }
        });
    }
}

