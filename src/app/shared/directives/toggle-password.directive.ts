import { Directive, ElementRef } from '@angular/core';

@Directive({
  selector: '[appTogglePassword]',
  exportAs: 'togglePassword'
})
export class TogglePasswordDirective {
  isVisible: boolean = false;

  constructor(private el: ElementRef<HTMLInputElement>) {}

  toggleVisibility(): void {
    this.isVisible = !this.isVisible;
    this.el.nativeElement.type = this.isVisible ? 'text' : 'password';
  }

  get isVisibleMethod(): boolean {
    return this.isVisible;
  }

}
