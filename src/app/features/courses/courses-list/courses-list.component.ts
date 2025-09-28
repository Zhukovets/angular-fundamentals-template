import { Component, Input, Output, EventEmitter } from '@angular/core';
import { mockedAuthorsList } from '../../../shared/mocks/mocks';

export interface Course {
  id: string;
  title: string;
  description: string;
  creationDate: Date;
  duration: number;
  authors: string[];
}

@Component({
  selector: 'app-courses-list',
  templateUrl: './courses-list.component.html',
  styleUrls: ['./courses-list.component.css']
})
export class CoursesListComponent {
  @Input() courses: Course[] = [];
  @Input() editable: boolean = false;

  @Output() showCourse = new EventEmitter<string>();
  @Output() editCourse = new EventEmitter<string>();
  @Output() deleteCourse = new EventEmitter<string>();

  getAuthorNames(ids: string[]): string[] {
    return mockedAuthorsList
      .filter(author => ids.includes(author.id))
      .map(author => author.name);
  }

  onShow(id: string) {
    this.showCourse.emit(id);
  }

  onEdit(id: string) {
    this.editCourse.emit(id);
  }

  onDelete(id: string) {
    this.deleteCourse.emit(id);
  }
  ngOnInit() {
  console.log('CoursesListComponent ngOnInit courses:', this.courses);
}

}