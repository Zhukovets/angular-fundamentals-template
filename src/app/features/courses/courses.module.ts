import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {CoursesComponent} from "@features/courses/courses.component";
import {CoursesListComponent} from "@features/courses/courses-list/courses-list.component";
import {SharedModule} from "@shared/shared.module";
import {AuthorsToNamesPipe} from "@features/courses/pipes/authors-to-names.pipe";
import {CoursesRoutingModule} from "@features/courses/courses-routing.module";
import {CourseInfoModule} from "@features/course-info/course-info.module";
import {CourseDetailsComponent} from './course-details/course-details.component';
import {CourseFormContainerComponent} from './course-form-container/course-form-container.component';

const pipes = [
    AuthorsToNamesPipe
];

const components = [
    CoursesComponent,
    CoursesListComponent,
    CourseDetailsComponent,
    CourseFormContainerComponent,
    CourseFormContainerComponent
]

@NgModule({
    declarations: [pipes, components],
    imports: [CommonModule, SharedModule, CoursesRoutingModule, CourseInfoModule],
    providers: [],
    exports: [CoursesComponent, CoursesListComponent, AuthorsToNamesPipe]
})

export class CoursesModule {
}