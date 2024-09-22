import { Component, OnInit } from "@angular/core";
import { FormBuilder, FormGroup, FormArray, Validators } from "@angular/forms";
import { FaIconLibrary } from "@fortawesome/angular-fontawesome";
import { fas } from "@fortawesome/free-solid-svg-icons";

@Component({
  selector: "app-course-form",
  templateUrl: "./course-form.component.html",
  styleUrls: ["./course-form.component.scss"],
})
export class CourseFormComponent implements OnInit {
  constructor(public fb: FormBuilder, public library: FaIconLibrary) {
    library.addIconPacks(fas);
  }
  courseForm!: FormGroup;
  submitted = false;
  authorsList: any[] = [];
  courseAuthors: any[] = [];
  // Use the names `title`, `description`, `author`, 'authors' (for authors list), `duration` for the form controls.
  ngOnInit(): void {
    this.courseForm = this.fb.group({
      title: ["", [Validators.required, Validators.minLength(2)]],
      description: ["", [Validators.required, Validators.minLength(2)]],
      author: ["", [Validators.pattern(/^[a-zA-Z0-9\s]+$/)]],
      duration: [0, [Validators.required, Validators.min(0)]],
      authors: this.fb.array([]),
    });

    this.authorsList = [
      { id: 1, name: "Author 1" },
      { id: 2, name: "Author 2" },
    ];
  }

  get authors(): FormArray {
    return this.courseForm.get("authors") as FormArray;
  }

  addAuthor(author: any): void {
    this.courseAuthors.push(author);
    this.authorsList = this.authorsList.filter((a) => a.id !== author.id);
    this.authors.push(this.fb.control(author.name));
  }

  removeAuthor(index: number, author: any): void {
    this.courseAuthors = this.courseAuthors.filter((_, i) => i !== index);
    this.authorsList.push(author);
    this.authors.removeAt(index);
  }

  createAuthor(): void {
    const authorName = this.courseForm.get("author")?.value;
    if (authorName) {
      const newAuthor = { id: Date.now(), name: authorName };
      this.authorsList.push(newAuthor);
      this.courseForm.get("author")?.reset();
    }
  }

  onSubmit(): void {
    if (this.courseForm.valid) {
      console.log("Form Submitted", this.courseForm.value);
      // Handle login logic here
    } else {
      console.log("Form is invalid");
      this.courseForm.markAllAsTouched();
    }
  }

  get f() {
    return this.courseForm.controls;
  }
}
