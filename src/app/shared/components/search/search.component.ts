import { Component, EventEmitter, Input, Output } from "@angular/core";
import { CoursesService } from "@app/services/courses.service";

@Component({
  selector: "app-search",
  templateUrl: "./search.component.html",
  styleUrls: ["./search.component.scss"],
})
export class SearchComponent {
  @Input() placeholder: string = "Search..."; // Default placeholder text
  @Output() search: EventEmitter<any> = new EventEmitter<any>(); // Emit search value

  searchTerm: string = ""; // Hold the input value

  onSearch(): any {
    this.search.emit(this.searchTerm); // Emit the search term
  }
}
