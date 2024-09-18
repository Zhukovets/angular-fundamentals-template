import { Directive, ElementRef } from '@angular/core';

@Directive({
  selector: '[appTogglePassword]',
  exportAs: 'togglePassword'
})
export class TogglePasswordDirective {
  private isPasswordVisible = false;

  constructor(private el: ElementRef) {}

  togglePassword() {
    const element = this.el.nativeElement;
    element.type = this.isPasswordVisible ? 'password' : 'text';
    this.isPasswordVisible = !this.isPasswordVisible;
  }
}