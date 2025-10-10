import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AuthorizedGuard } from './auth/guards/authorized.guard';
import { NotAuthorizedGuard } from './auth/guards/not-authorized.guard';

export const routes: Routes = [
  {
    path: 'login',
    loadChildren: () => import('./login/login.module').then(m => m.LoginModule),
    canActivate: [NotAuthorizedGuard] 
  },
  {
    path: 'registration',
    loadChildren: () => import('./registration/registration.module').then(m => m.RegistrationModule),
    canActivate: [NotAuthorizedGuard] 
  },
  {
    path: 'courses',
    loadChildren: () => import('./store/courses/courses.module').then(m => m.CoursesModule),
    canLoad: [AuthorizedGuard] 
  },
  {
    path: '',
    redirectTo: 'courses',
    pathMatch: 'full'
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
