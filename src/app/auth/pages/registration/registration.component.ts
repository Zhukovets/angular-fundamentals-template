import {Component, inject} from '@angular/core';
import {AuthService} from "@auth/services/auth.service";
import {Router} from "@angular/router";
import {INewUser} from "@app/interfaces/user/user-item.interface";
import {ROUTE_NAMES} from "@app/app-routing.module";

@Component({
    selector: 'app-registration',
    templateUrl: './registration.component.html',
    styleUrls: ['./registration.component.css']
})
export class RegistrationComponent {
    private authService = inject(AuthService);
    private router = inject(Router);

    navigateToLogin(): void {
        this.router.navigate([`/${ROUTE_NAMES.AUTH}/${ROUTE_NAMES.LOGIN}`]);
    }

    register(user: INewUser): void {
        this.authService.register(user).subscribe(() => {
                this.navigateToLogin();
            }
        )
    }

}
