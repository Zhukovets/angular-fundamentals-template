import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-courses-list',
  templateUrl: './courses-list.component.html',
  styleUrls: ['./courses-list.component.scss']
})
export class CoursesListComponent {
  @Input() courses!: { title: string, description: string, id: string, creationDate: Date, duration: number, authors: string[]}[];
  @Input() editable!: boolean;

  @Output() showCourse = new EventEmitter<any>();
  @Output() editCourse = new EventEmitter<any>();
  @Output() deleteCourse = new EventEmitter<any>();
}
