import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { LoginFormComponent } from "./shared/components/login-form/login-form.component";
import { RegistrationFormComponent } from "./shared/components/registration-form/registration-form.component";
import { authorizedGuard } from "./auth/guards/authorized.guard";
import { notAuthorizedGuard } from "./auth/guards/not-authorized.guard";

export const routes: Routes = [
  {
    path: "login",
    component: LoginFormComponent,
    canActivate: [notAuthorizedGuard]
  },
  {
    path: "registration",
    component: RegistrationFormComponent,
    canActivate: [notAuthorizedGuard]
  },
  {
    path: "courses",
    canMatch: [authorizedGuard],
    loadChildren: () =>
      import("./features/courses/courses.module").then((m) => m.CoursesModule)
  },
  { path: "", redirectTo: "/courses", pathMatch: "full" },
  { path: "**", redirectTo: "/courses" }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
