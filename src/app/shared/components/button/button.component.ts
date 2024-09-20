import { Component, Input } from "@angular/core";
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

  @Input() button_text: string = "Login";
  @Input() icon_name: string = "";

  iconMap: { [key: string]: any } = {
    coffee: faCoffee,
    trash: faTrashCan,
    pencil: faPencil,
  };

  faCoffee = faCoffee;
  faTrashCan = faTrashCan;
  faPencil = faPencil;

  selectedIcon: any;

  ngOnChanges() {
    this.selectedIcon = this.iconMap[this.icon_name] || null;
  }
  // Use the names for the inputs `buttonText` and `iconName`.
}
