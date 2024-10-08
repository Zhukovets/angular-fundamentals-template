import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CourseInfoComponent } from './course-info.component';
import { SharedModule } from "../../shared/shared.module";
import { CoursesModule } from '../courses/courses.module';

@NgModule({
  declarations: [
    CourseInfoComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    CoursesModule
],
  exports: [CourseInfoComponent]
})
export class CourseInfoModule {}
