import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { ReactiveFormsModule } from "@angular/forms";
import { RouterModule, Routes } from "@angular/router";
import { SharedModule } from "@shared/shared.module";
import { CourseFormComponent } from "./course-form.component";

const routes: Routes = [
  {
    path: "",
    component: CourseFormComponent,
  },
];

@NgModule({
  declarations: [CourseFormComponent],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    SharedModule,
    RouterModule.forChild(routes),
  ],
})
export class CourseFormModule {}
