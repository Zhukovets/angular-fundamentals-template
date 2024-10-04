import { Component, EventEmitter, Input, Output } from "@angular/core";
import { ActivatedRoute } from "@angular/router";
import { CoursesService } from "@app/services/courses.service";

@Component({
  selector: "app-course-info",
  templateUrl: "./course-info.component.html",
  styleUrls: ["./course-info.component.scss"],
})
export class CourseInfoComponent {
  @Input() courses: any[] = [];
  @Input() editable: boolean = true;
  @Input() title: string = "";
  @Input() description: string = "";
  @Input() creationDate?: Date = new Date("2012-03-20");
  @Input() duration: number = 0;
  @Input() id: string = "";
  @Input() authors: string[] = [];
  @Input() date?: Date = new Date("2012-03-20");

  @Output() showCourse = new EventEmitter<any>();
  @Output() editCourse = new EventEmitter<any>();
  @Output() deleteCourse = new EventEmitter<any>();

  constructor(
    private route: ActivatedRoute,
    private coursesService: CoursesService
  ) {}

  ngOnInit(): void {
    // Accessing the 'id' from the route parameters
    this.route.paramMap.subscribe((params) => {
      const routeId = params.get("id");
      if (routeId) {
        this.id = routeId; // Convert to number if needed
        console.log("Route ID:", this.id);
      }
    });
  }

  onShowCourse(course: any) {
    this.showCourse.emit(course);
  }

  onEditCourse(course: any) {
    this.editCourse.emit(course);
  }

  onDeleteCourse(course: any) {
    this.deleteCourse.emit(course);
  }
}
