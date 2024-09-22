import {Component, ViewChild } from '@angular/core';
import {NgForm} from '@angular/forms';
import {ButtonIcon, ButtonText} from 'src/app/models/const'

@Component({
    selector: 'app-login-form',
    templateUrl: './login-form.component.html',
    styleUrls: ['./login-form.component.scss'],
})
export class LoginFormComponent  {
    @ViewChild('loginForm', {static: false}) //by default
    loginForm!: NgForm;
    buttonTexts = ButtonText;
    buttonIcon = ButtonIcon;
    inputPasswordChanged: boolean = false;
    inputEmailChanged: boolean = false;

    //Use the names `email` and `password` for form controls

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

    onSubmit() {
        if (this.loginForm.valid) {
            console.log('Form Submitted!', this.loginForm.value);
        }
    }
}
