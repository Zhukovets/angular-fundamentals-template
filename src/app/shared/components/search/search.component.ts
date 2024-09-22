import {Component, EventEmitter, Input, Output,} from '@angular/core';
import {ButtonText} from "@app/models/const";

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss']
})
export class SearchComponent {
  // Use the name `placeholder` for the @Input.
  // Use the name `search` for the @Output.
  @Input() placeholder: string = '';
  @Output() search = new EventEmitter<string>();
  searchTerm: string = '';
  buttonTexts = ButtonText;

  onItemSearch(data: string) {
   this.search.emit(this.searchTerm);
  }

  onSearchSubmit() {

  }
}

