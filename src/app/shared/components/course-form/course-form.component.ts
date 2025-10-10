import { Component, OnInit } from "@angular/core";
import {
  FormBuilder,
  FormGroup,
  Validators,
  FormArray,
  FormControl,
  AbstractControl,
} from "@angular/forms";
import { FaIconLibrary } from "@fortawesome/angular-fontawesome";
import { fas } from "@fortawesome/free-solid-svg-icons";

import { CoursesStoreService } from "../../../services/courses-store.service";
import { CoursesFacade } from "src/app/store/courses/courses.facade";
import { Router, ActivatedRoute } from "@angular/router";
import { Observable, Subscription } from "rxjs";
import { take } from "rxjs/operators";

interface Author {
  id: string;
  name: string;
}
interface CourseUpdateData {
  title: string;
  description: string;
  duration: number;
  authors: string[];
}
interface Course {
  id: string;
  title: string;
  description: string;
  duration: number;
  authors: string[];
  creationDate: string;
}

@Component({
  selector: "app-course-form",
  templateUrl: "./course-form.component.html",
  styleUrls: ["./course-form.component.scss"],
})
export class CourseComponent implements OnInit {
  courseForm: FormGroup;
  authorsList: Author[] = [];
  courseAuthors: Author[] = [];

  isEditMode: boolean = false;
  courseId: string | null = null;
  public allAuthors$: Observable<Author[]>;
  private authorSubscription!: Subscription;

  constructor(
    public fb: FormBuilder,
    public library: FaIconLibrary,
    private coursesStore: CoursesStoreService,
    private coursesFacade: CoursesFacade,
    private router: Router,
    private route: ActivatedRoute
  ) {
    library.addIconPacks(fas);
    this.courseForm = this.fb.group({
      title: ["", [Validators.required, Validators.minLength(2)]],
      description: ["", [Validators.required, Validators.minLength(2)]],
      duration: [0, [Validators.required, Validators.min(0)]],
      authors: this.fb.array([]),
      newAuthor: this.fb.group({
        authorName: [
          "",
          [Validators.minLength(2), Validators.pattern(/^[a-zA-Z0-9\s]*$/)],
        ],
      }),
    });
    this.allAuthors$ = this.coursesStore.authors$;
  }

  ngOnInit(): void {
    this.coursesStore.getAuthors();

    this.authorSubscription = this.allAuthors$.subscribe((allAuthors) => {
      this.authorsList = allAuthors.filter(
        (a) => !this.courseAuthors.some((ca) => ca.id === a.id)
      );
    });

    this.route.paramMap.pipe(take(1)).subscribe((params) => {
      this.courseId = params.get("id");
      this.isEditMode = !!this.courseId;

      if (this.isEditMode && this.courseId) {
        this.coursesFacade.getSingleCourse(this.courseId);
        this.coursesFacade.course$.pipe(take(1)).subscribe((course: any) => {
          if (course) {
            this.courseForm.patchValue({
              title: course.title,
              description: course.description,
              duration: course.duration,
            });

            this.allAuthors$.pipe(take(1)).subscribe((all) => {
              course.authors.forEach((authorId: string) => {
                const author = all.find((a) => a.id === authorId);
                if (author) {
                  this.addAuthor(author);
                }
              });
            });
          }
        });
      }
    });
  }

  ngOnDestroy(): void {
    if (this.authorSubscription) {
      this.authorSubscription.unsubscribe();
    }
  }

  get courseAuthorsArray(): FormArray {
    return this.courseForm.get("authors") as FormArray;
  }

  get newAuthorControl(): FormControl {
    return this.courseForm.get("newAuthor.authorName") as FormControl;
  }

  addAuthor(author: Author): void {
    this.courseAuthors.push(author);
    this.authorsList = this.authorsList.filter((a) => a.id !== author.id);
    this.courseAuthorsArray.push(this.fb.control(author.id));
  }

  removeAuthor(author: Author): void {
    this.authorsList.push(author);
    this.courseAuthors = this.courseAuthors.filter((a) => a.id !== author.id);

    const index = this.courseAuthorsArray.controls.findIndex(
      (c) => c.value === author.id
    );
    if (index !== -1) {
      this.courseAuthorsArray.removeAt(index);
    }
  }

  createAuthor(): void {
    const newAuthorName = this.newAuthorControl.value;

    if (newAuthorName && this.newAuthorControl.valid) {
      this.coursesStore.createAuthor(newAuthorName);

      this.newAuthorControl.reset();
    }
  }

  private markAllAsTouched(control: AbstractControl): void {
    if (control instanceof FormGroup || control instanceof FormArray) {
      Object.values(control.controls).forEach((subControl) => {
        this.markAllAsTouched(subControl);
      });
    }
    control.markAsTouched();
  }

  onSubmit(): void {
    this.markAllAsTouched(this.courseForm);

    if (this.courseForm.valid) {
      const formValue = this.courseForm.value;

      const courseData: CourseUpdateData = {
        title: formValue.title,
        description: formValue.description,
        duration: formValue.duration,
        authors: this.courseAuthors.map((a) => a.id),
      };

      if (this.isEditMode && this.courseId) {
        this.coursesFacade.editCourse(this.courseId, courseData);
      } else {
        this.coursesFacade.createCourse(courseData);
      }
      this.router.navigate(["/courses"]);
    } else {
      console.log("Form is invalid. Displaying errors.");
    }
  }

  onCancel(): void {
    this.router.navigate(["/courses"]);
  }
}
