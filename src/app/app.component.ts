import { Component } from '@angular/core';
import { mockedCoursesList } from './shared/mocks/mocks';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'courses-app';
  courses = mockedCoursesList; 
  selectedCourse: any = null;

  onShowCourse(id: string) {
    this.selectedCourse = this.courses.find(c => c.id === id) || null;
    console.log('Show course', this.selectedCourse);
  }

  onBackFromCourseInfo() {
    this.selectedCourse = null;
  }

  onEditCourse(id: string) {
    console.log('Edit course', id);
  }

  onDeleteCourse(id: string) {
    console.log('Delete course', id);
  }
}