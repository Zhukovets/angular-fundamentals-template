import { Component, Input, Output, EventEmitter } from '@angular/core';
import { Course } from '../../../models/course.model';

@Component({
  selector: 'app-courses-list',
  templateUrl: './courses-list.component.html',
  styleUrls: ['./courses-list.component.css']
})

export class CoursesListComponent {
  @Input() courses!: Course[];
  @Input() editable: boolean = false;

  @Output() showCourse = new EventEmitter<any>();
  @Output() editCourse = new EventEmitter<any>();
  @Output() deleteCourse = new EventEmitter<any>();

  onShowCourse(course: Course) {
    console.log('clickOnShow result:', course);
  }
}
