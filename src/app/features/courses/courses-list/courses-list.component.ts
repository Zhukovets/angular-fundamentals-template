import { Component, Input } from "@angular/core";
import { mockedCoursesList } from "@app/shared/mocks/mock";

@Component({
	selector: "app-courses-list",
	templateUrl: "./courses-list.component.html",
	styleUrls: ["./courses-list.component.css"],
})
export class CoursesListComponent {
	@Input() courses: any[] = mockedCoursesList;
	@Input() areEditable!: boolean;
}
