import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { CourseComponent } from '@app/shared/components/course-form/course-form.component'; 

import { CourseInfoComponent } from '@app/features/course-info/course-info.component';

const routes: Routes = [
  {
    path: '',
    component: CourseInfoComponent, 
  },
  {
    path: 'add',
    component: CourseComponent,
  },
  {
    path: 'edit/:courseId',
    component: CourseComponent,
  },
  {
    path: ':courseId',
    component: CourseInfoComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CoursesRoutingModule {}
