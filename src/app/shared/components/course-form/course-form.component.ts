import { Component } from "@angular/core";
import {
  FormBuilder,
  FormGroup,
  FormControl,
  Validators,
  FormArray,
} from "@angular/forms";
import { FaIconLibrary } from "@fortawesome/angular-fontawesome";
import { fas } from "@fortawesome/free-solid-svg-icons";
import { ActivatedRoute, Router } from "@angular/router";
import { CoursesStoreService } from "@app/services/courses-store.service";
import { OnInit } from "@angular/core";

@Component({
  selector: "app-course-form",
  templateUrl: "./course-form.component.html",
  styleUrls: ["./course-form.component.scss"],
})
export class CourseFormComponent implements OnInit {
  courseForm!: FormGroup;
  submitted = false;
  courseId: string | null = null;
  constructor(
    public fb: FormBuilder,
    public library: FaIconLibrary,
    private route: ActivatedRoute,
    private router: Router,
    private coursesStore: CoursesStoreService
  ) {
    library.addIconPacks(fas);
    this.courseForm = this.fb.group({
      title: ["", [Validators.required, Validators.minLength(2)]],
      description: ["", [Validators.required, Validators.minLength(2)]],
      duration: [0, [Validators.required, Validators.min(0)]],
      authors: this.fb.array([]),
      courseAuthors: this.fb.array([]),
      author: [
        "",
        [Validators.minLength(2), Validators.pattern(/^[a-zA-Z0-9 ]+$/)],
      ],
    });
  }
  get authors(): FormArray {
    return this.courseForm.get("authors") as FormArray;
  }

  get courseAuthors(): FormArray {
    return this.courseForm.get("courseAuthors") as FormArray;
  }

  addAuthor() {
    const control = this.courseForm.get("author") as FormControl;
    control.markAsTouched();

    if (!control.value || !control.value.trim()) return;
    if (control.invalid) return;

    this.authors.push(new FormControl(control.value.trim()));
    control.reset();
  }

  addAuthorToCourse(index: number) {
    const author = this.authors.at(index) as FormControl;
    this.courseAuthors.push(this.fb.control(author.value));
    this.authors.removeAt(index);
  }

  removeAuthorFromCourse(index: number) {
    const author = this.courseAuthors.at(index) as FormControl;
    this.authors.push(this.fb.control(author.value));
    this.courseAuthors.removeAt(index);
  }
  deleteAuthor(index: number) {
    this.authors.removeAt(index);
  }
  get authorsControls(): FormControl[] {
    return this.authors.controls as FormControl[];
  }

  get courseAuthorsControls(): FormControl[] {
    return this.courseAuthors.controls as FormControl[];
  }

  onSubmit() {
    this.submitted = true;

    if (this.courseForm.valid) {
      const courseData = this.courseForm.value;

      if (this.courseId) {
        this.coursesStore.editCourse(this.courseId, courseData);
      } else {
        this.coursesStore.createCourse(courseData);
      }

      this.router.navigate(["/courses"]);
    } else {
      console.log("Form is invalid");
    }
  }

  ngOnInit(): void {
    this.courseId = this.route.snapshot.paramMap.get("id");

    if (this.courseId) {
      this.coursesStore.getCourse(this.courseId).subscribe((course) => {
        this.courseForm.patchValue({
          title: course.title,
          description: course.description,
          duration: course.duration,
        });
        course.authors?.forEach((author: string) => {
          this.courseAuthors.push(this.fb.control(author));
        });
      });
    }
    // Use the names `title`, `description`, `author`, 'authors' (for authors list), `duration` for the form controls.
  }
}
