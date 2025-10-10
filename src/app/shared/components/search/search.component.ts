import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss']
})
export class SearchComponent {
  @Input() placeholder: string = 'Input text'; 
  
  public searchText: string = '';

  @Output() search: EventEmitter<string> = new EventEmitter<string>();

  onSearch(): void {
    this.search.emit(this.searchText);
  }
}