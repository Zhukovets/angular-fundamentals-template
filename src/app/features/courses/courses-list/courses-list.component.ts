import { Component, Input, Output, EventEmitter } from '@angular/core';
import { Course } from '../../../services/courses.service';


@Component({
  selector: 'app-courses-list',
  templateUrl: './courses-list.component.html',
  styleUrls: ['./courses-list.component.css']
})
export class CoursesListComponent {
  @Input() courses: Course[] = [];
  @Input() editable: boolean = false;
  @Input() authorMap: Record<string, string> = {};

  @Output() showCourse = new EventEmitter<string>();
  @Output() editCourse = new EventEmitter<string>();
  @Output() deleteCourse = new EventEmitter<string>();

  getAuthorNames(ids: string[]): string[] {
    return ids.map(id => this.authorMap[id] ?? id); 
  }

  onShow(id: string) {
    this.showCourse.emit(id);
  }

  onEdit(id: string) {
    this.editCourse.emit(id);
  }

  getDate(date: string | Date): Date {
    return date instanceof Date ? date : new Date(date);
  }

  onDelete(id: string) {
    this.deleteCourse.emit(id);
  }
  ngOnInit() {
  console.log('CoursesListComponent ngOnInit courses:', this.courses);
}

}