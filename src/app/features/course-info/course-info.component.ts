import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Course } from '@app/models/course.model';
import { CoursesStateFacade } from '@app/store/courses/courses.facade';


@Component({
  selector: 'app-course-info',
  templateUrl: './course-info.component.html',
  styleUrls: ['./course-info.component.scss']
})
export class CourseInfoComponent implements OnInit {

  course: Course = {
    title: '',
    description: '',
    id: '',
    creationDate: '',
    duration: 0,
    authors: []
  };

  constructor (private coursesFacade: CoursesStateFacade, private route: ActivatedRoute) {}

  ngOnInit(): void {
    const courseId = this.route.snapshot.paramMap.get('id');
    console.log(courseId)

    if (courseId){
      this.coursesFacade.getSingleCourse(courseId);

      this.coursesFacade.course$.subscribe(
        (course) => {
          if (course) {
            this.course = course
          }
        },
        (error) => {
          console.log('Error fetching course data:', error);
        }
      );
    } else {
      console.error('No course ID found in this route.')
    }
  }
  // Use the names for the input `course`.
}
