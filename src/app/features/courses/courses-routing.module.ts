import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CoursesComponent } from './courses.component';
import { CourseInfoComponent } from '../course-info/course-info.component'

const routes: Routes = [
    { path: '', component: CoursesComponent },
    { path: ':id', component: CourseInfoComponent }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class CoursesRoutingModule { }