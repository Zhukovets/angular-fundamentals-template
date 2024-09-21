import { Component } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
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
    public library: FaIconLibrary
  ) {
    library.addIconPacks(fas);
  }
  courseForm!: FormGroup;
  authors: any[] = [];
  durationText: string = "";
  submitted = false;

  ngOnInit(): void {
    this.courseForm = this.fb.group({
      title: ["", [Validators.required, Validators.minLength(2)]],
      description: ["", [Validators.required, Validators.minLength(2)]],
      author_name: ["", Validators.pattern("[a-zA-Z0-9 ]*")],
      duration: ["", [Validators.required, Validators.min(1)]],
    });

    this.courseForm.get("duration")?.valueChanges.subscribe((value) => {
      this.durationText = `${value} minutes`;
    });
  }

  addAuthor() {
    const authorName = this.courseForm.get("author_name")?.value;
    if (
      authorName &&
      !this.authors.some((author) => author.name === authorName)
    ) {
      const authorId = Math.random().toString(36).substr(2, 9);
      this.authors.push({ id: authorId, name: authorName });
      this.courseForm.get("author_name")?.reset();
    }
  }

  removeAuthor(author: string) {
    this.authors = this.authors.filter((a) => a !== author);
  }

  onSubmit() {
    if (this.courseForm.valid) {
      const courseData = this.courseForm.value;
      courseData.authors = this.authors;
      console.log("Form submitted:", courseData);
    } else {
      console.log("Form is invalid");
      this.courseForm.markAllAsTouched();
    }
  }

  getDurationFormatted(minutes: number): string {
    const hours = Math.floor(minutes / 60);
    const mins = minutes % 60;
    return `${hours.toString().padStart(2, "0")}:${mins
      .toString()
      .padStart(2, "0")}`;
  }
}
