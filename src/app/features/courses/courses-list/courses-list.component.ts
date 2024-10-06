import {Component, EventEmitter, Input, Output} from '@angular/core';
import {CardItem} from '@app/models/card.model';
import { ButtonText } from 'src/app/models/const'
import {CoursesStateFacade} from '@app/store/courses/courses.facade';
import {Observable} from "rxjs";


@Component({
  selector: 'app-courses-list',
  templateUrl: './courses-list.component.html',
  styleUrls: ['./courses-list.component.css']
})

export class CoursesListComponent {
  buttonTexts = ButtonText;
  coursesList$: Observable<CardItem[]>;

  @Input() editable: boolean = false;
  @Output() showCourse = new EventEmitter<string>();
  @Output() editCourse = new EventEmitter<string>();
  @Output() deleteCourse = new EventEmitter<string>();

  constructor(protected coursesFacade: CoursesStateFacade) {
    this.coursesList$ = this.coursesFacade.allCourses$;
  }

  clickOnShow(id : string) {
    this.showCourse.emit(id);
  }

  clickOnEdit(id : string) {
    this.editCourse.emit(id);
  }

  clickOnDelete(id: string) {
    this.deleteCourse.emit(id)
  }
}
