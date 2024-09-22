import { Directive } from "@angular/core";
import { AbstractControl, NG_VALIDATORS, Validator, ValidatorFn } from '@angular/forms';

const emailRegex: ValidatorFn = (control: AbstractControl) => {
    const emailPattern = /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/;
    const valid = emailPattern.test(control.value);
    return valid ? null : { invalidEmail: true };
};

@Directive({
    selector: '[emailValidator]',
    providers: [{
        provide: NG_VALIDATORS,
        useExisting: EmailValidatorDirective,
        multi: true
      }]
})
export class EmailValidatorDirective implements Validator {
    validate(control: AbstractControl): { [key: string]: any } | null {
        return control.value ? emailRegex(control) : null;
    }
}
