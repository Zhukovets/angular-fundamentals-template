import { Directive, HostBinding } from "@angular/core";

@Directive({
  selector: "[togglePassword]",
  exportAs: "togglePassword",
})
export class TogglePasswordDirective {
  private isPasswordVisible = false;

  @HostBinding("attr.type") inputType = "password";

  get visible(): boolean {
    return this.isPasswordVisible;
  }

  toggle(): void {
    this.isPasswordVisible = !this.isPasswordVisible;
    this.inputType = this.isPasswordVisible ? "text" : "password";
  }
}
