import { Directive } from "@angular/core";
import { AbstractControl, ValidationErrors, Validator, NG_VALIDATORS } from "@angular/forms";

@Directive({
    selector: '[emailValidator]',
    providers: [{ provide: NG_VALIDATORS, useExisting: EmailValidatorDirective, multi: true }]
})
export class EmailValidatorDirective implements Validator {
    // Add your code here
    emailPattern: RegExp = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;

    validate(control: AbstractControl<any, any>): ValidationErrors | null {
        const isValidEmail: boolean = this.emailPattern.test(control.value);
        return isValidEmail ? null
            : { invalidEmail: control.value };
    }
}
