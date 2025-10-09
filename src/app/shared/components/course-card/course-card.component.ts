import { Component, EventEmitter, Input, Output } from "@angular/core";

@Component({
  selector: "app-course-card",
  templateUrl: "./course-card.component.html",
  styleUrls: ["./course-card.component.scss"],
})
export class CourseCardComponent {
  @Input() title!: string;
  @Input() description!: string;
  @Input() creationDate!: string;
  @Input() duration!: number;
  @Input() authors: string[] = [];
  @Input() editable = false;

  @Output() clickOnShow = new EventEmitter<void>();

  onShowCourse() {
    this.clickOnShow.emit();
  }
}
