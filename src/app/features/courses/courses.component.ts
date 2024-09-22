import {Component, Input} from '@angular/core';
import {Author, CardItem} from "@app/models/card.model";
import {mockedAuthorsList, mockedCoursesList} from "@shared/mocks/mocks";
import {ButtonText} from "@app/models/const";

@Component({
  selector: 'app-courses',
  templateUrl: './courses.component.html',
  styleUrls: ['./courses.component.scss']
})

export class CoursesComponent {
  buttonTexts = ButtonText;
  @Input() coursesList: CardItem[] = mockedCoursesList; //temporary
  @Input() authorsList: Author[] = mockedAuthorsList; //temporary

  search(data:string) {
    console.log(data);
  }

  getAuthorName(authorsId: string[]) {
     return authorsId.reduce((acc, id) => {
       const idItem = this.authorsList.find((item) => item.id === id);
       if(idItem) return [...acc, idItem.name];
       return acc;
     },[] as string[])
  }

  getListCourses(coursesList: CardItem[] ) {
    return coursesList.reduce((acc, item) => {
      return [...acc, { ...item, authors: this.getAuthorName(item.authors)}]
    },[] as CardItem[])
  }
}

