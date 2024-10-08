import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { CoursesListComponent } from "./courses-list/courses-list.component";
import { CourseCardComponent } from "../shared/components/course-card/course-card.component";
import { CourseFormComponent } from "../shared/components/course-form/course-form.component";
import { AdminGuard } from "@app/user/guards/admin.guard";

const routes: Routes = [
  {
    path: "",
    component: CoursesListComponent,
    children: [
      {
        path: "add",
        component: CourseFormComponent,
        canActivate: [AdminGuard],
      },
      { path: ":id", component: CourseCardComponent },
      {
        path: "edit/:id",
        component: CourseFormComponent,
        canActivate: [AdminGuard],
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CoursesModule {}
