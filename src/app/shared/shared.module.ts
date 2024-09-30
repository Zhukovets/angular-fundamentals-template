import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FontAwesomeModule} from '@fortawesome/angular-fontawesome';
import {ModalComponent} from './components/modal/modal.component';
import {
    HeaderComponent,
    ButtonComponent,
    InfoComponent,
    SearchComponent,
    CourseCardComponent
} from "./components";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {DurationPipe} from './pipes/duration.pipe';
import {CustomDatePipe} from './pipes/custom-date.pipe';
import {TogglePasswordDirective} from '@shared/directives/password.directive';
import {EmailValidatorDirective} from '@shared/directives/email.directive';
import {RouterLink} from '@angular/router';
import { HttpClientModule } from '@angular/common/http';

const components = [
    HeaderComponent,
    ButtonComponent,
    InfoComponent,
    SearchComponent,
    ModalComponent,
    CourseCardComponent,
    DurationPipe,
    CustomDatePipe,
    TogglePasswordDirective,
    EmailValidatorDirective
];

@NgModule({
    declarations: [components],
    imports: [
        CommonModule,
        FontAwesomeModule,
        FormsModule,
        ReactiveFormsModule,
        RouterLink,
        HttpClientModule
    ],
    exports: [
        components,
        CommonModule,
        FormsModule,
        ReactiveFormsModule,
        FontAwesomeModule,
        HttpClientModule
    ]
})
export class SharedModule {
}
