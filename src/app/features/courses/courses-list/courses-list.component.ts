import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Course } from '@app/models/course.model';
import { FaIconLibrary } from '@fortawesome/angular-fontawesome';
import { fas } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-courses-list',
  templateUrl: './courses-list.component.html',
  styleUrls: ['./courses-list.component.scss']
})
export class CoursesListComponent {
  @Input() courses!: Course[];
  @Input() editable!: boolean;

  @Output() showCourse = new EventEmitter<any>();
  @Output() editCourse = new EventEmitter<any>();
  @Output() deleteCourse = new EventEmitter<any>();

  constructor(library: FaIconLibrary){
    library.addIcons(fas["faTrashCan"], fas["faPen"]);
  }
}
