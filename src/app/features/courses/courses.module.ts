import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { FormsModule } from "@angular/forms";
import { RouterModule, Routes } from "@angular/router";
import { CoursesComponent } from "./courses.component";

const routes: Routes = [{ path: "", component: CoursesComponent }];

@NgModule({
  declarations: [CoursesComponent],
  imports: [CommonModule, FormsModule, RouterModule.forChild(routes)],
})
export class CoursesModule {}
