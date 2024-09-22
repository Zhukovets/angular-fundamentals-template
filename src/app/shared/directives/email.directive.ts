import { Directive } from "@angular/core";
import { AbstractControl, NG_VALIDATORS, ValidationErrors } from "@angular/forms";

@Directive({
    selector: '[emailValidator]',
    providers: [{
        provide: NG_VALIDATORS,
        useExisting: EmailValidatorDirective,
        multi: true,
       }]
})
export class EmailValidatorDirective {
    private emailRegex: RegExp = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;

    validate(control: AbstractControl): ValidationErrors | null {
        const value = control.value;
        
        if (!value) {
            return null; 
        }

        const isValid = this.emailRegex.test(value);

        return isValid ? null : { 'emailInvalid': true };
    }
}

