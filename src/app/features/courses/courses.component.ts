import { Component, OnInit } from "@angular/core";
import { mockedCoursesList } from "@app/shared/mocks/mocks";
import { Course } from "@app/types/types";

@Component({
  selector: "app-courses[detailedCourse]",
  templateUrl: "./courses.component.html",
  styleUrls: ["./courses.component.scss"],
})
export class CoursesComponent implements OnInit {
  coursesList: Course[] = [];
  listVisible: boolean = true;
  detailedCourse!: Course;

  ngOnInit(): void {
    this.coursesList = mockedCoursesList.map((course) => ({
      ...course,
      creationDate: new Date(course.creationDate),
    }));
  }

  onSearchCourses(searchText: string) {
    console.log(`show search text: ${searchText}`);
  }

  showInfo(course: Course) {
    this.listVisible = !this.listVisible;
    this.detailedCourse = course;
  }

  showList() {
    this.listVisible = !this.listVisible;
  }

  editCourse(id: string) {
    console.log("edit...... ");
  }

  deleteCourse(id: string) {
    console.log("delete....");
  }
}
