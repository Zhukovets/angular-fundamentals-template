import { Component, EventEmitter, Input, Output } from "@angular/core";
import { mockedAuthorsList } from "@app/shared/mocks/mock";

@Component({
  selector: "app-course-card",
  templateUrl: "./course-card.component.html",
  styleUrls: ["./course-card.component.scss"],
})
export class CourseCardComponent {
  @Input() title: string = "";
  @Input() description: string = "";
  @Input() authors: string[] = [];
  @Input() duration: number | string = 0;
  @Input() set setCreationDate(value: string) {
    this.creationDate = new Date(value).toLocaleString();
  }
  ngOnInit() {
    this.authors = this.getAuthorsByIds(this.authors);
    this.duration = this.formatDuration(this.duration);
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

  formatDuration(duration: number | string) {
    if (typeof duration === "number") {
      const hours = Math.floor(duration / 60);
      const minutes = duration % 60;
      return `${hours}:${minutes} hours`;
    }
    return "";
  }
}
