import {Component, Input, OnInit} from '@angular/core';
import { FaIconLibrary } from '@fortawesome/angular-fontawesome';
import { fas } from '@fortawesome/free-solid-svg-icons';
import { IconName } from '@fortawesome/fontawesome-svg-core';
import {ButtonIcon} from "@app/models/const";

@Component({
  selector: 'app-button',
  templateUrl: './button.component.html',
  styleUrls: ['./button.component.scss']
})
export class ButtonComponent implements OnInit {
  @Input() buttonText = '';
  @Input() iconName: IconName | null = null;

  constructor(library: FaIconLibrary) {
    library.addIconPacks(fas);
  }

  public ngOnInit(): void {
    console.log(this.buttonText)
  }

  // Use the names for the inputs `buttonText` and `iconName`.

  protected readonly buttonIcon = ButtonIcon;
}

