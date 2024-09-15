import { Component, Input, Output, EventEmitter } from '@angular/core';

import { Course } from '@app/features/course-info/course-info.component';

@Component({
  selector: 'app-courses-list',
  templateUrl: './courses-list.component.html',
  styleUrls: ['./courses-list.component.css'],
})
export class CoursesListComponent {
  @Input() courses: Course[] = [];
  @Input() editable: boolean = false;

  @Output() showCourse = new EventEmitter();
  @Output() editCourse = new EventEmitter();
  @Output() deleteCourse = new EventEmitter();

  showCourseHandler(course: Course) {
    this.showCourse.emit(course);
  }
  editCourseHandler(course: Course) {
    this.showCourse.emit(course);
  }
  deleteCourseHanlder(course: Course) {
    this.showCourse.emit(course);
  }
}
