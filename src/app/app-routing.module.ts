import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { AuthorizedGuard } from "./auth/guards/authorized.guard";
import { NotAuthorizedGuard } from "./auth/guards/not-authorized.guard";
import { AdminGuard } from "./user/guards/admin.guard";

const routes: Routes = [
  {
    path: "login",
    loadChildren: () =>
      import("./shared/components/login-form/login-form.module").then(
        (m) => m.LoginFormModule
      ),
    canActivate: [NotAuthorizedGuard],
  },
  {
    path: "registration",
    loadChildren: () =>
      import(
        "./shared/components/registration-form/registration-form.module"
      ).then((m) => m.RegistrationFormModule),
    canActivate: [NotAuthorizedGuard],
  },
  {
    path: "courses",
    loadChildren: () =>
      import("./features/courses/courses.module").then((m) => m.CoursesModule),
    canLoad: [AuthorizedGuard],
  },
  {
    path: "courses/add",
    loadChildren: () =>
      import("./shared/components/course-form/course-form.module").then(
        (m) => m.CourseFormModule
      ),
    canLoad: [AuthorizedGuard],
    canActivate: [AdminGuard],
  },
  {
    path: "courses/edit/:id",
    loadChildren: () =>
      import("./shared/components/course-form/course-form.module").then(
        (m) => m.CourseFormModule
      ),
    canLoad: [AuthorizedGuard],
    canActivate: [AdminGuard],
  },
  {
    path: "courses/:id",
    loadChildren: () =>
      import("./features/course-info/course-info.module").then(
        (m) => m.CourseInfoModule
      ),
    canLoad: [AuthorizedGuard],
  },
  {
    path: "",
    redirectTo: "/courses",
    pathMatch: "full",
  },
  {
    path: "**",
    redirectTo: "/courses",
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
