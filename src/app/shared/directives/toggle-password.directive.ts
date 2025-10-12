import { Directive, ElementRef, Renderer2, OnInit } from '@angular/core';

@Directive({
  selector: '[appTogglePassword],[app-toggle-password]',
  exportAs: 'togglePassword'
})
export class TogglePasswordDirective implements OnInit {
  private _visible = false;

  constructor(private el: ElementRef<HTMLInputElement>, private renderer: Renderer2) {}

  ngOnInit(): void {
    const native = this.el.nativeElement;
    const current = native.getAttribute('type');
    if (current !== 'password' && current !== 'text') {
      this.renderer.setAttribute(native, 'type', 'password');
    } else {
      this.renderer.setAttribute(native, 'type', current || 'password');
    }
  }

  toggle(): void {
    this._visible = !this._visible;
    this.renderer.setAttribute(this.el.nativeElement, 'type', this._visible ? 'text' : 'password');
  }

  get visible(): boolean {
    return this._visible;
  }
}
