import { Component, Input } from '@angular/core';
import { FaIconLibrary } from '@fortawesome/angular-fontawesome';
import { IconName, fas } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-button',
  templateUrl: './button.component.html',
  styleUrls: ['./button.component.scss'],
})
export class ButtonComponent {
  constructor(library: FaIconLibrary) {
    // Add the solid icons to the library
    library.addIconPacks(fas);
  }

  @Input() buttonText?: string;

  @Input() iconName?: IconName;
}
