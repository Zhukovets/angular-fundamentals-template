import { Directive, ElementRef, AfterViewInit } from "@angular/core";
import { IconProp } from "@fortawesome/fontawesome-svg-core";

@Directive({
    selector: '[passwordToggle]',
    exportAs: 'passwordToggle'
})
export class PasswordToggleAttributeDirective implements AfterViewInit {

    iconName: IconProp = 'eye-slash';

    constructor(private el: ElementRef) {
    }

    ngAfterViewInit(): void {
        const parent = this.el.nativeElement.parentNode;
        const icon: HTMLElement = parent.querySelector('.overlay-icon');
        icon.addEventListener('click', this.toggleIcon.bind(this));
    }

    toggleIcon() {
        console.log('clicked');
        if (this.el.nativeElement.type == 'password') {
            this.el.nativeElement.type = 'text';
            this.iconName = 'eye';
        }
        else {
            this.el.nativeElement.type = 'password';
            this.iconName = 'eye-slash';
        }
    }
}
