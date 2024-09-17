import { Component } from '@angular/core';
import { mockedCoursesList, mockedAuthorsList } from "./shared/mocks/mocks";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'courses-app';

  private authorMap = new Map<string, string>(mockedAuthorsList.map(author => [author.id, author.name]));
  public courses = mockedCoursesList.map(course => ({
    ...course,
    authors: course.authors.map(authorId => this.authorMap.get(authorId) || 'Unknown Author')
  }));
}
