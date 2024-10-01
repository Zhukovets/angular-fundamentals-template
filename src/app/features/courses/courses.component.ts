import { Component, OnInit } from '@angular/core';
import { Author } from '@app/models/author.model';
import { ApiResponse, Course } from '@app/models/course.model';
import { CoursesService } from '@app/services/courses.service';

@Component({
  selector: 'app-courses',
  templateUrl: './courses.component.html',
  styleUrls: ['./courses.component.scss']
})
export class CoursesComponent implements OnInit {
  allCourses: Course[] = [];
  allAuthors: Author[] = [];

  constructor(private coursesService: CoursesService){}

  ngOnInit(): void {
    this.loadCourses();
    this.loadAuthors();
  }

  loadCourses(): void {
    this.coursesService.getAll().subscribe(
      (response: ApiResponse<Course[]>) => {
        if (response.successful) {
          response.result.forEach(course => {
            this.allCourses.push(course);
          });
        } else {
          console.error('Failed to fetch courses', response);
        }
      },
      (error) => {
        console.error('Error fetching courses', error);
      }
    );
  }

  loadAuthors(): void {
    this.coursesService.getAllAuthors().subscribe(
      (response: ApiResponse<Author[]>) => {
        if (response.successful) {
          response.result.forEach(author => {
            this.allCourses.forEach(course => {
              course.authors.forEach(courseAuthor => {
                if(courseAuthor === author.id){
                  courseAuthor = author.name;
                }
              });
            });
            this.allAuthors.push(author);
          })
        } else {
          console.error('Failed to fetch authors', response);
        }
      },
      (error) => {
        console.error('Error fetching authors', error);
      }  
    );
  }
  
}
