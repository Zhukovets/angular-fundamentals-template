import {Component, EventEmitter, Input, Output} from '@angular/core';
import {CardItem} from 'src/app/models/card.model';
import {ButtonIcon} from 'src/app/models/const';
import {UserStoreService} from "@app/user/services/user-store.service";


@Component({
    selector: 'app-course-card',
    templateUrl: './course-card.component.html',
    styleUrls: ['./course-card.component.scss']
})
export class CourseCardComponent {
    buttonIcon = ButtonIcon;
    @Input() cardItem!: CardItem;
    @Input() editable: boolean = true;
    @Input() cardText = '';
    @Output() clickOnShow = new EventEmitter();
    @Output() clickOnEdit = new EventEmitter();
    @Output() clickOnDelete = new EventEmitter();

    constructor( protected userStoreService: UserStoreService) {}

    showCourse() {
        this.clickOnShow.emit(this.cardItem.id);
    }

    editCourse() {
        this.clickOnEdit.emit(this.cardItem.id);
    }

    deleteCourse() {
        this.clickOnDelete.emit(this.cardItem.id);
    }
}
