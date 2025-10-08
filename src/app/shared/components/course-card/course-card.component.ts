import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-course-card',
  templateUrl: './course-card.component.html',
  styleUrls: ['./course-card.component.scss']
})
export class CourseCardComponent {
  @Input() id: string = '';
  @Input() title: string = '';
  @Input() description?: string;
  @Input() authors?: string;
  @Input() duration?: string;
  @Input() creationDate?: string;
  @Input() editable: boolean = false;

  @Output() clickOnShow = new EventEmitter<string>();
  @Output() clickOnEdit = new EventEmitter<string>();
  @Output() clickOnDelete = new EventEmitter<string>();

  onShow() { this.clickOnShow.emit(this.id); }
  onEdit() { this.clickOnEdit.emit(this.id); }
  onDelete() { this.clickOnDelete.emit(this.id); }
}
