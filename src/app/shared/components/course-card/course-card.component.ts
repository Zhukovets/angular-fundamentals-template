import { Component, EventEmitter, Input, Output } from "@angular/core";
import {
  faCoffee,
  faTrashCan,
  faPencil,
} from "@fortawesome/free-solid-svg-icons";

@Component({
  selector: "app-course-card",
  templateUrl: "./course-card.component.html",
  styleUrls: ["./course-card.component.scss"],
})
export class CourseCardComponent {
  @Output() clickOnShow: EventEmitter<number> = new EventEmitter<number>();
  @Output() clickOnEdit: EventEmitter<number> = new EventEmitter<number>();
  @Output() clickOnDelete: EventEmitter<number> = new EventEmitter<number>();

  faCoffee = faCoffee;
  faTrashCan = faTrashCan;
  faPencil = faPencil;

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

  deleteCourse() {
    this.clickOnDelete.emit(this.id);
  }
  editCourse() {
    this.clickOnEdit.emit(this.id);
  }
}
