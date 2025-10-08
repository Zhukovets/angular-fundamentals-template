import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { FormsModule } from "@angular/forms";
import { RouterModule, Routes } from "@angular/router";
import { CoursesComponent } from "./courses.component";
import { CoursesListComponent } from "./courses-list/courses-list.component";
import { SharedModule } from "@shared/shared.module";

const routes: Routes = [{ path: "", component: CoursesComponent }];

@NgModule({
  declarations: [CoursesComponent, CoursesListComponent],
  imports: [CommonModule, FormsModule, SharedModule, RouterModule.forChild(routes)],
})
export class CoursesModule {}
