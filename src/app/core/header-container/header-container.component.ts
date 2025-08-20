import {Component, inject, OnInit} from '@angular/core';
import {Router} from "@angular/router";
import {AuthService} from "@auth/services/auth.service";
import {UserStoreService} from "@app/user/services/user-store.service";
import {Observable} from "rxjs";
import {ROUTE_NAMES} from "@app/app-routing.module";

@Component({
    selector: 'app-header-container',
    templateUrl: './header-container.component.html',
    styleUrls: ['./header-container.component.css']
})
export class HeaderContainerComponent implements OnInit {
    private router = inject(Router);
    private authService = inject(AuthService);
    private userService = inject(UserStoreService);

    name$?: Observable<string | null>;

    ngOnInit(): void {
        this.name$ = this.userService.name$;
    }

    logout(): void {
       this.authService.logout();
       this.navigateToLogin();
    }

    navigateToLogin(): void {
        this.router.navigate([`/${ROUTE_NAMES.AUTH}/${ROUTE_NAMES.LOGIN}`]);
    }

    get isAuthPage(): boolean {
        return ['/auth/login', '/auth/registration'].includes(this.router.url);
    }
}
