import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { NotAuthorizedGuard } from './auth/guards/not-authorized.guard';
import { AuthorizedGuard } from './auth/guards/authorized.guard';
import { AdminGuard } from './user/guards/admin.guard';


export const routes: Routes = [
    { 
        path: 'login',
        loadChildren: () => import('./shared/shared.module').then(m => m.SharedModule),
        canActivate: [NotAuthorizedGuard]
    },
    { 
        path: 'registration',
        loadChildren: () => import('./shared/shared.module').then(m => m.SharedModule),
        canActivate: [NotAuthorizedGuard]
    },
    {
        path: 'courses',
        loadChildren: () => import('./features/courses/courses-list/courses-list.module').then(m => m.CoursesListModule),
        canLoad: [AuthorizedGuard]
    },
    {
        path: 'courses/:id',
        loadChildren: () => import('./features/course-info/course-info.module').then(m => m.CourseInfoModule),
        canLoad: [AuthorizedGuard]
    },
    {
        path: 'courses/add',
        loadChildren: () => import('./shared/shared.module').then(m => m.SharedModule),
        canLoad: [AuthorizedGuard],
        canActivate: [AdminGuard]
    },
    {
        path: 'courses/edit/:id',
        loadChildren: () => import('./shared/shared.module').then(m => m.SharedModule),
        canLoad: [AuthorizedGuard],
        canActivate: [AdminGuard]
    },
    {
        path: '',
        redirectTo: 'courses',
        pathMatch: 'full'
    },
    {
        path: '**',
        redirectTo: 'courses',
        pathMatch: 'full'
    }
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
  })
export class AppRoutingModule {}