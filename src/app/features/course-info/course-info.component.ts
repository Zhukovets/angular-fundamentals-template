import { Component, EventEmitter, Input, Output } from "@angular/core";
import { mockedAuthorsList, mockedCoursesList } from "@app/shared/mocks/mock";

@Component({
  selector: "app-course-info",
  templateUrl: "./course-info.component.html",
  styleUrls: ["./course-info.component.scss"],
})
export class CourseInfoComponent {
  @Input() id: string = "";
  @Input() title: string = "";
  @Input() description: string = "";
  @Input() authors: string[] = [];
  @Input() duration: number | string = 0;
  @Input() set setCreationDate(value: string) {
    this.creationDate = new Date(value).toLocaleString();
  }
  ngOnInit() {
    this.authors = this.getAuthorsByIds(this.authors);
  }

  @Input() isEditable: boolean = false;
  @Input() creationDate: string = "";
  @Output() clickOnShow = new EventEmitter<void>();

  onShowCourse(): void {
    this.clickOnShow.emit();
  }

  getAuthorsByIds(authorIds: string[]): string[] {
    return mockedAuthorsList
      .filter((author) => authorIds.includes(author.id))
      .map((author) => author.name);
  }
}
