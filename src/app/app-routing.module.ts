import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

export const routes: Routes = [
    {
      path: 'login',
      loadChildren: () => import('./shared/shared.module').then(m => m.SharedModule)
    },
    {
      path: 'registration',
      loadChildren: () => import('./shared/shared.module').then(m => m.SharedModule)
    },
    {
        path: 'courses',
        loadChildren: () => import('./shared/shared.module').then(m => m.SharedModule),
        children: [
          { path: 'add', loadChildren: () => import('./shared/shared.module').then(m => m.SharedModule) },
          { path: ':id', loadChildren: () => import('./shared/shared.module').then(m => m.SharedModule) },
          { path: 'edit/:id', loadChildren: () => import('./shared/shared.module').then(m => m.SharedModule) }
        ]
      },
    {
      path: '',
      redirectTo: '/courses',
      pathMatch: 'full'
    },
    {
      path: '**',
      redirectTo: '/courses'
    }
  ];

  @NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
  })
  export class AppRoutingModule {}