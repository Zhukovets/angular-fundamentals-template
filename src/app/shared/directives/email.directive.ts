import { Directive, forwardRef } from "@angular/core";
import {
  AbstractControl,
  NG_VALIDATORS,
  ValidationErrors,
} from "@angular/forms";

@Directive({
  selector: "[emailValidator]",
  providers: [
    {
      provide: NG_VALIDATORS,
      useExisting: forwardRef(() => EmailValidatorDirective),
      multi: true,
    },
  ],
})
export class EmailValidatorDirective {
  // Add your code here
  validate(control: AbstractControl): ValidationErrors | null {
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/; // Basic email pattern
    const valid = emailPattern.test(control.value);
    return valid ? null : { invalidEmail: true }; // Return an error if invalid
  }
}
