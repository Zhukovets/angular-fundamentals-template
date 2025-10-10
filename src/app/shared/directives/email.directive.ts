import { Directive, forwardRef } from "@angular/core";
import { Validator, NG_VALIDATORS, FormControl } from "@angular/forms";

@Directive({
  selector: "[appEmailValidator]",
  providers: [
    {
      provide: NG_VALIDATORS,
      useExisting: forwardRef(() => EmailValidatorDirective),
      multi: true,
    },
  ],
})
export class EmailValidatorDirective implements Validator{
  validate(control: FormControl): { [key: string]: any } | null {
    const email = control.value;
    const emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
    if (email && !emailPattern.test(email)) {
        return { 'emailInvalid': true };
    }
    return null;
  }
}
