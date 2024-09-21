import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss']
})
export class SearchComponent {
  @Input() placeholder?: string = 'Input String';
  @Output() search = new EventEmitter<string>();
  
  searchTerm: string = '';

  onSearch() {
    this.search.emit(this.searchTerm);
  }
}