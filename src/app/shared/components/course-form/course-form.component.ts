import { Component, OnInit } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { Author } from "@app/models/author.model";
import { FaIconLibrary } from "@fortawesome/angular-fontawesome";
import { fas } from "@fortawesome/free-solid-svg-icons";
import { CoursesService } from "@app/services/courses.service";

@Component({
  selector: "app-course-form",
  templateUrl: "./course-form.component.html",
  styleUrls: ["./course-form.component.scss"],
})
export class CourseFormComponent implements OnInit {
  [x: string]: any;
  courseForm: FormGroup = this.fb.group({
    title: ["", [Validators.required, Validators.minLength(2)]],
    description: ["", [Validators.required, Validators.minLength(2)]],
    author: [
      "",
      [Validators.pattern(/^[a-zA-Z0-9\s]+$/), Validators.minLength(2)],
    ],
    duration: [0, [Validators.required, Validators.min(0)]],
    authors: this.fb.array([]),
  });
  submitted = false;
  authors: Author[] = [];

  courseAuthors: any[] = [];

  constructor(
    private coursesService: CoursesService,
    public fb: FormBuilder,
    public library: FaIconLibrary
  ) {
    library.addIconPacks(fas);
    this.getAllAuthors();
  }

  ngOnInit(): void {}

  // Use the names `title`, `description`, `author`, 'authors' (for authors list), `duration` for the form controls.

  createAuthor(): void {
    const authorName = this.courseForm.controls["author"]?.value;
    if (authorName) {
      this.coursesService.createAuthor(authorName).subscribe(
        (newAuthor) => {
          console.log("Author created successfully:", newAuthor);
          this.authors.push(newAuthor);
          this.courseForm.get("author")?.reset();
        },
        (error) => {
          console.error("Failed to create author:", error);
        }
      );
    }
  }

  getAllAuthors() {
    this.coursesService.getAllAuthors().subscribe({
      next: (authors: Author[]) => {
        this.authors = authors;
      },
      error: (err) => {
        console.error("Error fetching authors", err);
      },
    });
  }

  addAuthor(author: any): void {
    this.courseAuthors.push(author);
    this.authors = this.authors.filter((a) => a.id !== author.id);
    //  this.authors.push(this.fb.control(authors.name));
  }

  removeAuthor(index: number, author: any): void {
    this.courseAuthors = this.courseAuthors.filter((_, i) => i !== index);
    this.authors.push(author);
  }

  removeAuthorFromAuthors(author: any): void {
    this.authors = this.authors.filter((a) => a.id !== author.id);
  }

  onSubmit(): void {
    this.submitted = true;
    if (this.courseForm.invalid) {
      return;
    }
    this.courseForm.value;
  }

  onCancel(): void {}

  get f() {
    return this.courseForm.controls;
  }
}
