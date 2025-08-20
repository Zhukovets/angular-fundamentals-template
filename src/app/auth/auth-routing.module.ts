import {RouterModule, Routes} from "@angular/router";
import {NgModule} from "@angular/core";
import {ROUTE_NAMES} from "@app/app-routing.module";
import {LoginComponent} from "@auth/pages/login/login.component";
import {RegistrationComponent} from "@auth/pages/registration/registration.component";

export const routes: Routes = [
    {
        path: ROUTE_NAMES.LOGIN,
        component: LoginComponent
    },
    {
        path: ROUTE_NAMES.REGISTER,
        component: RegistrationComponent
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class AuthRoutingModule {}