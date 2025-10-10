import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms'; 
import { CoursesRoutingModule } from './courses-routing.module'; 

import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { reducers, effects } from '@app/store'; 
//import { CourseCardComponent } from '@app/shared/components/course-card/course-card.component'; 
//import { CourseComponent } from '@app/shared/components/course-form/course-form.component'; 
import { CourseInfoComponent } from '@app/features/course-info/course-info.component'; 
import { SharedModule } from '@app/shared/shared.module';

@NgModule({
  declarations: [
    //CourseCardComponent,
    //CourseComponent,
    CourseInfoComponent,
  ],
  imports: [
    CommonModule,
    CoursesRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    SharedModule,

    StoreModule.forFeature('courses', reducers), 
    EffectsModule.forFeature(effects),
  ],
  exports: [ 
  ]
})
export class CoursesModule { }
