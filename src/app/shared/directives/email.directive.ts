import { Directive } from "@angular/core";
import {
  AbstractControl,
  NG_VALIDATORS,
  ValidationErrors,
  Validator,
  Validators,
} from "@angular/forms";

@Directive({
  selector: "[emailValidator]",
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
  validate(control: AbstractControl): ValidationErrors | null {
    const email = control.value;

    if (typeof email !== "string") return { invalidEmail: true };

    const emailValidation = Validators.email(control);
    if (emailValidation) return { invalidEmail: true };

    return null;
  }
}
