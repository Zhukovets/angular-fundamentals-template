import {RouterModule, Routes} from '@angular/router';
import {NgModule} from "@angular/core";
import {NotAuthorizedGuard} from "@app/auth/guards/not-authorized.guard";
import {AuthorizedGuard} from "@app/auth/guards/authorized.guard";
import {AdminGuard} from "@app/user/guards/admin.guard";

export const routes: Routes = [
    {
        path: 'login',
        loadChildren: () => import('@app/shared/components/login-form/login.module')
            .then(m => m.LoginModule)
            .catch((error) => {
                console.error('Error loading CourseFormModule:', error);
                return import('@shared/components/error/error.module').then(m => m.ErrorModule);
            }),
        canActivate: [NotAuthorizedGuard]
    },
    {
        path: 'registration',
        loadChildren: () => import('@app/shared/components/registration-form/registration.module')
            .then(m => m.RegistrationModule)
            .catch((error) => {
                console.error('Error loading RegistrationModule:', error);
                return import('@shared/components/error/error.module').then(m => m.ErrorModule);
            }),
        canActivate: [NotAuthorizedGuard]
    },
    {
        path: 'courses/add',
        loadChildren: () => import('@shared/components/course-form/course.module')
            .then(m => m.CourseFormModule)
            .catch((error) => {
                console.error('Error loading CourseFormModule:', error);
                return import('@shared/components/error/error.module').then(m => m.ErrorModule);
            }),
        canLoad: [AuthorizedGuard],
        canActivate: [AdminGuard]
    },
    {
        path: 'courses/edit/:id',
        loadChildren: () => import('@shared/components/course-form/course.module')
            .then(m => m.CourseFormModule)
            .catch((error) => {
                console.error('Error loading CourseFormModule:', error);
                return import('@shared/components/error/error.module').then(m => m.ErrorModule);
            }),
        canLoad: [AuthorizedGuard],
        canActivate: [AdminGuard]
    },
    {
        path: 'courses',
        loadChildren: () => import('@features/courses/courses.module')
            .then(m => m.CoursesModule)
            .catch((error) => {
                console.error('Error loading CoursesModule:', error);
                return import('@shared/components/error/error.module').then(m => m.ErrorModule);
            }),
        canLoad: [AuthorizedGuard]
    },
    {
        path: 'courses/:id',
        loadChildren: () => import('@features/courses/courses.module')
            .then(m => m.CoursesModule)
            .catch((error) => {
                console.error('Error loading CoursesModule:', error);
                return import('@shared/components/error/error.module').then(m => m.ErrorModule);
            }),
        canLoad: [AuthorizedGuard]
    },
    {
        path: 'error',
        loadChildren: () => import('@shared/components/error/error.module')
            .then(m => m.ErrorModule)
    },

    //by default
    {
        path: '/courses',
        redirectTo: '',
        pathMatch: 'full'
    },
    // Wrong ways
    {
        path: '**',
        redirectTo: '/error'
    }
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})
export class AppRoutingModule {
}