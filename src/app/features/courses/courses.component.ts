import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ApiResponse, Course } from '@app/models/course.model';
import { CoursesStoreService } from '@app/services/courses-store.service';
import { CoursesService } from '@app/services/courses.service';
import { UserStoreService } from '@app/user/services/user-store.service';

@Component({
  selector: 'app-courses',
  templateUrl: './courses.component.html',
  styleUrls: ['./courses.component.scss']
})
export class CoursesComponent implements OnInit {
  allCourses: Course[] = [];
  isEditable: boolean = true;

  constructor(
    private coursesService: CoursesService,
    private coursesStoreService: CoursesStoreService,
    private router: Router,
    private userStorageService: UserStoreService
  ){
    this.userStorageService.getUser();
    this.isEditable = this.userStorageService.isAdmin;
  }

  ngOnInit(): void {
    this.loadCourses();
    this.coursesStoreService.getAllAuthors();

    this.userStorageService.isAdmin$.subscribe((isAdmin) => {
      this.isEditable = isAdmin;
    });
  }

  loadCourses(): void {
    this.coursesService.getAll().subscribe(
      (response: ApiResponse<Course[]>) => {
        if (response.successful) {
          this.allCourses = response.result;
        } else {
          console.error('Failed to fetch courses', response);
        }
      },
      (error) => {
        console.error('Error fetching courses', error);
      }
    );
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
    this.coursesService.deleteCourse(course.id!).subscribe({
      next: (response) => {
        if(response.successful) {
          this.allCourses = this.allCourses.filter(c => c.id !== course.id);
        }
      },
      error: (error) => {
        console.error('Error deleting course:', error);
      }
    });
  }

  filterSearch(searchTerm: string): void {
    if (!searchTerm) {
      this.coursesService.getAll().subscribe({
          next: (response) => {
              if (response.successful && response.result) {
                  this.allCourses = response.result;
              } else {
                  console.error('Failed to fetch all courses:', response);
              }
          },
          error: (error) => {
              console.error('Error fetching all courses:', error);
          }
      });
  } else {
      this.coursesStoreService.filterCourses(searchTerm).subscribe({
          next: (response) => {
              if (response.successful) {
                  this.allCourses = response.result;
              } else {
                  console.error('Filtering courses failed:', response);
              }
          },
          error: (error) => {
              console.error('Error during filter search:', error);
          }
      });
  }
}
  
}
