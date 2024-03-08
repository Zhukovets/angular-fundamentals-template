import { Component } from "@angular/core";

@Component({
	selector: "app-root",
	templateUrl: "./app.component.html",
	styleUrls: ["./app.component.scss"],
})
export class AppComponent {
	constructor() {}
	title = "courses-app";
	headerButtonText = "LOGIN";
	headerButtonIconName: "delete" | "edit" | "" = "";
	appInfoText = "Please use 'Add new Course' button to add your first course";
	appInfoTitle = "Your List Is Empty";
	appInfoButtonText = "ADD NEW COURSE";
	appInfoButtonIconName = "";
}
