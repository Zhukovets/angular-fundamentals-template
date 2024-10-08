import { Directive } from "@angular/core";
import { NG_VALIDATORS, AbstractControl, Validator } from "@angular/forms";

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
  private emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

  validate(
    control: AbstractControl<string, string>
  ): { emailInvalid: boolean } | null {
    const email = control.value;
    const valid = this.emailRegex.test(email);
    return valid ? null : { emailInvalid: true };
  }
}
