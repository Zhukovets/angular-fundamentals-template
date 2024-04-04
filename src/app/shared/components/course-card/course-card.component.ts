import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Course } from '@app/shared/models/course';

@Component({
  selector: 'app-course-card',
  templateUrl: './course-card.component.html',
  styleUrls: ['./course-card.component.scss']
})
export class CourseCardComponent {
  @Input() course: Course = {} as Course;
  @Input() isEditable: boolean = false;

  @Output() clickOnShow: EventEmitter<Course> = new EventEmitter<Course>();

  showCourse() {
    this.clickOnShow.emit(this.course);
  }
}
