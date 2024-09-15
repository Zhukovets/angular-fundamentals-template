import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CoursesComponent } from './courses.component';
import { CoursesListModule } from '../courses-list/courses-list.module';
import { CourseInfoModule } from '../course-info/course-info.module';



@NgModule({
  declarations: [
    CoursesComponent
  ],
  imports: [
    CommonModule,
    CoursesListModule,
    CourseInfoModule
  ]
})
export class CoursesModule { }
