import { Component, EventEmitter, Output } from '@angular/core';
import { mockedCoursesList } from '../../shared/mocks/mocks';

@Component({
  selector: 'app-courses',
  templateUrl: './courses.component.html',
  styleUrls: ['./courses.component.css']
})
export class CoursesComponent {
  courses = mockedCoursesList;
  filteredCourses = mockedCoursesList;
  editable = true;

  @Output() showCourse = new EventEmitter<string>();
  @Output() editCourse = new EventEmitter<string>();
  @Output() deleteCourse = new EventEmitter<string>();

  onSearch(query: string) {
    if (!query) {
      this.filteredCourses = this.courses;
      return;
    }
    this.filteredCourses = this.courses.filter(c =>
      c.title.toLowerCase().includes(query.toLowerCase()) ||
      c.description.toLowerCase().includes(query.toLowerCase())
    );
  }

  onShowCourse(id: string) {
    this.showCourse.emit(id);
  }

  onEditCourse(id: string) {
    this.editCourse.emit(id);
  }

  onDeleteCourse(id: string) {
    this.deleteCourse.emit(id);
    this.courses = this.courses.filter(c => c.id !== id);
    this.filteredCourses = this.filteredCourses.filter(c => c.id !== id);
  }
}