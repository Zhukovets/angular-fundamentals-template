import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { CoursesComponent } from "./courses.component";
import { CourseInfoComponent } from "../../features/course-info/course-info.component";
import { CourseFormComponent } from "../../shared/components/course-form/course-form.component";
import { authorizedGuard } from "../../auth/guards/authorized.guard";
import { AdminGuard } from "../../user/guards/admin.guard";

const routes: Routes = [
  { path: "", component: CoursesComponent, canActivate: [authorizedGuard] },
  { path: "add", component: CourseFormComponent, canActivate: [authorizedGuard, AdminGuard] },
  { path: "edit/:id", component: CourseFormComponent, canActivate: [authorizedGuard, AdminGuard] },
  { path: ":id", component: CourseInfoComponent, canActivate: [authorizedGuard] } 
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CoursesRoutingModule {}
