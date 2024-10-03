import { Component } from "@angular/core";
import { CoursesService } from "@app/services/courses.service";
import { Observable } from "rxjs";

@Component({
  selector: "app-courses-list",
  templateUrl: "./courses-list.component.html",
  styleUrls: ["./courses-list.component.css"],
})
export class CoursesListComponent {
  courses$: Observable<any[]>;
  isEditable: boolean = false;

  constructor(private coursesService: CoursesService) {
    this.courses$ = this.coursesService.getAll();
    this.courses$.subscribe((el) => console.log(el));
  }
}
