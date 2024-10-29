import { Component, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss']
})
export class SearchComponent {
  // Use the name `placeholder` for the @Input.
  @Input() placeholder: string = 'Search...';
  // Use the name `search` for the @Output.
  @Output() searchQuery = new EventEmitter<string>();

  searchText: string = '';

  onSearch() {
    this.searchQuery.emit(this.searchText);
  }
}
