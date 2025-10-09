import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms'; 
import { CoursesRoutingModule } from './courses-routing.module'; 

import { CourseCardComponent } from '@app/shared/components/course-card/course-card.component'; 
import { CourseComponent } from '@app/shared/components/course-form/course-form.component'; 
import { CourseInfoComponent } from '@app/features/course-info/course-info.component'; 

@NgModule({
  declarations: [
    CourseCardComponent,
    CourseComponent,
    CourseInfoComponent,
  ],
  imports: [
    CommonModule,
    CoursesRoutingModule,
    FormsModule,
    ReactiveFormsModule,
  ],
  exports: [
    CourseCardComponent 
  ]
})
export class CoursesModule { }
