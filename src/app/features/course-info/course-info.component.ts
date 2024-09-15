import { Component, Input } from '@angular/core';

export interface Course {
  title: string;
  description: string;
  id: string;
  creationDate: Date;
  duration: number;
  authors: string[];
}

@Component({
  selector: 'app-course-info',
  templateUrl: './course-info.component.html',
  styleUrls: ['./course-info.component.scss'],
})
export class CourseInfoComponent {
  // Use the names for the input `course`.
  @Input() course!: Course;
}
