import { Component, EventEmitter, Input, Output } from "@angular/core";

@Component({
  selector: "app-search",
  templateUrl: "./search.component.html",
  styleUrls: ["./search.component.scss"],
})
export class SearchComponent {
  @Input() placeholder: string = "Search..."; // Default placeholder text
  @Output() search: EventEmitter<string> = new EventEmitter<string>(); // Emit search value

  searchTerm: string = ""; // Hold the input value

  onSearch(): void {
    this.search.emit(this.searchTerm); // Emit the search term
  }
}
