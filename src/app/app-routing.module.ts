import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthorizedGuard } from '@app/auth/guards/authorized.guard';

const routes: Routes = [
  { path: '', redirectTo: 'courses', pathMatch: 'full' },

  { path: 'courses', loadChildren: () =>
      import('./features/courses.module').then(m => m.CoursesModule),  canLoad: [AuthorizedGuard]},
  { path: 'auth', loadChildren: () =>
      import('./auth/auth.module').then(m => m.AuthModule) },

  { path: 'login', redirectTo: 'auth/login', pathMatch: 'full' },
  { path: 'registration', redirectTo: 'auth/registration', pathMatch: 'full' },

  { path: '**', redirectTo: 'courses' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
