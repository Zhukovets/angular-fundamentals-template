import { Component, Input, Output, EventEmitter } from '@angular/core';
import { Course } from '../../../models/course.model';

@Component({
  selector: 'app-course-card',
  templateUrl: './course-card.component.html',
  styleUrls: ['./course-card.component.scss']
})

export class CourseCardComponent {
  @Input() course: Course | undefined = undefined;
  @Input() editable: boolean = false;

  @Output() clickOnShow = new EventEmitter<Course>();

  onShowCourse(course: Course) {
    this.clickOnShow.emit(course);
  }
}