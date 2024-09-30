import {Component, OnInit, OnDestroy} from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {ButtonText} from "@app/models/const";
import {LoginData, LoginResponse, RegisterResponse} from "@app/models/card.model";
import {AuthService} from '@app/auth/services/auth.service';
import {Router} from "@angular/router";
import {Subject, takeUntil} from "rxjs";


@Component({
    selector: 'app-registration-form',
    templateUrl: './registration-form.component.html',
    styleUrls: ['./registration-form.component.scss'],
})
export class RegistrationFormComponent implements OnInit  {
    registrationForm!: FormGroup;
    minLengthName: number = 6;
    minLengthPassword: number = 6;
    buttonTexts = ButtonText;

    //for subscriptions
    valueChangesSubject$ = new Subject<void>();
    registrationSubject$ = new Subject<void>();

    inputNames: Map<string, boolean> = new Map([
        ["name", false],
        ["email", false],
        ["password", false]
    ]);

    constructor(private auth: AuthService, private router: Router) {}

    onSubmitForm(e: any) {
        this.onSubmit();
    }

    get inputName() {
        return this.inputNames.get('name');
    }

    get inputEmail() {
        return this.inputNames.get('email');
    }

    get inputPassword() {
        return this.inputNames.get('password');
    }

    public ngOnInit(): void {
        this.registrationForm = new FormGroup({
            name: new FormControl('',
                [Validators.required,
                    Validators.minLength(this.minLengthName)]),

            email: new FormControl('', [Validators.required]),
            password: new FormControl('',
                [Validators.required,
                    Validators.minLength(this.minLengthPassword)]),
        });

        //Subscriptions
        this.inputNames.forEach((val, key) => {
            this.registrationForm.controls[key]?.valueChanges
                .pipe(
                    takeUntil(this.valueChangesSubject$))
                .subscribe(value => {
                    this.inputNames.set(key, true);
                    this.valueChangesSubject$.next();
                    this.valueChangesSubject$.complete();
                });
        })
    }

    onSubmit(): void {
        const user: LoginData = {
            name: this.registrationForm.value.email,
            email: this.registrationForm.value.email,
            password: this.registrationForm.value.password
        };

        this.auth.register(user)
            .pipe(
                takeUntil(this.registrationSubject$)
            )
            .subscribe({
            next: (response: RegisterResponse) => {
                if (response.successful) {
                    this.router.navigate(['']);
                    this.registrationSubject$.next();
                    this.registrationSubject$.complete();
                }
            },
            error: (err) => {
                console.error('Error during registration:', err.message);
            }
        });
    }
}
