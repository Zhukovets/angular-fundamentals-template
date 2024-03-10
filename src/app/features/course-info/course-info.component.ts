import { Component, Input } from "@angular/core";

@Component({
	selector: "app-course-info",
	templateUrl: "./course-info.component.html",
	styleUrls: ["./course-info.component.scss"],
})
export class CourseInfoComponent {
	@Input() course: any;
}
