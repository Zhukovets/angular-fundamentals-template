import { Component, EventEmitter, Input, Output } from "@angular/core";

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
  @Input() id: number = 0;
  @Input() authors: string[] = [];
  @Input() date?: Date = new Date("2012-03-20");

  @Output() showCourse = new EventEmitter<any>();
  @Output() editCourse = new EventEmitter<any>();
  @Output() deleteCourse = new EventEmitter<any>();

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
