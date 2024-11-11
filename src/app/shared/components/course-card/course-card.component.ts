import { Component, Input, Output, EventEmitter } from '@angular/core';
import { Router } from '@angular/router';


@Component({
  selector: 'app-course-card',
  templateUrl: './course-card.component.html',
  styleUrls: ['./course-card.component.scss']
})
export class CourseCardComponent {
  @Input() title!: string;
  @Input() description!: string;
  @Input() creationDate!: Date;
  @Input() duration!: number;
  @Input() authors!: string[];
  @Input() editable: boolean = false;
  @Input() id!: any;

  @Output() clickOnShow = new EventEmitter<void>();

  constructor( private router: Router) {}

  showCourse(): void {
    this.clickOnShow.emit(this.id);
  }

  editCourse() {
    this.router.navigate([`/courses/edit/${this.id}`]);
  }
  
}
