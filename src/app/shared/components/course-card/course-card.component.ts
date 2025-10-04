import { Component, Input, Output, EventEmitter } from "@angular/core";

@Component({
  selector: "app-course-card",
  templateUrl: "./course-card.component.html",
  styleUrls: ["./course-card.component.scss"],
})
export class CourseCardComponent {
  @Input() title!: string;
  @Input() description!: string;
  @Input() creationDate!: Date;
  @Input() duration!: number;
  @Input() authors: string[] = [];
  @Input() editable: boolean = false;

  @Output() clickOnShow = new EventEmitter<void>();

  onShowCourse() {
    this.clickOnShow.emit();
  }
}
