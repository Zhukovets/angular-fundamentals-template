// import { Component, EventEmitter, Input, Output } from "@angular/core";
// import { ActivatedRoute } from "@angular/router";
// import { CoursesService } from "@app/services/courses.service";
// import { Course } from "@app/shared/models/course.model";

// @Component({
//   selector: "app-course-info",
//   templateUrl: "./course-info.component.html",
//   styleUrls: ["./course-info.component.scss"],
// })
// export class CourseInfoComponent {
//   course: any | null = null;
//   editable: boolean = true;
//   id: string = "";

//   @Output() showCourse = new EventEmitter<any>();
//   @Output() editCourse = new EventEmitter<any>();
//   @Output() deleteCourse = new EventEmitter<any>();

//   constructor(
//     private route: ActivatedRoute,
//     private coursesService: CoursesService
//   ) {}

//   ngOnInit(): void {
//     // Accessing the 'id' from the route parameters
//     this.route.paramMap.subscribe((params) => {
//       const routeId = params.get("id");
//       if (routeId) {
//         this.id = routeId;
//         this.loadCourse(this.id);
//       }
//     });
//   }

//   loadCourse(id: string): void {
//     this.coursesService.getCourse(id).subscribe({
//       next: (course: any) => {
//         console.log(course);
//         this.course = course.result; // Store the course data
//       },
//       error: (err) => {
//         console.error("Failed to load course", err); // Error handling
//       },
//     });
//   }

//   onShowCourse() {
//     if (this.course) {
//       this.showCourse.emit(this.course);
//     }
//   }

//   onEditCourse() {
//     if (this.course) {
//       this.editCourse.emit(this.course);
//     }
//   }

//   onDeleteCourse() {
//     if (this.course) {
//       this.deleteCourse.emit(this.course);
//     }
//   }
// }

import { Component, EventEmitter, Output } from "@angular/core";
import { ActivatedRoute } from "@angular/router";
import { map, Observable } from "rxjs";
import { CoursesFacade } from "@app/store/courses/courses.facade";
import { Course } from "@app/shared/models/course.model";

@Component({
  selector: "app-course-info",
  templateUrl: "./course-info.component.html",
  styleUrls: ["./course-info.component.scss"],
})
export class CourseInfoComponent {
  course$: Observable<any | null>; // Observable for course data
  editable: boolean = true;
  id: string = "";

  @Output() showCourse = new EventEmitter<Course>();
  @Output() editCourse = new EventEmitter<Course>();
  @Output() deleteCourse = new EventEmitter<Course>();

  constructor(
    private route: ActivatedRoute,
    private coursesFacade: CoursesFacade // Use the facade instead of service
  ) {
    // Subscribe to the facade's course observable
    this.course$ = this.coursesFacade.course$.pipe(
      map((course: any) => course?.result || null) // Wyciągamy `result` z obiektu `course`
    );
  }

  ngOnInit(): void {
    // Accessing the 'id' from the route parameters and triggering facade method to load the course
    this.route.paramMap.subscribe((params) => {
      const routeId = params.get("id");
      if (routeId) {
        this.id = routeId;
        this.loadCourse(this.id);
      }
    });
  }

  loadCourse(id: string): void {
    // Dispatch an action through the facade to load the specific course
    this.coursesFacade.getSingleCourse(id);
  }

  onShowCourse(): void {
    // Emit course data from facade when the user clicks show
    this.course$.subscribe((course) => {
      if (course) {
        this.showCourse.emit(course);
      }
    });
  }

  onEditCourse(): void {
    // Emit course data from facade when the user clicks edit
    this.course$.subscribe((course) => {
      if (course) {
        this.editCourse.emit(course);
      }
    });
  }

  onDeleteCourse(): void {
    // Emit course data from facade when the user clicks delete
    this.course$.subscribe((course) => {
      if (course) {
        this.deleteCourse.emit(course);
      }
    });
  }
}
