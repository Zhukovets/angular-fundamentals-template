import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginFormComponent } from './shared/components/login-form/login-form.component';
import { RegistrationFormComponent } from './shared/components/registration-form/registration-form.component';

const routes: Routes = [
  { path: 'login', component: LoginFormComponent },
  { path: 'registration', component: RegistrationFormComponent },
  { path: '', redirectTo: 'login', pathMatch: 'full' }, 
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
