import { DatePipe } from '@angular/common';
import { Component,  OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Course } from '@app/models/course.model';
import { CoursesFacade } from '@app/store/courses/courses.facade';

@Component({
  selector: 'app-course-info',
  templateUrl: './course-info.component.html',
  styleUrls: ['./course-info.component.scss'],
  providers: [DatePipe]

})
export class CourseInfoComponent implements OnInit {
  displayedCourse: Course | null = null;

  constructor(
    private route:ActivatedRoute,
    private coursesFacade: CoursesFacade,
    private router: Router
  ){}

  ngOnInit(): void {
    let courseId = this.route.snapshot.paramMap.get('id');
    if(courseId){
      this.coursesFacade.getSingleCourse(courseId);
      this.coursesFacade.course$.subscribe((course) => {
        this.displayedCourse = course;
      });
    }
  }

  navigateBack(){
    this.router.navigate(['/courses']);
  }
}
