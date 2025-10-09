import { Injectable } from "@angular/core";
import { BehaviorSubject, Observable, finalize } from "rxjs";
//import { CoursesService } from "./courses.service";
import { CoursesFacade } from "../store/courses/courses.facade";

interface Author {
  id: string;
  name: string;
}
interface Course {
  id: string;
  title: string;
  description: string;
  duration: number;
  authors: string[];
  creationDate: string;
}
interface CourseUpdateData {
  title: string;
  description: string;
  duration: number;
  authors: string[];
}

@Injectable({
  providedIn: "root",
})
export class CoursesStoreService {
  private courses$$ = new BehaviorSubject<Course[]>([]);
  private isLoading$$ = new BehaviorSubject<boolean>(false);
  private authors$$ = new BehaviorSubject<Author[]>([]);

  public courses$: Observable<any[]> = this.coursesFacade.courses$;
  public isLoading$: Observable<boolean> =
    this.coursesFacade.isAllCoursesLoading$;
  public authors$: Observable<Author[]> = this.authors$$.asObservable();

  constructor(
    //private coursesService: CoursesService
    private coursesFacade: CoursesFacade,
    private coursesService: any
  ) {}

  private setLoading(value: boolean): void {
    this.isLoading$$.next(value);
  }

  getAllCourses(): void {
    this.coursesFacade.getAllCourses();
  }

  createCourse(courseData: CourseUpdateData): void {
    this.coursesFacade.createCourse(courseData);
  }

  getCourseById(id: string): Observable<Course> {
    this.coursesFacade.getSingleCourse(+id);
    return this.coursesFacade.course$;
  }

  editCourse(id: string, courseData: CourseUpdateData): void {
    this.coursesFacade.editCourse(+id, courseData);
  }

  deleteCourse(id: string): void {
    this.coursesFacade.deleteCourse(+id);
  }

  filterCourses(textFragment: string): void {
    this.coursesFacade.getFilteredCourses(textFragment);
  }

  getAuthors(): void {
    this.isLoading$$.next(true);
    this.coursesService
      .getAuthors()
      .pipe(finalize(() => this.isLoading$$.next(false)))
      .subscribe({
        next: (authors: Author[]) => this.authors$$.next(authors),
        error: (err: any) => console.error("Error loading authors:", err),
      });
  }

  createAuthor(author: Author): void {
    this.isLoading$$.next(true);
    this.coursesService
      .createAuthor(author)
      .pipe(finalize(() => this.isLoading$$.next(false)))
      .subscribe({
        next: (newAuthor: Author) => {
          this.authors$$.next([...this.authors$$.value, newAuthor]);
        },
        error: (err: any) => console.error("Error creating author:", err),
      });
  }

  getAuthorById(id: string): Observable<Author> {
    return this.coursesService.getAuthorById(id);
  }
}
