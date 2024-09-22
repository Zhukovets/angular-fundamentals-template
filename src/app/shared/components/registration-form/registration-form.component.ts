import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {ButtonText} from "@app/models/const";
import { emailValidator } from '@app/shared/directives/email.directive';

@Component({
    selector: 'app-registration-form',
    templateUrl: './registration-form.component.html',
    styleUrls: ['./registration-form.component.scss'],
})
export class RegistrationFormComponent implements OnInit {
    registrationForm!: FormGroup;
    minLengthName: number = 6;
    minLengthPassword: number = 6;

    inputNames: Map<string, boolean> = new Map([
        ["name", false],
        ["email", false],
        ["password", false]
    ]);

     buttonTexts = ButtonText;

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

            email: new FormControl('', [Validators.required, emailValidator()]),
            password: new FormControl('',
                [Validators.required,
                    Validators.minLength(this.minLengthPassword)]),
        });

        //Subscribtions
        this.inputNames.forEach((val, key) => {
            this.registrationForm.controls[key]?.valueChanges.subscribe(value => {
                this.inputNames.set(key, true);
            });
        })
    }
    // Use the names `name`, `email`, `password` for the form controls.
}
