import { Component, EventEmitter, Input, Output } from "@angular/core";

@Component({
  selector: "app-search",
  templateUrl: "./search.component.html",
  styleUrls: ["./search.component.scss"],
})
export class SearchComponent {
  @Input() placeholder = "";
  @Output() search = new EventEmitter();

  protected searchedTerm: string = "";

  searched() {
    this.search.emit(this.searchedTerm);
  }
}
