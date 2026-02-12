import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss']
})
export class SearchComponent {
  @Input() placeholder: string = 'Input text';
  @Output() search = new EventEmitter<string>();

  query: string = '';

  onSearch() {
    this.search.emit(this.query.trim());
  }
}
