import { Directive, HostBinding } from "@angular/core";

@Directive({
  selector: "[togglePassword]",
  exportAs: "togglePassword",
})
export class TogglePasswordDirective {
  private isVisible = false;

  @HostBinding("attr.type") get inputType() {
    return this.isVisible ? "text" : "password";
  }

  toggle() {
    this.isVisible = !this.isVisible;
  }

  get visible(): boolean {
    return this.isVisible;
  }
}
