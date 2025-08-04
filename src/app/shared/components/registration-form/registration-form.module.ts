import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { RouterModule, Routes } from "@angular/router";
import { RegistrationFormComponent } from "./registration-form.component";
import { SharedModule } from "@app/shared/shared.module";

const routes: Routes = [
  {
    path: "",
    component: RegistrationFormComponent,
  },
];

@NgModule({
  declarations: [],
  imports: [SharedModule, CommonModule, RouterModule.forChild(routes)],
})
export class RegistrationFormModule {}
