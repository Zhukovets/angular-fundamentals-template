import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { NotAuthorizedGuard } from './auth/guards/not-authorized.guard';
import { AuthorizedGuard } from './auth/guards/authorized.guard';
import { AdminGuard } from './user/guards/admin.guard';
import { CourseFormComponent, LoginFormComponent, RegistrationFormComponent } from './shared/components';
import { CoursesComponent } from './features/courses/courses.component';
import { CourseInfoComponent } from './features/course-info/course-info.component';

const routes: Routes = [
    {
      path: 'login',
      component: LoginFormComponent,
      canActivate: [NotAuthorizedGuard]
    },
    {
      path: 'registration',
      component: RegistrationFormComponent,
      canActivate: [NotAuthorizedGuard]
    },
    {
      path: 'courses',
      component: CoursesComponent,
      canLoad: [AuthorizedGuard]
    },
    {
      path: 'courses/add',
      component: CourseFormComponent,
      canLoad: [AuthorizedGuard],
      canActivate: [AdminGuard]
    },
    {
      path: 'courses/:id',
      component: CourseInfoComponent,
      canLoad: [AuthorizedGuard]
    },
    {
      path: 'courses/edit/:id',
      component: CourseFormComponent,
      canLoad: [AuthorizedGuard],
      canActivate: [AdminGuard]
    },
    { 
      path: '**',
      redirectTo: '/courses' ,
      pathMatch: 'full',
      canLoad: [AuthorizedGuard]
    }
  ];

  @NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
  })
  export class AppRoutingModule {}