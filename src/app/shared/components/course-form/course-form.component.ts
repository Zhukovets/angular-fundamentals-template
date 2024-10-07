import { Component } from "@angular/core";
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from "@angular/forms";
import { CoursesService } from "@app/services/courses.service";
import { FaIconLibrary } from "@fortawesome/angular-fontawesome";
import { fas } from "@fortawesome/free-solid-svg-icons";

@Component({
  selector: "app-course-form",
  templateUrl: "./course-form.component.html",
  styleUrls: ["./course-form.component.scss"],
})
export class CourseFormComponent {
  constructor(
    public fb: FormBuilder,
    public library: FaIconLibrary,
    private coursesService: CoursesService
  ) {
    library.addIconPacks(fas);
    this.form = new FormGroup({
      title: new FormControl("", [
        Validators.required,
        Validators.minLength(2),
      ]),
      description: new FormControl("", [
        Validators.required,
        Validators.minLength(10),
      ]),
      author: new FormControl("", [
        Validators.required,
        Validators.pattern(/^[a-zA-Z0-9 ]+$/),
      ]),
      duration: new FormControl(0, [Validators.required, Validators.min(1)]),
    });
  }

  form: any;
  authors: string[] = [];
  durationTime: number = 0;

  get title() {
    return this.form.get("title");
  }

  get description() {
    return this.form.get("description");
  }

  get author() {
    return this.form.get("author");
  }

  get duration() {
    return this.form.get("duration");
  }

  removeAuthor(author: string) {
    this.authors = this.authors.filter((a) => a !== author);
  }

  createAuthor(author: string) {
    this.coursesService.createAuthor(author).subscribe(
      (response) => {
        console.log("Course created successfully:", response);
      },
      (error) => {
        console.error("Error creating course:", error);
      }
    );
  }

  createCourse() {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }
    const courseData = {
      title: this.title.value,
      description: this.description.value,
      duration: this.duration.value,
      authors: this.authors,
    };
    this.coursesService.createCourse(courseData).subscribe(
      (response) => {
        console.log("Course created successfully:", response);
      },
      (error) => {
        console.error("Error creating course:", error);
      }
    );
  }

  getDurationFormatted(minutes: number): string {
    const hours = Math.floor(minutes / 60);
    const mins = minutes % 60;
    return `${hours.toString().padStart(2, "0")}:${mins
      .toString()
      .padStart(2, "0")}`;
  }
}
