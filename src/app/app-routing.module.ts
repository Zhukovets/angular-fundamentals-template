import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthorizedGuard } from './auth/guards/authorized.guard';
import { NotAuthorizedGuard } from './auth/guards/not-authorized.guard';

export const routes: Routes = [
    {
        path: 'login',
        loadChildren: () => import('./shared/components/login-form/login.module').then(m => m.LoginModule),
        canActivate: [NotAuthorizedGuard],  
    },
    {
        path: 'registration',
        loadChildren: () => import('./shared/components/registration-form/registration.module').then(m => m.RegistrationModule),
        canActivate: [NotAuthorizedGuard],
    },
    {
        path: 'courses',
        loadChildren: () => import('./shared/components/course-card/course.module').then(m => m.CourseModule),
        canActivate: [AuthorizedGuard],  
    },
    {
        path: 'courses/add',
        loadChildren: () => import('./shared/components/course-form/add-course.module').then(m => m.AddCourseModule),
        canActivate: [AuthorizedGuard],  
    },
    {
        path: 'courses/:id',
        loadChildren: () => import('./shared/components/info/view-course.module').then(m => m.ViewCourseModule),
        canActivate: [AuthorizedGuard],  
    },
    {
        path: 'courses/edit/:id',
        loadChildren: () => import('./shared/components/button/edit-course.module').then(m => m.EditCourseModule),
        canActivate: [AuthorizedGuard],  
    },
    {
        path: '',
        redirectTo: 'courses',  
        pathMatch: 'full',
    },
    {
        path: '**',
        redirectTo: 'courses',  
    }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }