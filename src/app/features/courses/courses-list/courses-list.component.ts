import {Component, EventEmitter, Input, Output} from '@angular/core';
import {ICourseWithAuthors} from "@app/interfaces/courses/course-item.interface";

@Component({
  selector: 'app-courses-list',
  templateUrl: './courses-list.component.html',
  styleUrls: ['./courses-list.component.scss']
})
export class CoursesListComponent {
  @Input() courses!: ICourseWithAuthors[];
  @Input() editable!: boolean | null;

  @Output() showCourse = new EventEmitter();
  @Output() editCourse = new EventEmitter();
  @Output() deleteCourse = new EventEmitter();
}
