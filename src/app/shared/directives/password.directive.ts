import {Directive, HostListener} from '@angular/core';

@Directive({
    selector: '[appTogglePassword]',
    exportAs: 'togglePassword',
    host: {
        '[attr.type]': 'inputType',
    }
})
export class TogglePasswordDirective {

    private isPasswordVisible: boolean = false;

    @HostListener('click', ['$event'])

    onClick(event: Event): void {
        const target = event.target as HTMLElement;
        if (target.tagName.toLowerCase() === 'input') return;
        this.toggleVisibility();
    }

    get inputType(): string {
        return this.isPasswordVisible ? 'text' : 'password';
    }

    toggleVisibility() {
        this.isPasswordVisible = !this.isPasswordVisible;
    }

    isVisible(): boolean {
        return this.isPasswordVisible;
    }
}
