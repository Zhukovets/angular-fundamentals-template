import { Directive } from "@angular/core";
import { AbstractControl, NG_VALIDATORS, ValidationErrors, Validator } from "@angular/forms";

const REGEXP = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/;

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
    validate(control: AbstractControl): ValidationErrors | null {
        const email = control.value;
        if (email && !REGEXP.test(email)) {
            //read that this is the conventional way to return a validation error
            return { email: true };
        }
        return null;
    }
}
