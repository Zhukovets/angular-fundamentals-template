import { Component, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-courses-list',
  templateUrl: './courses-list.component.html',
  styleUrls: ['./courses-list.component.css']
})
export class CoursesListComponent {
  @Input() courses: any[] = [];
  @Input() editable: boolean = true;

  @Output() showCourse = new EventEmitter<any>();
  @Output() editCourse = new EventEmitter<any>();
  @Output() deleteCourse = new EventEmitter<any>();

  onShowCourse(course: any) {
    this.showCourse.emit(course);
  }

  onEditCourse(course: any) {
    this.editCourse.emit(course);
  }

  onDeleteCourse(course: any) {
    this.deleteCourse.emit(course);
  }
}
