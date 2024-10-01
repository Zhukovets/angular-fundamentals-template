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
  @Input() buttonText?: string;
  @Input() iconName?: string;

  @Output() parentFunction: EventEmitter<void> = new EventEmitter<void>();

  onClick(): void {
    this.parentFunction.emit();
  }
}
