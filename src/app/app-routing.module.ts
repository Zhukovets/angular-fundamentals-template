import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginFormComponent, RegistrationFormComponent } from './shared/components';
import { NotAuthorizedGuard } from './auth/guards/not-authorized.guard';

const routes: Routes = [
    /* Add your code here */
    {
        path: 'login',
        component: LoginFormComponent,
        canActivate: [NotAuthorizedGuard],
    },
    {
        path: 'registration',
        component: RegistrationFormComponent,
        canActivate: [NotAuthorizedGuard],
    },
    {
        path: 'courses',
        loadChildren: () => import('@features/courses/courses.module').then(m => m.CoursesModule),
    },
    {
        path: '',
        redirectTo: 'courses',
        pathMatch: 'full'
    },
];

@NgModule({
    imports: [
        RouterModule.forRoot(routes)
    ],
    exports: [
        RouterModule
    ]
})
export class AppRoutingModule { }