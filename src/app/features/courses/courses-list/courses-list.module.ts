import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CoursesListComponent } from './courses-list.component';
import { SharedModule } from '@app/shared/shared.module';


@NgModule({
  declarations: [
    CoursesListComponent
  ],
  imports: [
    CommonModule,
    SharedModule
  ],
  exports: [
    CoursesListComponent
  ]
})
export class CoursesListModule { }
