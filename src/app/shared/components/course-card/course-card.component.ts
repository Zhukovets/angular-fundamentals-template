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
  @Input() creationDate!: string | null;
  @Input() duration!: number;
  @Input() authors!: string[] | null;
  @Input() editable: boolean = false;
  
  @Output() clickOnShow = new EventEmitter<void>();
  @Output() clickOnEdit = new EventEmitter<void>();
  @Output() clickOnDelete = new EventEmitter<void>();

  constructor(){}

  onShowCourse(): void{
    this.clickOnShow.emit();
  }

  onDeleteCourse(): void{
    this.clickOnDelete.emit();
  }

  onEditCourse(): void{
    this.clickOnEdit.emit();
  }
  
}
