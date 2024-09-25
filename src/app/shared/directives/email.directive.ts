import { Directive } from '@angular/core';

import {
  AbstractControl,
  NG_VALIDATORS,
  ValidationErrors,
  Validator,
} from '@angular/forms';
@Directive({
  selector: '[emailValidator]',
  providers: [
    {
      provide: NG_VALIDATORS,
      useExisting: EmailValidatorDirective,
      multi: true,
    },
  ],
})
export class EmailValidatorDirective implements Validator {
  // Add your code here

  private emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  validate(control: AbstractControl): ValidationErrors | null {
    const emailValue = control.value;
    if (!emailValue) {
      return null;
    }
    const isValid = this.emailPattern.test(emailValue);

    return isValid ? null : { invalidEmail: true };
  }
}
// emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

// validate(control: AbstractControl): ValidationErrors | null {
//   return this.forbiddenName
//     ? forbiddenNameValidator(new RegExp(this.forbiddenName, 'i'))(control)
//     : null;
// }
