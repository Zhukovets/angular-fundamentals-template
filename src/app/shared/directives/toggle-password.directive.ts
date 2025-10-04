import { Directive, ElementRef } from "@angular/core";

@Directive({
  selector: "[appTogglePassword]",
  exportAs: "togglePassword",
})
export class TogglePasswordDirective {
  private _visible = false;

  constructor(private el: ElementRef<HTMLInputElement>) {}

  get visible(): boolean {
    return this._visible;
  }

  toggle(): void {
    this._visible = !this._visible;
    this.el.nativeElement.type = this._visible ? "text" : "password";
  }
}
