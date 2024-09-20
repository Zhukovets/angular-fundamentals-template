import { Directive, ElementRef, HostListener, Input } from "@angular/core";

@Directive({
  selector: "[togglePassword]",
  exportAs: "togglePassword",
})
export class TogglePasswordDirective {
  private isVisible: boolean = false;

  constructor(private el: ElementRef) {}

  toggle() {
    this.isVisible = !this.isVisible;
    this.el.nativeElement.setAttribute(
      "type",
      this.isVisible ? "text" : "password"
    );
  }
}
