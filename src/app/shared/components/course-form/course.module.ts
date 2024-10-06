import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CourseFormRoutingModule } from './course-routing.module';
import {CourseFormComponent} from '@shared/components/course-form/course-form.component';
import { SharedModule } from '@shared/shared.module';

@NgModule({
    declarations: [CourseFormComponent],
    exports: [
        CourseFormComponent
    ],
    imports: [
        CommonModule,
        CourseFormRoutingModule,
        SharedModule
    ]
})

export class CourseFormModule { }