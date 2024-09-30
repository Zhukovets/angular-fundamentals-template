import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {LoginFormComponent} from '@shared/components/login-form/login-form.component';
import {LoginRoutingModule} from './login-routing.module';
import {SharedModule} from '@shared/shared.module';
import {AuthService} from "@app/auth/services/auth.service";
import { HttpClientModule } from '@angular/common/http';

@NgModule({
    declarations: [LoginFormComponent],
    exports: [
        LoginFormComponent
    ],
    imports: [
        CommonModule,
        LoginRoutingModule,
        SharedModule,
        HttpClientModule
    ],
    providers:[AuthService]
})
export class LoginModule {
}