import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CoursesListComponent } from './courses-list/courses-list.component';
import { SharedModule } from '@app/shared/shared.module';
import {CoursesComponent} from "@features/courses/courses.component";

@NgModule({
    declarations: [
        CoursesListComponent,
        CoursesComponent
    ],
    imports: [
        CommonModule,
        SharedModule
    ],
    exports: [
        CoursesListComponent,
        CoursesComponent
    ]
})
export class CoursesModule { }