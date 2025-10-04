import { Component, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-course-info',
  templateUrl: './course-info.component.html',
  styleUrls: ['./course-info.component.scss']
})
export class CourseInfoComponent {
  @Input() course: {
    id: string;
    title: string;
    description: string;
    creationDate: Date;
    duration: number;
    authors: string[];
  } | null = null;

  @Output() back = new EventEmitter<void>();

  onBack() {
    this.back.emit();
  }
  // Use the names for the input `course`.
}
