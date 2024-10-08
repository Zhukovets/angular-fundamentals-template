import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CoursesComponent } from './courses.component';
import { CoursesListComponent } from './courses-list/courses-list.component';
import { SharedModule } from '@app/shared/shared.module';
import { AuthorPipe } from '@app/shared/pipes/authorIdToName.pipe';

@NgModule({
  declarations: [
    CoursesComponent,
    CoursesListComponent,
    AuthorPipe
  ],
  imports: [
    CommonModule,
    SharedModule,
  ],
  exports: [
    CoursesComponent,
    CoursesListComponent,
    AuthorPipe
  ]
})
export class CoursesModule { }
