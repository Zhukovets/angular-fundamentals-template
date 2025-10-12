import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";

import { LoginFormComponent } from "./shared/components/login-form/login-form.component";
import { RegistrationFormComponent } from "./shared/components/registration-form/registration-form.component";
import { CoursesComponent } from "./features/courses/courses.component";
import { CourseInfoComponent } from "./features/course-info/course-info.component";
import { CourseFormComponent } from "./shared/components/course-form/course-form.component";

import { AuthorizedGuard } from "./auth/guards/authorized.guard";
import { NotAuthorizedGuard } from "./auth/guards/not-authorized.guard";
import { AdminGuard } from "./user/guards/admin.guard";

const routes: Routes = [
  {
    path: "login",
    component: LoginFormComponent,
    canActivate: [NotAuthorizedGuard]
  },
  {
    path: "registration",
    component: RegistrationFormComponent,
    canActivate: [NotAuthorizedGuard]
  },
  {
    path: "courses",
    canActivate: [AuthorizedGuard],
    children: [
      { path: "", component: CoursesComponent },
      { path: "add", component: CourseFormComponent, canActivate: [AuthorizedGuard, AdminGuard] },
      { path: "edit/:id", component: CourseFormComponent, canActivate: [AuthorizedGuard, AdminGuard] },
      { path: ":id", component: CourseInfoComponent, canActivate: [AuthorizedGuard] }
    ]
  },
  { path: "", redirectTo: "/courses", pathMatch: "full" },
  { path: "**", redirectTo: "/courses" }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
