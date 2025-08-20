import {NgModule} from '@angular/core';
import {CommonModule, NgOptimizedImage} from '@angular/common';
import {FontAwesomeModule} from '@fortawesome/angular-fontawesome';
import {ModalComponent} from './components/modal/modal.component';
import {
  ButtonComponent,
  CourseCardComponent,
  CourseFormComponent,
  HeaderComponent,
  InfoComponent,
  LoginFormComponent,
  RegistrationFormComponent,
  SearchComponent
} from "./components";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {CustomDatePipe} from './pipes/custom-date.pipe';
import {EmailValidatorDirective} from '@shared/directives/email.directive';
import {DurationPipe} from "@shared/pipes/duration.pipe";
import {isAuthorInList} from "@shared/pipes/is-author-in-list.pipe";
import {RouterLink} from "@angular/router";
import {LoaderComponent} from "@shared/components/loader/loader.component";

const directives = [
  EmailValidatorDirective
];

const pipes = [
  DurationPipe,
  CustomDatePipe,
  isAuthorInList
];

const components = [
  HeaderComponent,
  ButtonComponent,
  InfoComponent,
  SearchComponent,
  ModalComponent,
  CourseCardComponent,
  LoginFormComponent,
  RegistrationFormComponent,
  CourseFormComponent,
  LoaderComponent
];

@NgModule({
  declarations: [components,pipes,directives],
  imports: [
    CommonModule,
    FontAwesomeModule,
    FormsModule,
    ReactiveFormsModule,
    NgOptimizedImage,
    RouterLink
  ],
  exports: [components, pipes]
})
export class SharedModule { }
