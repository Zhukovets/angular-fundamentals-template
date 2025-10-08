import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FaIconLibrary } from '@fortawesome/angular-fontawesome';
import { fas } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.scss']
})
export class ModalComponent {
  constructor(library: FaIconLibrary) {
    library.addIconPacks(fas);
  }

  @Input() title?: string;
  @Input() message?: string;
  @Input() okButtonText?: string;
  @Input() cancelButtonText?: string;

  @Output() ok = new EventEmitter<void>();
  @Output() cancel = new EventEmitter<void>();

  onOk() { this.ok.emit(); }
  onCancel() { this.cancel.emit(); }
}
