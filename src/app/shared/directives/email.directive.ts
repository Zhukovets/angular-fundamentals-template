import { Directive } from "@angular/core";
import {AbstractControl, NG_VALIDATORS, ValidationErrors, Validator} from "@angular/forms";

@Directive({
    selector: '[emailValidator]',
    providers: [
        {
            provide: NG_VALIDATORS,
            useExisting: EmailValidatorDirective,
            multi: true
        }
    ]
})
export class EmailValidatorDirective implements Validator {
    // Add your code here
    validate(control: AbstractControl): ValidationErrors | null {
        const value = control.value;
        const emailRegex = /^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/;

        if (!value) return null;

        return emailRegex.test(value) ? null : { invalidEmail: true };
    }
}
