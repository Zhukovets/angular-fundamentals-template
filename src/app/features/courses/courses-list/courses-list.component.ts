import { Component, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-courses-list',
  templateUrl: './courses-list.component.html',
  styleUrls: ['./courses-list.component.css']
})
export class CoursesListComponent {
  @Input() courses: any[] = [];
  @Input() editable: boolean = false;

  @Output() showCourse = new EventEmitter<any>();
  @Output() editCourse = new EventEmitter<any>();
  @Output() deleteCourse = new EventEmitter<any>();

  onShow(course: any) {
    this.showCourse.emit(course);
  }

  onEdit(course: any) {
    this.editCourse.emit(course);
  }

  onDelete(course: any) {
    this.deleteCourse.emit(course);
  }
}
