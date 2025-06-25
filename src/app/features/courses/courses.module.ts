import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CoursesComponent } from './courses.component';
import { CoursesListComponent } from './courses-list/courses-list.component';
import { SharedModule } from "../../shared/shared.module";
import { CourseInfoModule } from "../course-info/course-info.module";



@NgModule({
  declarations: [
    CoursesComponent,
    CoursesListComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    CourseInfoModule
],
  exports: [CoursesComponent]
})
export class CoursesModule { }
