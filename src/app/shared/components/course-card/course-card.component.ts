import { Component, EventEmitter, Input, Output } from "@angular/core";

@Component({
  selector: "app-course-card",
  templateUrl: "./course-card.component.html",
  styleUrls: ["./course-card.component.scss"],
})
export class CourseCardComponent {
  @Output() clickOnShow: EventEmitter<number> = new EventEmitter<number>();

  @Input() title: string = "";
  @Input() description: string = "";
  @Input() creationDate?: Date = new Date("2012-03-20");
  @Input() duration: number = 0;
  @Input() authors: string[] = [];
  @Input() isEditable: boolean = true;
  @Input() id: number = 0;

  showCourse() {
    this.clickOnShow.emit(this.id);
  }
}
