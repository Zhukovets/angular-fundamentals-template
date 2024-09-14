import { DatePipe } from '@angular/common';
import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-course-info',
  templateUrl: './course-info.component.html',
  styleUrls: ['./course-info.component.scss'],
  providers: [DatePipe]

})
export class CourseInfoComponent {
  @Input() title!: string;
  @Input() description!: string;
  @Input() id!: string;
  @Input() creationDate!: Date;
  @Input() duration!: number;
  @Input() authors!: string[];
  @Input() editable: boolean = false;

  constructor(private datePipe: DatePipe){}

  getFormattedDate(date: Date): string {
    return this.datePipe.transform(date, 'dd.MM.yyyy') || '';
  }

  getFormattedDuration(duration: number): string {
    const hours = Math.floor(duration / 60);
    const minutes = duration % 60;
    return `${hours}:${minutes < 10 ? '0' : ''}${minutes}`;
  }
}
