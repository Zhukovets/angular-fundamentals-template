import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { mockedAuthorsList, mockedCoursesList } from '@app/shared/mocks/mocks';

@Component({
  selector: 'app-course-card',
  templateUrl: './course-card.component.html',
  styleUrls: ['./course-card.component.scss']
})
export class CourseCardComponent implements OnInit {
  @Input() editable!: boolean;
  @Input() title!: string;
  @Input() description!: string;
  @Input() creationDate!: Date;
  @Input() duration!: number;
  @Input() authors!: string[];

  @Output() clickOnShow = new EventEmitter<string>();


  ngOnInit(): void {
  // this.title = mockedCoursesList[1].title
  // this.description = mockedCoursesList[1].description
  // this.creationDate = new Date(mockedCoursesList[1].creationDate)
  // this.duration = mockedCoursesList[1].duration
  this.authors = this.authors.map((authorId) => {
    const author = mockedAuthorsList.find((author) => author.id === authorId);
    return author!.name;
  })    
  }

}
