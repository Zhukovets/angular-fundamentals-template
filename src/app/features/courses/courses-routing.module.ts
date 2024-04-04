import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CourseFormComponent } from '@app/shared/components';
import { CourseInfoComponent } from '../course-info/course-info.component';
import { CoursesComponent } from './courses.component';
import { CourseListComponent } from './courses-list/courses-list.component';
import { AuthorizedGuard } from '@app/auth/guards/authorized.guard';
import { AdminGuard } from '@app/user/guards/admin.guard';

const routes: Routes = [
  /* Add your code here */
  {
    path: '',
    component: CoursesComponent,
    canActivate: [AuthorizedGuard],
    children: [
      {
        path: '', component: CourseListComponent,
      },
      {
        path: 'add', component: CourseFormComponent,
        canActivate: [AdminGuard],
      },
      {
        path: ':id', component: CourseInfoComponent,
        canActivate: [AuthorizedGuard],
      },
      {
        path: 'edit/:id', component: CourseFormComponent,
        canActivate: [AdminGuard],
      }
    ]
  }
];

@NgModule({
  imports: [
    RouterModule.forChild(routes)
  ],
  exports: [
    RouterModule
  ]
})
export class CoursesRoutingModule { }