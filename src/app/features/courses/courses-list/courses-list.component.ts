import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-courses-list',
  templateUrl: './courses-list.component.html',
  styleUrls: ['./courses-list.component.scss']
})
export class CoursesListComponent {
  @Input() courses: Array<any> = [];
  @Input() editable: boolean = false;

  @Output() showCourse = new EventEmitter<any>();
  @Output() editCourse = new EventEmitter<any>();
  @Output() deleteCourse = new EventEmitter<any>();

  onShow(id: any) {
    this.showCourse.emit(id);
  }

  onEdit(id: any) {
    this.editCourse.emit(id);
  }

  onDelete(id: any) {
    this.deleteCourse.emit(id);
  }
}
