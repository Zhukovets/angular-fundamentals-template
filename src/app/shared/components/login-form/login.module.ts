import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { LoginFormComponent } from './login-form.component';

@NgModule({
  declarations: [LoginFormComponent],  
  imports: [
    CommonModule,
    RouterModule.forChild([
      { path: '', component: LoginFormComponent }
    ])  
  ]
})
export class LoginModule { }