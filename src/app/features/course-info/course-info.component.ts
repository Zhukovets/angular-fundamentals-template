import { Component, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-course-info',
  templateUrl: './course-info.component.html',
  styleUrls: ['./course-info.component.scss']
})
export class CourseInfoComponent {
  @Input() course!: {
    id: string;
    title: string;
    description: string;
    creationDate: string;
    duration: number;
    authors: string[];
  };

  @Output() goBack = new EventEmitter<void>();

  onBack() {
    this.goBack.emit();
  }
}