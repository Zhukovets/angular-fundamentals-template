import {Component, Input} from '@angular/core';
import { CardItem } from 'src/app/models/card.model';
import { ButtonText } from 'src/app/models/const';
import  { mockedCoursesList }  from 'src/app/shared/mocks/mocks';

@Component({
  selector: 'app-course-info',
  templateUrl: './course-info.component.html',
  styleUrls: ['./course-info.component.scss']
})
export class CourseInfoComponent {
  // Use the names for the input `course`.
  buttonText = ButtonText;
  @Input() courseInfo:CardItem = mockedCoursesList[0];// for the sample

}
