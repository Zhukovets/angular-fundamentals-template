import {Component, Input, OnInit} from '@angular/core';
import {Author, CardItem} from '@app/models/card.model';
import {ButtonText} from '@app/models/const';
import {Router} from '@angular/router';
import {Subject} from 'rxjs';
import {UserStoreService} from '@app/user/services/user-store.service';
import {CoursesStateFacade} from '@app/store/courses/courses.facade'

@Component({
    selector: 'app-courses',
    templateUrl: './courses.component.html',
    styleUrls: ['./courses.component.scss']
})

export class CoursesComponent implements OnInit {
    buttonTexts = ButtonText;

    //for subscriptions
    destroyCourses$ = new Subject<void>();
    destroyAuthors$ = new Subject<void>();

    constructor(private router: Router,
                protected userStoreService: UserStoreService,
                private coursesFacade: CoursesStateFacade) {
    }

    search(searchValue: string) {
        this.coursesFacade.getFilteredCourses(searchValue);
    }

    showCourseInfo(id: string) {
        this.router.navigate(['/courses', id]);
    }

    editCourse(id: string) {
        this.router.navigate(['/courses/edit', id]);
    }

    deleteCourse(id: string) {
        this.coursesFacade.deleteCourse(id);
    }

    ngOnInit() {
        this.coursesFacade.getAllCourses();
    }
}

