import {RouterModule, Routes} from '@angular/router';
import {NgModule} from "@angular/core";
import {authorizedGuard} from '@auth/guards/authorized.guard';
import {notAuthorizedGuard} from '@auth/guards/not-authorized.guard';

export namespace ROUTE_NAMES {
    export const COURSES = 'courses';
    export const AUTH = 'auth';
    export const LOGIN = 'login';
    export const REGISTER = 'registration';
}

export const routes: Routes = [
    /* Add your code here */
    {
        path: ROUTE_NAMES.AUTH,
        loadChildren: () => import('@auth/auth.module').then(m => m.AuthModule),
        canMatch: [notAuthorizedGuard]
    },
    {
        path: ROUTE_NAMES.COURSES,
        loadChildren: () => import('@features/courses/courses.module').then((m) => m.CoursesModule),
        canMatch: [authorizedGuard]
    },
    {
        path: '',
        pathMatch: 'full',
        redirectTo: ROUTE_NAMES.COURSES,
    },
    {
        path: '**',
        redirectTo: ROUTE_NAMES.COURSES,
    }
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})
export class AppRoutingModule {}