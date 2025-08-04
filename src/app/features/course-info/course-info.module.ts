import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { SharedModule } from "../../shared/shared.module";
import { CourseInfoComponent } from "./course-info.component";

@NgModule({
  declarations: [CourseInfoComponent],
  imports: [CommonModule, SharedModule],
  exports: [CourseInfoComponent],
})
export class CourseInfoModule {}
