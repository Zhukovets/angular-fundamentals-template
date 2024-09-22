import { Component, Input, Output, EventEmitter  } from '@angular/core';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss']
})
export class SearchComponent {
  @Input() placeholder!: string;
  @Output() search = new EventEmitter <string>();

  sendSearch(): void {
    if(this.placeholder) {
      this.search.emit(this.placeholder)
      console.log(this.placeholder)
    } else {
      console.log('Need to add value for search')
    }
  }

  
  // Use the name `placeholder` for the @Input.
  // Use the name `search` for the @Output.
}

