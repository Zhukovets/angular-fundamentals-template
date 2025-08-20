import {Component, inject} from '@angular/core';
import {AuthService} from "@auth/services/auth.service";
import {Router} from "@angular/router";
import {ROUTE_NAMES} from "@app/app-routing.module";
import {IUser} from "@app/interfaces/user/user-item.interface";
import {UserStoreService} from "@app/user/services/user-store.service";
import {switchMap} from "rxjs";

@Component({
    selector: 'app-login',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.css']
})
export class LoginComponent {
    private authService = inject(AuthService);
    private router = inject(Router);
    private userService = inject(UserStoreService);

    navigateToCourses(): void {
        this.router.navigate([ROUTE_NAMES.COURSES]);
    }

    login(user: IUser): void {
        this.authService.login(user)
            .pipe(switchMap(() => this.userService.getUser()))
            .subscribe(() => {
            this.navigateToCourses()
        });
    }
}
