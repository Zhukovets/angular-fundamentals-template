import { Directive } from '@angular/core';
import { EmailValidatorDirective } from './email.directive';
import { AbstractControl, NG_VALIDATORS, ValidationErrors, Validator } from '@angular/forms';

@Directive({
  selector: '[latinLetterValidator]',
  providers: [{
    provide: NG_VALIDATORS,
    useExisting: LatinletterValidatorDirective,
    multi: true,
  }]
})
export class LatinletterValidatorDirective implements Validator{
  validate(control: AbstractControl): ValidationErrors | null {
    const latinLetterPattern = /^[a-zA-Z0-9 ]+$/;

    if (!control.value && control.value.length <= 1) {
      return { 'invalidLetter': true };
    }

    if(control.value && !latinLetterPattern.test(control.value)){
      return { 'invalidLetter': true };
    }
    return null;
  }

}
