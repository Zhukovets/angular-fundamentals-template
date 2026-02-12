import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { CoursesComponent } from './courses/courses.component';
import { CourseFormComponent } from '@app/shared/components';
import { AuthorizedGuard } from '@app/auth/guards/authorized.guard';
import { AdminGuard } from '@app/user/guards/admin.guard';

const routes: Routes = [
  {
    path: '',
    component: CoursesComponent,
    canLoad: [AuthorizedGuard]
  },
  {
    path: 'add',
    component: CourseFormComponent,
    canLoad: [AuthorizedGuard],
    canActivate: [AdminGuard]   
  },
  {
    path: 'edit/:id',
    component: CourseFormComponent,
    canLoad: [AuthorizedGuard],
    canActivate: [AdminGuard]  
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CoursesRoutingModule {}