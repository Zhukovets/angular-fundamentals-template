import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { CourseFormComponent } from '../course-form/course-form.component'; 
@NgModule({
  declarations: [CourseFormComponent],
  imports: [
    CommonModule,
    RouterModule.forChild([{ path: '', component: CourseFormComponent }])
  ]
})
export class CourseModule { }