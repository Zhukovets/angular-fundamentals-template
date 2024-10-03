import {Component, ViewChild, OnDestroy, EventEmitter} from '@angular/core';
import {NgForm} from '@angular/forms';
import {ButtonText} from 'src/app/models/const'
import {AuthService} from '@app/auth/services/auth.service';
import {LoginData, LoginResponse} from '@app/models/card.model';
import {Router} from '@angular/router';
import {Subject, take, debounceTime} from 'rxjs';
import {UserStoreService} from '@app/user/services/user-store.service';


@Component({
    selector: 'app-login-form',
    templateUrl: './login-form.component.html',
    styleUrls: ['./login-form.component.scss'],
})
export class LoginFormComponent {
    @ViewChild('loginForm', {static: false})
    loginForm!: NgForm;
    buttonTexts = ButtonText;
    inputPasswordChanged: boolean = false;
    inputEmailChanged: boolean = false;


    private destroy$ = new Subject<void>();  //for managing subscriptions

    onSubmitForm(e: any) {
        this.loginForm.ngSubmit.emit(this.loginForm);
    }

    constructor(private auth: AuthService, private router: Router, private userStoreService: UserStoreService) {
    }

    get inputPassword() {
        return this.inputPasswordChanged
    }

    get inputEmail() {
        return this.inputEmailChanged
    }

    onInputPasswordChange() {
        this.inputPasswordChanged = true; // Show errors
    }

    onInputEmailChange() {
        this.inputEmailChanged = true; // Show errors
    }

    onSubmit(): void {
        const user: LoginData = {
            email: this.loginForm.value.email,
            password: this.loginForm.value.password
        };
        this.auth.login(user).subscribe({
            next: (response: LoginResponse) => {
                if (response.successful) {
                    this.userStoreService.getUser();
                    this.userStoreService.isAdmin$.pipe(
                        debounceTime(400),
                        take(1)
                    ).subscribe({
                        next: (response) => {
                            this.userStoreService.isAdmin = response;
                        },
                        error: (err) => {
                            console.error('Error fetching admin status:', err);
                        }
                    });
                    this.router.navigate(['/courses']);
                }
            },
            error: (err) => {
                console.error('Error during login:', err.message);
            }
        });
    }
}
