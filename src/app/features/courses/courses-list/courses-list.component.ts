import { Component, Input, Output, EventEmitter, OnInit } from '@angular/core';
import { CoursesService } from '@app/services/courses.service';
import { UserStoreService } from '@app/user/services/user-store.service';
import { Router } from '@angular/router';
import { CoursesStateFacade } from '@app/store/courses/courses.facade';


@Component({
  selector: 'app-courses-list',
  templateUrl: './courses-list.component.html',
  styleUrls: ['./courses-list.component.css']
})
export class CoursesListComponent implements OnInit{

  courses: any[] = []
  authors: any[] = []

  @Input() editable: boolean = false;
  /* 
  unused code from previous exercise:
  @Output() showCourse = new EventEmitter<any>();
  @Output() editCourse = new EventEmitter<any>();
  @Output() deleteCourse = new EventEmitter<any>();
 */
  constructor( private coursesFacade: CoursesStateFacade, private coursesService: CoursesService, private userStoreService: UserStoreService, private router: Router) {}
  

  ngOnInit(): void {
    this.userStoreService.getUser();
    this.userStoreService.isAdmin$.subscribe((isAdmin) => {
      this.editable = isAdmin;
    });

    this.coursesFacade.allCourses$.subscribe(
      courses => {
        this.courses = courses;
      });

      this.coursesFacade.getAllCourses();
  }

  /* 
  unused code from previous exercise: author name display
  
  fetchAuthorsAndMap(): void {
    this.coursesService.getAllAuthors().subscribe(
      authorResponse => {
        this.authors = authorResponse.result;
        this.mapAuthorsToCourses();
      },
      error => {
        console.log('Error fetching authors:', error);
      }
    );
  }

  mapAuthorsToCourses(): void {
    this.courses.forEach(course => {
      course.authors = course.authors.map((authorId: any) => {
        const author = this.authors.find(a => a.id === authorId);
        return author ? author.name : 'Unknown Author';
      });
    });
  } */

  onSearch(value: string): void {
    this.coursesFacade.getFilteredCourses(value);
  }

  navigateToCourse(courseId: any): void {
    this.router.navigate([`courses/${courseId}`]);
  }
}