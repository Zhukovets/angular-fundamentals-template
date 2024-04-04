import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CoursesStoreService } from '@app/services/courses-store.service';
import { Author } from '@app/shared/models/author';
import { Course } from '@app/shared/models/course';
import { forkJoin, tap } from 'rxjs';

@Component({
  selector: 'app-course-info',
  templateUrl: './course-info.component.html',
  styleUrls: ['./course-info.component.scss']
})
export class CourseInfoComponent implements OnInit {
  // Use the names for the input `course`
  public course: Course = {} as Course;

  constructor (private route: ActivatedRoute, private courseStore: CoursesStoreService) {}

  ngOnInit(): void {
    const courseId = this.route.snapshot.paramMap.get('id') || '';
    this.courseStore.getCourse(courseId).pipe(tap((course: Course) => {
      const authors$ = forkJoin(
        course.authors.splice(0).map(x => this.courseStore.getAuthorById(x))
      )
      authors$.subscribe((authors: Author[]) => {
        this.course.authors = authors.map(x => x.name);
      });
    })).subscribe((course: Course) => {
      this.course = course;
    });
  }
}
