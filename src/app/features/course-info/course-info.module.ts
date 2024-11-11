import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CourseInfoComponent } from '@features/course-info/course-info.component';
import { SharedModule } from '@app/shared/shared.module';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
  {
    path: 'courses/:id',
    component: CourseInfoComponent
  }
]

@NgModule({
  declarations: [CourseInfoComponent],
  imports: [
    CommonModule,
    SharedModule,
    RouterModule.forChild(routes)
  ],
  exports: [
    CourseInfoComponent,
    RouterModule
  ]
})
export class CourseInfoModule { }
