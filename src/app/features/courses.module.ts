import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { CoursesComponent } from './courses/courses.component';
import { CoursesListComponent } from './courses/courses-list/courses-list.component';
import { SharedModule } from '../shared/shared.module';

@NgModule({
  declarations: [
    CoursesComponent,
    CoursesListComponent,
  ],
  imports: [
    CommonModule,
    FormsModule,
    SharedModule,
  ],
  exports: [
    CoursesComponent,
    CoursesListComponent 
  ]
})
export class CoursesModule {}