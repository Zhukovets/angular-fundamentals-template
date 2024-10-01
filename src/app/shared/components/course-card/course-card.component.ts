import { DatePipe } from '@angular/common';
import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-course-card',
  templateUrl: './course-card.component.html',
  styleUrls: ['./course-card.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [DatePipe],
})
export class CourseCardComponent {
  @Input() title!: string;
  @Input() description!: string;
  @Input() creationDate!: string;
  @Input() duration!: number;
  @Input() authors!: string[];
  @Input() editable: boolean = false;
  @Output() clickOnShow = new EventEmitter<void>();

  constructor(){}

  onShowCourse(): void{
    this.clickOnShow.emit();
  }

  
}
