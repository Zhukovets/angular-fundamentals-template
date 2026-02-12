import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import {CoursesRoutingModule} from "./courses-routing.module";

import { CoursesComponent } from './courses/courses.component';
import { CoursesListComponent } from './courses/courses-list/courses-list.component';
import { SharedModule } from '../shared/shared.module';
import { CourseInfoComponent } from './course-info/course-info.component';

@NgModule({
  declarations: [
    CoursesComponent,
    CoursesListComponent,
    CourseInfoComponent,
  ],
  imports: [
    CommonModule,
    FormsModule,
    SharedModule,
    CoursesRoutingModule
  ],
  exports: [
    CoursesComponent,
    CoursesListComponent 
  ]
})
export class CoursesModule {}