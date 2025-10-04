import { Component, Input } from "@angular/core";
import { FaIconLibrary } from "@fortawesome/angular-fontawesome";
import { fas } from "@fortawesome/free-solid-svg-icons";
import { IconPrefix, IconName } from "@fortawesome/fontawesome-svg-core";

@Component({
  selector: "app-button",
  templateUrl: "./button.component.html",
  styleUrls: ["./button.component.scss"],
})
export class ButtonComponent {
  @Input() buttonText?: string;
  @Input() iconName?: IconName;
  @Input() type: "button" | "submit" | "reset" = "button";

  constructor(library: FaIconLibrary) {
    library.addIconPacks(fas);
  }

  get icon(): [IconPrefix, IconName] | null {
    return this.iconName ? ["fas" as IconPrefix, this.iconName] : null;
  }
  // Use the names for the inputs `buttonText` and `iconName`.
}
