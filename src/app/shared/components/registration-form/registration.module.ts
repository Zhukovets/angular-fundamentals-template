import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RegistrationFormComponent } from '@shared/components/registration-form/registration-form.component';
import { RegistrationRoutingModule } from './registration-routing.module';
import { SharedModule } from '@shared/shared.module';


@NgModule({
    declarations: [RegistrationFormComponent],
    exports: [
        RegistrationFormComponent
    ],
    imports: [
        CommonModule,
        RegistrationRoutingModule,
        SharedModule
    ]
})
export class RegistrationModule { }