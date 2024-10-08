import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { FontAwesomeModule } from "@fortawesome/angular-fontawesome";
import { ModalComponent } from "./components/modal/modal.component";
import {
  HeaderComponent,
  ButtonComponent,
  InfoComponent,
  SearchComponent,
  CourseCardComponent,
  LoginFormComponent,
  RegistrationFormComponent,
  CourseFormComponent,
} from "./components";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { DurationPipe } from "./pipes/duration.pipe";
import { CustomDatePipe } from "./pipes/custom-date.pipe";
import { EmailValidatorDirective } from "@shared/directives/email.directive";

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
  EmailValidatorDirective,
];

const pipes = [DurationPipe, CustomDatePipe];

@NgModule({
  declarations: [...components, DurationPipe, EmailValidatorDirective],
  imports: [
    CommonModule,
    CustomDatePipe,
    FontAwesomeModule,
    FormsModule,
    ReactiveFormsModule,
  ],
  exports: [...components, ...pipes],
})
export class SharedModule {}
