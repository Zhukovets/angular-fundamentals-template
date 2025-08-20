import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CourseInfoComponent } from './course-info.component';
import {SharedModule} from "@shared/shared.module";

@NgModule({
    declarations: [CourseInfoComponent],
    imports: [CommonModule, SharedModule],
    exports: [CourseInfoComponent]
})

export class CourseInfoModule { }
