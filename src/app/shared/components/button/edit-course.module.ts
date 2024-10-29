import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { ButtonComponent } from './button.component'; 

@NgModule({
  declarations: [ButtonComponent],
  imports: [
    CommonModule,
    RouterModule.forChild([{ path: '', component: ButtonComponent }])
  ]
})
export class EditCourseModule { }