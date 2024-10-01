import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { NotAuthorizedGuard } from './auth/guards/not-authorized.guard';
import { AuthorizedGuard } from './auth/guards/authorized.guard';
import { AdminGuard } from './user/guards/admin.guard';

const routes: Routes = [
    {
      path: 'login',
      loadChildren: () => import('./shared/shared.module').then(m => m.SharedModule),
      canLoad: [NotAuthorizedGuard]
    },
    {
      path: 'registration',
      loadChildren: () => import('./shared/shared.module').then(m => m.SharedModule),
      canLoad: [NotAuthorizedGuard]
    },
    {
      path: 'courses',
      loadChildren: () => import('./features/courses/courses.module').then(m => m.CoursesModule),
      canActivate: [AuthorizedGuard]
    },
    {
      path: 'courses/add',
      loadChildren: () => import('./shared/shared.module').then(m => m.SharedModule),
      canActivate: [AdminGuard]
    },
    {
      path: 'courses/edit/:id',
      loadChildren: () => import('./shared/shared.module').then(m => m.SharedModule),
      canActivate: [AdminGuard]
    },
    {
      path: 'courses/:id',
      loadChildren: () => import('./shared/shared.module').then(m => m.SharedModule),
      canActivate: [AuthorizedGuard]
    },
    { path: '', redirectTo: '/courses', pathMatch: 'full' },
    { path: '**', redirectTo: '/courses' }
  ];

  @NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
  })
  export class AppRoutingModule {}