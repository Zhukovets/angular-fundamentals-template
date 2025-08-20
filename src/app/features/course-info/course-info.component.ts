import {Component, EventEmitter, Input, Output} from '@angular/core';

@Component({
  selector: 'app-course-info',
  templateUrl: './course-info.component.html',
  styleUrls: ['./course-info.component.scss']
})
export class CourseInfoComponent {
  // Use the names for the input `course`.
 @Input() courseTitle!: string;
 @Input() courseDescription!: string;
 @Input() courseId!: string;
 @Input() courseCreationDate!: Date;
 @Input() courseDuration!: number;
 @Input() courseAuthors!: string[];

 @Output() backEvent = new EventEmitter();
}
