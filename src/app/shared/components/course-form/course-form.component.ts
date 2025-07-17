import { Component, ViewChild, OnDestroy, OnInit } from "@angular/core";
import { NgForm } from "@angular/forms";
import { Router, ActivatedRoute } from "@angular/router";
import { FaIconLibrary } from "@fortawesome/angular-fontawesome";
import { fas } from "@fortawesome/free-solid-svg-icons";
import { Course } from "../../../types/courseTypes";
import { Author } from "../../../types/authorTypes";
import { CoursesStateFacade } from "../../../store/courses/courses.facade";
import { Subscription } from "rxjs";

@Component({
  selector: "app-course-form",
  templateUrl: "./course-form.component.html",
  styleUrls: ["./course-form.component.scss"],
})
export class CourseFormComponent implements OnInit, OnDestroy {
  @ViewChild("courseForm") public courseForm!: NgForm;
  courseSubscription!: Subscription;
  authorsSubscription!: Subscription;

  allAuthors: Author[] = [];
  courseAuthors: Author[] = [];
  editMode = false;
  courseId: string | null = null;

  constructor(
    public library: FaIconLibrary,
    private router: Router,
    private route: ActivatedRoute,
    private coursesFacade: CoursesStateFacade
  ) {
    library.addIconPacks(fas);
    this.courseId = this.route.snapshot.paramMap.get("id");
    this.editMode = !!this.courseId;
  }

  ngOnInit() {
    this.coursesFacade.getAllAuthors();
    this.authorsSubscription = this.coursesFacade.authors$.subscribe(
      (authors) => {
        this.allAuthors = authors ? [...authors] : [];
      }
    );
  }

  createAuthor() {
    const authorName = this.courseForm.value.author?.trim();
    if (!authorName || authorName.length < 2) return;
    this.coursesFacade.createAuthor(authorName);
    this.courseForm.form.patchValue({ author: "" });
  }

  addAuthorToCourse(author: Author): void {
    this.courseAuthors.push(author);
    this.allAuthors = this.allAuthors.filter((a) => a.id !== author.id);
  }

  removeAuthorFromCourse(index: number): void {
    const [removed] = this.courseAuthors.splice(index, 1);
    if (removed) {
      this.allAuthors.push(removed);
    }
  }

  trackByAuthorIndex(index: number): number {
    return index;
  }

  onSubmit() {
    if (this.courseForm.valid) {
      const { title, description, duration } = this.courseForm.value;
      const courseData: Course = {
        id: this.editMode ? this.courseId! : Date.now().toString(),
        title: title,
        description: description,
        creationDate: new Date().toISOString(),
        duration: duration,
        authors: this.courseAuthors.map((a) => a.id),
      };
      console.log("courseData:", courseData);
      if (this.editMode) {
        this.coursesFacade.editCourse(courseData, String(courseData.id));
      } else {
        this.coursesFacade.createCourse(courseData);
      }
    }
  }

  cancelClick() {
    this.router.navigate(["/courses"]);
  }

  ngOnDestroy() {
    this.courseSubscription?.unsubscribe();
    this.authorsSubscription?.unsubscribe();
  }
}
