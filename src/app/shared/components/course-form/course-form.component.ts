import { Component, OnInit } from "@angular/core";
import {
  FormArray,
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from "@angular/forms";
import { FaIconLibrary } from "@fortawesome/angular-fontawesome";
import { fas } from "@fortawesome/free-solid-svg-icons";
import { v4 as uuidv4 } from "uuid";

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
  protected submitted: boolean = false;

  ngOnInit(): void {
    this.courseForm = this.fb.group({
      title: ["", [Validators.required, Validators.minLength(2)]],
      description: ["", [Validators.required, Validators.minLength(2)]],
      author: [
        "",
        [Validators.pattern("^[A-Za-z0-9]+$"), Validators.minLength(2)],
      ],
      authors: this.fb.array([]),
      courseAuthors: this.fb.array([]),
      duration: ["", [Validators.required, Validators.min(0)]],
    });
  }

  protected getAuthors(): FormArray {
    return this.courseForm.get("authors") as FormArray;
  }

  protected getCourseAuthors(): FormArray {
    return this.courseForm.get("courseAuthors") as FormArray;
  }

  protected createNewAuthor(): void {
    if (this.courseForm.controls["author"].value === "") {
      alert("Do not add empty");
      // TODO
    } else {
      this.getAuthors().push(
        this.fb.group({
          author: [this.courseForm.controls["author"].value],
          id: [uuidv4()],
        })
      );

      this.courseForm.controls["author"].setValue("");
    }
  }

  protected addToCourseAuthors(id: number) {
    const author = this.getAuthors().at(id);
    this.getCourseAuthors().push(author);
    this.getAuthors().removeAt(id);
  }

  protected removeFromCourseAuthors(id: number) {
    const author = this.getCourseAuthors().at(id);
    this.getAuthors().push(author);
    this.getCourseAuthors().removeAt(id);
  }

  protected deleteAuthor(id: number) {
    this.getAuthors().removeAt(id);
  }

  protected submit() {
    console.log(this.courseForm);
    this.submitted = true;
  }
  // Use the names `title`, `description`, `author`, 'authors' (for authors list), `duration` for the form controls.
}
