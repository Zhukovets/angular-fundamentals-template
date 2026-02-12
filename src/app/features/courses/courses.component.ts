import { Component, OnInit, Optional } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Course, CoursesService } from '../../services/courses.service';
import { UserStoreService } from '../../user/services/user-store.service';

@Component({
  selector: 'app-courses',
  templateUrl: './courses.component.html',
  styleUrls: ['./courses.component.css']
})
export class CoursesComponent implements OnInit {
  courses: Course[] = [];
  filteredCourses: Course[] = [];
  editable = false;
  selectedCourse?: Course;

  authorMap: Record<string, string> = {};

  constructor(
    @Optional() private route: ActivatedRoute,
    private router: Router,
    private coursesService: CoursesService,
    private userStore: UserStoreService,
  ) {
    this.userStore.isAdmin$.subscribe(isAdmin => this.editable = isAdmin);
  }

  ngOnInit(): void {

    this.loadCourses();

    this.coursesService.getAllAuthors().subscribe(authors => {
      this.authorMap = Object.fromEntries(authors.map(a => [a.id, a.name]));
    });
  }

  private loadCourses(searchText?: string) {
    const obs = searchText
      ? this.coursesService.filterCourses(searchText)
      : this.coursesService.getAll();

    obs.subscribe(courses => {
      this.courses = courses;
      this.filteredCourses = courses;
    });
  }

  onSearch(query: string) {
    this.loadCourses(query);
  }

  onShowCourse(id: string) {
    this.coursesService.getCourse(id).subscribe(course => {
      this.selectedCourse = course;
    });
  }

  onEditCourse(id: string) { this.router.navigate(['/courses', 'edit', id]); }
  onDeleteCourse(id: string) {
    this.coursesService.deleteCourse(id).subscribe(() => {
      this.loadCourses();
      if (this.selectedCourse?.id === id) {
        this.selectedCourse = undefined;
      }
    });
  }

  onAddCourse() {
    this.router.navigate(['/courses/add']);
  }

  onCancel(): void {
    this.router.navigate(['/courses']);
  }

  onBack() {
    this.selectedCourse = undefined;
  }

}
