import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {LoginComponent} from "@app/auth/pages/login/login.component";
import {RegistrationComponent} from "@app/auth/pages/registration/registration.component";
import {SharedModule} from "@shared/shared.module";
import {AuthRoutingModule} from "@app/auth/auth-routing.module";

const components = [
    LoginComponent,
    RegistrationComponent
];

@NgModule({
    declarations: [components],
    imports: [
        CommonModule,
        SharedModule,
        AuthRoutingModule
    ]
})
export class AuthModule {}
