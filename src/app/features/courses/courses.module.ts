import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CoursesListComponent } from './courses-list/courses-list.component';
import { SharedModule } from '@app/shared/shared.module';
import {CoursesComponent} from "@features/courses/courses.component";
import { CoursesRoutingModule } from './courses-routing.module';

@NgModule({
    declarations: [
        CoursesListComponent,
        CoursesComponent
    ],
    imports: [
        CommonModule,
        SharedModule,
        CoursesRoutingModule
    ],
    exports: [
        CoursesListComponent,
        CoursesComponent
    ]
})
export class CoursesModule { }