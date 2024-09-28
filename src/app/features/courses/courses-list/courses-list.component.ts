import { Component, Input, Output, EventEmitter } from '@angular/core';
import { mockedCoursesList, mockedAuthorsList } from '@app/shared/mock/mock';

@Component({
  selector: 'app-courses-list',
  templateUrl: './courses-list.component.html',
  styleUrls: ['./courses-list.component.css']
})
export class CoursesListComponent {
  mockedCourses = mockedCoursesList
  mockedAuthors = mockedAuthorsList

  mergedMockedCourses = mockedCoursesList.map(course => {
    const authorNames = course.authors.map(authorId => {
        const author = mockedAuthorsList.find(author => author.id === authorId);
        return author ? author.name : 'Unknown Author';
    });

    return {
        ...course, authors: authorNames
    };
});
  @Input() editable: boolean = false;

  @Output() showCourse = new EventEmitter<any>();
  @Output() editCourse = new EventEmitter<any>();
  @Output() deleteCourse = new EventEmitter<any>();

}
