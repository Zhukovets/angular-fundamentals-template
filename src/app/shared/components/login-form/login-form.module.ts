import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { RouterModule, Routes } from "@angular/router";
import { LoginFormComponent } from "./login-form.component";
import { SharedModule } from "@app/shared/shared.module";

const routes: Routes = [
  {
    path: "",
    component: LoginFormComponent,
  },
];

@NgModule({
  declarations: [],
  imports: [SharedModule, CommonModule, RouterModule.forChild(routes)],
})
export class LoginFormModule {}
