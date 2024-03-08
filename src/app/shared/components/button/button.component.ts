import { Component, EventEmitter, Input, Output } from "@angular/core";
import { FaIconLibrary } from "@fortawesome/angular-fontawesome";
import { faTrashCan, fas, faPencil } from "@fortawesome/free-solid-svg-icons";

@Component({
	selector: "app-button",
	templateUrl: "./button.component.html",
	styleUrls: ["./button.component.scss"],
})
export class ButtonComponent {
	@Input() buttonText: string | undefined;
	@Input() iconName: string | undefined;
	@Output() newButtonEvent = new EventEmitter<any>();

	loginLogout(value: string) {
		// this.newButtonEvent.emit(value)
		console.log(value);
	}
	faTrashCan = faTrashCan;
	faPencil = faPencil;

	constructor(library: FaIconLibrary) {
		library.addIconPacks(fas);
	}

	// Use the names for the inputs `buttonText` and `iconName`.
}
