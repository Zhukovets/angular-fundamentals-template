import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { CoursesComponent } from "./courses.component";
import { CourseInfoComponent } from "../../features/course-info/course-info.component";
import { CourseFormComponent } from "../../shared/components/course-form/course-form.component";
import { AuthorizedGuard } from "../../auth/guards/authorized.guard";
import { AdminGuard } from "../../user/guards/admin.guard";

const routes: Routes = [
  {
    path: "add",
    component: CourseFormComponent,
    canActivate: [AuthorizedGuard, AdminGuard],
  },
  {
    path: "edit/:id",
    component: CourseFormComponent,
    canActivate: [AuthorizedGuard, AdminGuard],
  },
  {
    path: ":id",
    component: CourseInfoComponent,
    canActivate: [AuthorizedGuard],
  },
  { path: "", component: CoursesComponent, canActivate: [AuthorizedGuard] },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CoursesRoutingModule {}
