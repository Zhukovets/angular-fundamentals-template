import { Component, Input, Output, EventEmitter, ChangeDetectorRef, OnInit } from '@angular/core';
import { FaIconLibrary } from '@fortawesome/angular-fontawesome';
import { fas } from '@fortawesome/free-solid-svg-icons';
import { IconProp } from '@fortawesome/fontawesome-svg-core';

@Component({
  selector: 'app-button',
  templateUrl: './button.component.html',
  styleUrls: ['./button.component.scss']
})
export class ButtonComponent implements OnInit {
  constructor(library: FaIconLibrary, private cdr: ChangeDetectorRef) {
    library.addIconPacks(fas);
  }

  @Input() buttonText?: string;
  @Input() iconName?: IconProp;
  @Output() buttonClick = new EventEmitter<void>();

  ngOnChanges() {
    this.cdr.detectChanges();
  }

  ngOnInit(): void {
    this.cdr.detectChanges();
  }

  onClick(): void {
    this.buttonClick.emit();
  }
}
