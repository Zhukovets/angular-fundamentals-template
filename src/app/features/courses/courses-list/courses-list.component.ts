import { Component, Input, Output, EventEmitter, OnInit } from '@angular/core';
import { UserService } from '@app/user/services/user.service';
import { CoursesService } from '@app/services/courses.service';
import { UserStoreService } from '@app/user/services/user-store.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-courses-list',
  templateUrl: './courses-list.component.html',
  styleUrls: ['./courses-list.component.css']
})
export class CoursesListComponent implements OnInit{

  courses: any[] = []
  authors: any[] = []

  constructor( private userService: UserService, private coursesService: CoursesService, private userStoreService: UserStoreService, private router: Router) {}
  @Input() editable: boolean = false;

  @Output() showCourse = new EventEmitter<any>();
  @Output() editCourse = new EventEmitter<any>();
  @Output() deleteCourse = new EventEmitter<any>();

  ngOnInit(): void {
    this.userStoreService.getUser();
    this.userStoreService.isAdmin$.subscribe((isAdmin) => {
      this.editable = isAdmin;
    });

    this.coursesService.getAll().subscribe(
      response => {
        this.courses = response.result;
        this.fetchAuthorsAndMap();
      },
      error => {
        console.log('Error fetching courses data:', error);
      }
    );
  }

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
  }

  onSearch(value: string): void {
    this.coursesService.filterCourses(value).subscribe(
      (response) => {
        this.courses = response.result;
        this.fetchAuthorsAndMap();
      },
      (error) => {
        console.error('Error filtering courses:', error);
      }
    );
  }

  navigateToCourse(courseId: any): void {
    this.router.navigate([`courses/${courseId}`]);
  }
}