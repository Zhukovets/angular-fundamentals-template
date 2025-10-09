import { Component, Input, Output, EventEmitter } from '@angular/core';
import { Router } from '@angular/router'; 
//import { CoursesStoreService } from '../../../services/courses-store.service';
import { UserStoreService } from 'src/app/user/services/user-store.service';
import { Observable } from 'rxjs'; 
import { CoursesFacade } from 'src/app/store/courses/courses.facade'; 

interface Course { 
  id: string; 
  title: string; 
  description: string; 
  creationDate: Date | string; 
  duration: number; 
  authors: string[]; 
  topRated: boolean;
}

@Component({
  selector: 'app-course-card',
  templateUrl: './course-card.component.html',
  styleUrls: ['./course-card.component.scss']
})

export class CourseCardComponent {
  @Input() course!: Course; 

  @Input() title!: string;
  @Input() description!: string;
  @Input() creationDate!: Date | string;
  @Input() duration!: number;
  @Input() authors!: string[];
  @Input() editable: boolean = false; 
  
  @Output() editCourse = new EventEmitter<number>();
  @Output() deleteCourse = new EventEmitter<number>();

  public isAdmin$: Observable<boolean>;

  constructor(
    private router: Router, 
   private coursesFacade: CoursesFacade,
    private userStore: UserStoreService 
  ) {
    this.isAdmin$ = this.userStore.isAdmin$;
  }

  onShowCourse(): void {
    this.router.navigate(['/courses', this.course.id]);
  }
  
  onEditCourse(): void {
    this.router.navigate(['/courses/edit', this.course.id]);
  }
  
  onDeleteCourse(): void {
    if (confirm(`Are you sure you want to delete course "${this.course.title}"?`)) {
      this.coursesFacade.deleteCourse(+this.course.id);
    }
  }
}
