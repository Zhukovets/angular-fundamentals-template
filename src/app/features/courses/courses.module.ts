import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CoursesComponent } from './courses.component';
import { SharedModule } from "@app/shared/shared.module";
import { CoursesListComponent } from './courses-list/courses-list.component';



@NgModule({
  declarations: [
    CoursesComponent,
    CoursesListComponent
  ],
  imports: [
    CommonModule,
    SharedModule
  ],
  exports: [
    CoursesComponent,
    CoursesListComponent
  ]
})
export class CoursesModule { }
