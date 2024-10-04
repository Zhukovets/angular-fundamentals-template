import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import {
  CourseCardComponent,
  CourseFormComponent,
  LoginFormComponent,
  RegistrationFormComponent,
} from "./shared/components";
import { CoursesComponent } from "./features/courses/courses.component";
import { CourseInfoComponent } from "./features/course-info/course-info.component";

// Import guards
import { AuthorizedGuard } from "./auth/guards/authorized.guard";
import { NotAuthorizedGuard } from "./auth/guards/not-authorized.guard";
import { AdminGuard } from "./user/guards/admin.guard";

export const routes: Routes = [
  // Protect the login and registration routes with the NotAuthorizedGuard
  {
    path: "login",
    component: LoginFormComponent,
    canActivate: [NotAuthorizedGuard],
  },
  {
    path: "registration",
    component: RegistrationFormComponent,
    canActivate: [NotAuthorizedGuard],
  },
  // Protect courses-related routes with the AuthorizedGuard
  {
    path: "courses",
    component: CoursesComponent,
    canLoad: [AuthorizedGuard],
  },
  {
    path: "courses/add",
    component: CourseFormComponent,
    canActivate: [AdminGuard],
  },
  {
    path: "courses/:id",
    component: CourseInfoComponent,
    canActivate: [AuthorizedGuard],
  },
  {
    path: "courses/edit/:id",
    component: CourseCardComponent,
    canActivate: [AdminGuard],
  },
  // Default and wildcard routes
  { path: "", redirectTo: "/courses", pathMatch: "full" }, // Default/fallback route
  { path: "**", redirectTo: "/courses", pathMatch: "full" }, // Wildcard route to handle unknown URLs
];

@NgModule({
  imports: [RouterModule.forRoot(routes)], // Ensure RouterModule is imported here
  exports: [RouterModule], // Export RouterModule to make router directives available
})
export class AppRoutingModule {}
