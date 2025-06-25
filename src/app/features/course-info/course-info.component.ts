import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { mockedAuthorsList } from '@app/shared/mocks/mocks';
import { Course } from '../courses/courses.component';

@Component({
  selector: 'app-course-info',
  templateUrl: './course-info.component.html',
  styleUrls: ['./course-info.component.scss']
})
export class CourseInfoComponent implements OnInit {
  // Use the names for the input `course`.
    @Input() course!: Course
    @Input() showCourseInfo!: boolean
    @Output() hideCourseEmitter = new EventEmitter<boolean>()

     ngOnInit(): void {
      this.course.authors = this.course.authors.map((authorId) => {
        const author = mockedAuthorsList.find((author) => author.id === authorId);
        return author!.name
      });  
      }

    hideCourse() {
      this.hideCourseEmitter.next(false)
    }

}
