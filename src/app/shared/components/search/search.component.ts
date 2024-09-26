import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss'],
})
export class SearchComponent {
  // Use the name `placeholder` for the @Input.
  @Input() placeholder!: string;
  // Use the name `search` for the @Output.
  @Output() search = new EventEmitter();

  onSearch() {
    this.search.emit();
  }
}
