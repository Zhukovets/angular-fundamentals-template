import { Component } from '@angular/core';

@Component({
  selector: 'app-courses',
  templateUrl: './courses.component.html',
  styleUrls: ['./courses.component.css']
})
export class CoursesComponent {
  courses = [];

  onSearch(searchTerm: string): void {
    console.log('User searched for:', searchTerm);
    // Implement logic to filter courses based on the search term
  }
}
