import { Component, Input, Output, EventEmitter } from '@angular/core';
import { Course } from '../../services/courses.service';

@Component({
  selector: 'app-course-info',
  templateUrl: './course-info.component.html',
  styleUrls: ['./course-info.component.scss']
})
export class CourseInfoComponent {
  @Input() course!: Course;
  
  @Output() goBack = new EventEmitter<void>();

  onBack() {
    this.goBack.emit();
  }
}