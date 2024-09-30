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
  @Input() placeholder: string = 'Enter your search query';
  @Output() search = new EventEmitter<string>();
  searchTerm: string = '';
  buttonTexts = ButtonText;

  onSubmitForm(e: any) {
    this.onSearch();
  }

  onSearch() {
    this.search.emit(this.searchTerm);
  }
}

