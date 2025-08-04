import { Injectable } from "@angular/core";
import { Author } from "@app/types/authorTypes";
import { Course } from "@app/types/courseTypes";
import { BehaviorSubject, finalize, map, Observable } from "rxjs";
import { CoursesService } from "./courses.service";

@Injectable({
  providedIn: "root",
})
export class CoursesStoreService {
  private isLoading$$ = new BehaviorSubject<boolean>(false);
  private courses$$ = new BehaviorSubject<Course[]>([]);
  private authors$$ = new BehaviorSubject<Author[]>([]);

  public isLoading$ = this.isLoading$$.asObservable();
  public courses$ = this.courses$$.asObservable();
  public authors$ = this.authors$$.asObservable();

  constructor(private coursesService: CoursesService) {}

  getAll() {
    // Add your code here
    this.isLoading$$.next(true);
    this.coursesService
      .getAll()
      .pipe(finalize(() => this.isLoading$$.next(false)))
      .subscribe({
        next: (response) => this.courses$$.next(response.result),
        error: () => this.courses$$.next([]),
      });
  }

  createCourse(course: Course): void {
    // replace 'any' with the required interface
    // Add your code here
    this.isLoading$$.next(true);
    this.coursesService
      .createCourse(course)
      .pipe(finalize(() => this.isLoading$$.next(false)))
      .subscribe(() => this.getAll());
  }

  getCourse(id: string): Observable<Course> {
    // Add your code here
    return this.coursesService.getCourse(id).pipe(map((res) => res.result));
  }

  editCourse(id: string, course: Course): void {
    // Add your code here
    this.isLoading$$.next(true);
    this.coursesService
      .editCourse(id, course)
      ?.pipe(finalize(() => this.isLoading$$.next(false)))
      .subscribe(() => this.getAll());
  }

  deleteCourse(id: string): void {
    // Add your code here
    this.isLoading$$.next(true);
    this.coursesService
      .deleteCourse(id)
      ?.pipe(finalize(() => this.isLoading$$.next(false)))
      .subscribe(() => this.getAll());
  }

  filterCourses(value: string): void {
    // Add your code here
    if (value.trim() === "") {
      this.getAll();
      return;
    }
    this.isLoading$$.next(true);
    this.coursesService
      .getAll()
      .pipe(finalize(() => this.isLoading$$.next(false)))
      .subscribe({
        next: (response) => {
          const search = value.trim().toLowerCase();
          const filtered = response.result.filter((course) =>
            course.title.toLowerCase().includes(search)
          );
          this.courses$$.next(filtered);
        },
        error: () => this.courses$$.next([]),
      });
  }

  getAllAuthors(): void {
    // Add your code here
    this.isLoading$$.next(true);
    this.coursesService
      .getAllAuthors()
      .pipe(
        map((res) => res.result),
        finalize(() => this.isLoading$$.next(false))
      )
      .subscribe({
        next: (authors) => this.authors$$.next(authors),
        error: () => this.authors$$.next([]),
      });
  }

  createAuthor(name: string): void {
    // Add your code here
    this.isLoading$$.next(true);
    this.coursesService
      .createAuthor(name)
      .pipe(finalize(() => this.isLoading$$.next(false)))
      .subscribe(() => {
        this.getAllAuthors();
      });
  }

  getAuthorById(id: string): Observable<Author> {
    // Add your code here
    this.isLoading$$.next(true);
    return this.coursesService.getAuthorById(id).pipe(
      finalize(() => this.isLoading$$.next(false)),
      map((res) => res.result)
    );
  }
}
