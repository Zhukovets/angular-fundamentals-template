import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Course } from '@app/models/course.model';
import { CoursesFacade } from '@app/store/courses/courses.facade';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-courses',
  templateUrl: './courses.component.html',
  styleUrls: ['./courses.component.scss']
})
export class CoursesComponent implements OnInit {
  allCourses$: Observable<Course[]> = this.coursesFacade.allCourses$;
  isEditable: boolean = true;

  constructor(
    private router: Router,
    private coursesFacade: CoursesFacade
  ){}

  ngOnInit(): void {
    this.loadCourses();
  }

  loadCourses(): void {
    this.coursesFacade.getAllCourses();
  }

  navigateToCoursesAdd(){
    this.router.navigate(["/courses/add"]);
  }

  showCourse(course: Course){
    this.router.navigate(["/courses/", course.id]);
  }

  editCourse(course: Course){
    this.router.navigate(["/courses/edit/", course.id]);
  }

  deleteCourse(course: Course){
    this.coursesFacade.deleteCourse(course.id!);
  }

  filterSearch(searchTerm: string): void {
    if (!searchTerm) {
      this.coursesFacade.getAllCourses();
    } else {
      this.coursesFacade.getFilteredCourses(searchTerm);
    }
  }
  
}
