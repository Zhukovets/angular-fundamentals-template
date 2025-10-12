import { Component, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss']
})
export class SearchComponent {
  @Input() placeholder: string = '';
  @Output() search = new EventEmitter<string>();

  searchTerm: string = '';

  onSearch() {
    const term = (this.searchTerm || '').trim();
    this.search.emit(term);
  }
}
