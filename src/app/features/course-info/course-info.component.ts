import { Component, Input } from "@angular/core";
import { Router } from "@angular/router";

@Component({
  selector: "app-course-info",
  templateUrl: "./course-info.component.html",
  styleUrls: ["./course-info.component.scss"],
})
export class CourseInfoComponent {
  @Input() title: string = "";
  @Input() id: string = "";
  @Input() description: string = "";
  @Input() creationDate: Date | string = "";
  @Input() duration: number = 0;
  @Input() authors: string[] = [];

  @Input() editable: boolean = false;

  constructor(private router: Router) {}

  // @Output() clickOnShow = new EventEmitter<void>();
  // @Output() clickOnEdit = new EventEmitter<void>();
  // @Output() clickOnDelete = new EventEmitter<void>();

  // onShowClick(): void {
  //   this.clickOnShow.emit();
  // }

  onEditClick(): void {
    console.log("CourseInfo: Edit clicked for ID:", this.id);
    this.router.navigate(["/courses/edit", this.id]);
  }

  onDeleteClick(): void {
    console.log("CourseInfo: Delete clicked for ID:", this.id);
  }
}
