import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';

import { LoginFormComponent } from '@app/shared/components/login-form/login-form.component';
import { SharedModule } from '@app/shared/shared.module';

const routes: Routes = [
  { path: '', component: LoginFormComponent }
];

@NgModule({
  declarations: [
    //LoginFormComponent 
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    SharedModule
  ],
})
export class LoginModule { }
