import { Component, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-course-card',
  templateUrl: './course-card.component.html',
  styleUrls: ['./course-card.component.scss'],
})
export class CourseCardComponent {
  @Input() cardTitle!: string;
  @Input() cardDescription!: string;
  @Input() creationDate!: Date;
  @Input() cardDuration!: number;
  @Input() cardAuthors!: string[];

  @Input() cardEditable: boolean = false;

  // @Output() deleteRequest = new EventEmitter<Item>()
  @Output() clickOnShow = new EventEmitter<void>();

  showCourse() {
    this.clickOnShow.emit();
  }
}
