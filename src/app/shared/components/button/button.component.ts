import { Component, EventEmitter, Input, Output } from "@angular/core";
import { FaIconLibrary } from "@fortawesome/angular-fontawesome";
import { fas } from "@fortawesome/free-solid-svg-icons";

@Component({
  selector: "app-button",
  templateUrl: "./button.component.html",
  styleUrls: ["./button.component.scss"],
})
export class ButtonComponent {
  constructor(library: FaIconLibrary) {
    library.addIconPacks(fas);
  }

  // Use the names for the inputs `buttonText` and `iconName`.
  @Input() buttonText?: string;
  @Input() iconName?: any;
  @Input() reversed: boolean = false;

  @Output() changeLoggedStatus = new EventEmitter<void>();

  changeLoginStatus() {
    this.changeLoggedStatus.emit();
  }
}
