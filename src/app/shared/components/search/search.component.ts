import { Component, EventEmitter, Input, Output } from "@angular/core";
import { FormControl } from "@angular/forms";

@Component({
  selector: "app-search",
  templateUrl: "./search.component.html",
  styleUrls: ["./search.component.scss"],
})
export class SearchComponent {
  @Input() placeholder: string = "";
  @Output() search = new EventEmitter<string>();

  searchControl = new FormControl("");

  onSearch(): void {
    const trimmed = (this.searchControl.value || "").trim();
    if (trimmed.length >= 2 || trimmed.length === 0) {
      this.search.emit(trimmed);
    }
  }
}
