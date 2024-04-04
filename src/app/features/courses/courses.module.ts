import { NgModule } from '@angular/core';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { CommonModule } from '@angular/common';
import { SharedModule } from '@shared/shared.module';
import { CoursesService } from '@app/services/courses.service';
import { CoursesComponent } from '@app/features/courses/courses.component';
import { CourseInfoModule } from '@app/features/course-info/course-info.module';
import { CourseListComponent } from '@features/courses/courses-list/courses-list.component';
import { RouterModule } from '@angular/router';
import { CoursesRoutingModule } from './courses-routing.module';

@NgModule({
  declarations: [CoursesComponent, CourseListComponent],
  imports: [
    CommonModule,
    SharedModule,
    FontAwesomeModule,
    CourseInfoModule,
    CoursesRoutingModule,
    RouterModule
  ],
  providers: [CoursesService],
  exports: [CoursesComponent]
})
export class CoursesModule {}
