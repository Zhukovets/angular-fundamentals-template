import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CoursesComponent } from './courses.component';
import { CoursesListComponent } from './courses-list/courses-list.component';
import { SharedModule } from '@app/shared/shared.module';
import { CoursesRoutingModule } from './courses-routing.module';

@NgModule({
  declarations: [
    CoursesComponent,
    CoursesListComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    CoursesRoutingModule
  ],
  exports: [
    CoursesComponent,
    CoursesListComponent
  ]
})
export class CoursesModule { }
