import { Component, Input, OnInit } from '@angular/core';
import { CoursesService } from '@app/services/courses.service';
import { ActivatedRoute } from '@angular/router';


@Component({
  selector: 'app-course-info',
  templateUrl: './course-info.component.html',
  styleUrls: ['./course-info.component.scss']
})
export class CourseInfoComponent implements OnInit {

  course: {
    title: string;
    description: string;
    id: string;
    creationDate: Date | string;
    duration: number;
    authors: string[];
  } = {
    title: '',
    description: '',
    id: '',
    creationDate: '',
    duration: 0,
    authors: []
  };

  constructor (private coursesService: CoursesService, private route: ActivatedRoute) {}

  ngOnInit(): void {
    const courseId = this.route.snapshot.paramMap.get('id');

    if (courseId){
      this.coursesService.getCourse(courseId).subscribe(
        response => {
          this.course = response.result
        },
        error => {
          console.error('error fetching course data:', error);
        }
      )
    } else {
      console.error('No course ID found in this route.')
    }
  }

  /* @Input() course!: {
    title: string;
    description: string;
    id: string;
    creationDate: Date;
    duration: number;
    authors: string[];
  } */
  // Use the names for the input `course`.
}
