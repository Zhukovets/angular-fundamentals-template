import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CourseFormComponent } from '@shared/components/course-form/course-form.component';

const routes: Routes = [
    { path: '', component: CourseFormComponent }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class CourseFormRoutingModule { }