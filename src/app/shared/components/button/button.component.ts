import { Component, EventEmitter, Input, Output } from "@angular/core";
import { FaIconLibrary } from "@fortawesome/angular-fontawesome";
import { fas, IconDefinition } from "@fortawesome/free-solid-svg-icons";
import {
  faCoffee,
  faTrashCan,
  faPencil,
} from "@fortawesome/free-solid-svg-icons";

@Component({
  selector: "app-button",
  templateUrl: "./button.component.html",
  styleUrls: ["./button.component.scss"],
})
export class ButtonComponent {
  constructor(library: FaIconLibrary) {
    library.addIconPacks(fas);
  }

  @Input() isEditable: boolean = true;
  @Input() button_text: string = "";
  @Input() icon_name: string = "";
  @Input() second_icon_name: string = "";
  @Output() buttonClick = new EventEmitter<void>();

  iconMap: { [key: string]: any } = {
    coffee: faCoffee,
    trash: faTrashCan,
    pencil: faPencil,
  };

  faCoffee = faCoffee;
  faTrashCan = faTrashCan;
  faPencil = faPencil;

  selectedIcon: any;
  secondSelectedIcon: any;

  ngOnChanges() {
    this.selectedIcon = this.iconMap[this.icon_name] || null;
    this.secondSelectedIcon = this.iconMap[this.second_icon_name] || null;
  }

  onButtonClick() {
    this.buttonClick.emit();
  }
  // Use the names for the inputs `buttonText` and `iconName`.
}
