import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Course } from '../courses.component';

@Component({
  selector: 'app-courses-list',
  templateUrl: './courses-list.component.html',
  styleUrls: ['./courses-list.component.css']
})
export class CoursesListComponent {

  @Input() courses: Course[] = [];
  @Input() editable!: boolean;

  @Output() showCourse = new EventEmitter<string>();
  @Output() editCourse = new EventEmitter<string>();
  @Output() deleteCourse = new EventEmitter<string>();

showCourseInfo(courseTitle: string) {
  this.showCourse.next(courseTitle);
}

stringToDate(value: string) {
  return new Date(value);
}

}
