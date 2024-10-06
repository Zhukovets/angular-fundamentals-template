import { Component, EventEmitter, Input, Output } from "@angular/core";
import { CoursesStateFacade } from "@app/store/courses/courses.facade";

@Component({
  selector: "app-search",
  templateUrl: "./search.component.html",
  styleUrls: ["./search.component.scss"],
})
export class SearchComponent {
  @Input() placeholder: string = "Input text";

  constructor(private coursesFacade: CoursesStateFacade) {}

  searchValue: string = "";

  click(): void {
    if (this.searchValue.trim()) {
      this.coursesFacade.getFilteredCourses(this.searchValue.trim());
      this.searchValue = "";
    }
  }
}
