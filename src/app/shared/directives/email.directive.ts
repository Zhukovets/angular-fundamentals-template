import { Directive } from "@angular/core";
import { Validator } from "@angular/forms";

@Directive({
    selector: '[emailValidator]',
    providers: [/*Add your code here*/]
})
export class EmailValidatorDirective implements Validator {
    // Add your code here
}
