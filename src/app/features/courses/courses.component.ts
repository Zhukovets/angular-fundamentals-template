import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { Observable } from "rxjs";
import { CoursesStateFacade } from "../../store/courses/courses.facade";
import { UserStoreService } from "../../user/services/user-store.service";
import { Course } from "../../types/courseTypes";

@Component({
  selector: "app-courses",
  templateUrl: "./courses.component.html",
  styleUrls: ["./courses.component.scss"],
})
export class CoursesComponent implements OnInit {
  coursesList$: Observable<Course[] | null> = this.coursesFacade.courses$;
  isLoading$: Observable<boolean> = this.coursesFacade.isAllCoursesLoading$;
  isAdmin$ = this.userStore.isAdmin$;

  isSearchActive: boolean = false;
  searchText: string = "";

  constructor(
    private coursesFacade: CoursesStateFacade,
    private userStore: UserStoreService,
    private router: Router
  ) {}

  ngOnInit(): void {
    console.log("CoursesComponent ngOnInit");
    this.userStore.getUser();
    this.coursesFacade.getAllCourses();
  }

  onSearchCourses(searchText: string) {
    this.searchText = searchText;
    this.isSearchActive = searchText.length >= 2;
    this.coursesFacade.getFilteredCourses(searchText);
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
    this.coursesFacade.deleteCourse(id);
  }

  addCourse() {
    this.router.navigate(["/courses/add"]);
  }
}
