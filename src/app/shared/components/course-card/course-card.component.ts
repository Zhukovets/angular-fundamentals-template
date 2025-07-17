import { Component, Input, Output, EventEmitter, OnInit } from "@angular/core";
import { DurationPipe } from "../../pipes/duration.pipe";
import { Course } from "../../../types/courseTypes";

@Component({
  selector: "app-course-card",
  templateUrl: "./course-card.component.html",
  styleUrls: ["./course-card.component.scss"],
})
export class CourseCardComponent implements OnInit {
  @Input() course!: Course;
  @Input() editable = true;

  @Output() clickOnShow = new EventEmitter<string>();
  @Output() clickOnEdit = new EventEmitter<string>();
  @Output() clickOnDelete = new EventEmitter<string>();

  onShowCourse(): void {
    this.clickOnShow.emit(String(this.course.id));
  }

  onEditCourse(): void {
    this.clickOnEdit.emit(String(this.course.id));
  }

  onDeleteCourse(): void {
    this.clickOnDelete.emit(String(this.course.id));
  }

  ngOnInit() {
    console.log("CourseCard editable:", this.editable, "course:", this.course);
  }
}
