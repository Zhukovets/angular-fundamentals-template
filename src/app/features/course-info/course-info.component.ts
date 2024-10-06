import { DatePipe } from '@angular/common';
import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Course } from '@app/models/course.model';
import { CoursesStoreService } from '@app/services/courses-store.service';

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
    private coursesStoreService: CoursesStoreService,
    private router: Router
  ){}

  ngOnInit(): void {
    let courseId = this.route.snapshot.paramMap.get('id');
    if(courseId){
      this.coursesStoreService.getCourse(courseId);
      this.coursesStoreService.course$.subscribe((course) => {
        this.displayedCourse = course;
      });
    }
  }

  navigateBack(){
    this.router.navigate(['/courses']);
  }
}
