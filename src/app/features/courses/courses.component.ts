import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { Observable } from "rxjs";
import { CoursesStoreService } from "../../services/courses-store.service";
import { UserStoreService } from "../../user/services/user-store.service";
import { Course } from "../../types/courseTypes";

@Component({
  selector: "app-courses",
  templateUrl: "./courses.component.html",
  styleUrls: ["./courses.component.scss"],
})
export class CoursesComponent implements OnInit {
  coursesList$: Observable<Course[]> = this.coursesStore.courses$;
  isLoading$: Observable<boolean> = this.coursesStore.isLoading$;
  isAdmin$ = this.userStore.isAdmin$;

  isSearchActive: boolean = false;
  searchText: string = "";

  constructor(
    private coursesStore: CoursesStoreService,
    private userStore: UserStoreService,
    private router: Router
  ) {}

  ngOnInit(): void {
    console.log("CoursesComponent ngOnInit");
    this.userStore.getUser();
    this.coursesStore.getAll();
  }

  onSearchCourses(searchText: string) {
    this.searchText = searchText;
    this.isSearchActive = searchText.length >= 2;
    this.coursesStore.filterCourses(searchText);
  }

  showInfo(course: Course) {
    this.router.navigate(["/courses", course.id]);
  }

  showList() {
    this.router.navigate(["/courses"]);
  }

  editCourse(id: string) {
    this.router.navigate(["/courses/edit", id]);
  }

  deleteCourse(id: string) {
    this.coursesStore.deleteCourse(id);
  }

  addCourse() {
    this.router.navigate(["/courses/add"]);
  }
}
