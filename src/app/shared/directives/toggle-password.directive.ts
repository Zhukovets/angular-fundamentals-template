import { Directive, HostBinding } from '@angular/core';

@Directive({
  selector: '[appTogglePassword]',
  exportAs: 'togglePassword'
})
export class TogglePasswordDirective {
  private isPasswordVisible: boolean = false;

  @HostBinding('attr.type') inputType: string = 'password';

  toggleVisibility() {
    this.isPasswordVisible = !this.isPasswordVisible;
    this.inputType = this.isPasswordVisible ? 'text' : 'password';
  }

  isVisible(): boolean {
    return this.isPasswordVisible;
  }
}

