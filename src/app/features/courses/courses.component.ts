import { Component } from '@angular/core';
import { mockedCoursesList } from '@app/shared/mocks/mocks';

export interface Course {
      id: string;
      title: string;
      description: string;
      authors: string[],
      duration: number;
      creationDate: string;
};

@Component({
  selector: 'app-courses',
  templateUrl: './courses.component.html',
  styleUrls: ['./courses.component.css']
})
export class CoursesComponent {
 mockedCoursesList = mockedCoursesList;
  course!: Course;
  showCourseInfo: boolean = false;

  onShowCourse(courseTitle: string) {
    let selectedCourse = mockedCoursesList.find((course) => course.title === courseTitle);
    this.course = {...selectedCourse!};
    this.showCourseInfo = true;
  }

  onEditCourse(courseTitle: string) {
    console.log(`Edit course ${courseTitle}`);
  }
  onDeleteCourse(courseTitle: string) {
    console.log(`Delete course ${courseTitle}`);
  }

  hideShowCourseInfo(showCourseInfo: boolean) {
  this.showCourseInfo = showCourseInfo;
  }
  
}
