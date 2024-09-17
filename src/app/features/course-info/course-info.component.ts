import { Component, Input } from '@angular/core';
import { Card } from 'src/app/model/cardmodel';
import { mockedCoursesList } from 'src/app/shared/mock/mock';

@Component({
  selector: 'app-course-info',
  templateUrl: './course-info.component.html',
  styleUrls: ['./course-info.component.scss']
})
export class CourseInfoComponent {
  @Input() course:Card = mockedCoursesList[1];
  /* @Input() course!: {
    title: string;
    description: string;
    id: string;
    creationDate: Date;
    duration: number;
    authors: string[];
  } */
}
