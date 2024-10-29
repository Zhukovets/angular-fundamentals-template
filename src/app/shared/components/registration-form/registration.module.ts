import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { RegistrationFormComponent } from './registration-form.component';
@NgModule({
  declarations: [RegistrationFormComponent],
  imports: [
    CommonModule,
    RouterModule.forChild([{ path: '', component: RegistrationFormComponent }])
  ]
})
export class RegistrationModule { }