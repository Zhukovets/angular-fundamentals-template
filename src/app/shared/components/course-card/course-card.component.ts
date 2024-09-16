import {Component, EventEmitter, Input, Output} from '@angular/core';
import { CardItem } from 'src/app/models/card.model';
import { ButtonIcon } from 'src/app/models/const';


@Component({
  selector: 'app-course-card',
  templateUrl: './course-card.component.html',
  styleUrls: ['./course-card.component.scss']
})
export class CourseCardComponent  {
    buttonIcon = ButtonIcon;
    @Input() cardItem!: CardItem;
    @Input() editable: boolean = true;
    @Input() cardText = '';
    @Output() clickOnShow = new EventEmitter();

    getShowCourse() {
        this.clickOnShow.emit();
    }

}
