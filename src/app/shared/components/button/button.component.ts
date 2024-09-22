import {Component, Input, Output, EventEmitter} from '@angular/core';
import {FaIconLibrary} from '@fortawesome/angular-fontawesome';
import {fas} from '@fortawesome/free-solid-svg-icons';
import {IconName} from '@fortawesome/fontawesome-svg-core';


@Component({
    selector: 'app-button',
    templateUrl: './button.component.html',
    styleUrls: ['./button.component.scss']
})
export class ButtonComponent {
    @Input() buttonText = '';
    @Input() iconName: IconName | null = null;
    @Input() buttonType: 'submit' | 'button' = 'button';
    @Input() disabled: boolean = false;

    @Input() btnDefault:boolean = false;
    @Input() btnIconPlus: boolean = false;
    @Input() btnMod: boolean = false
    @Input() btnIcon: boolean = false;

    @Output() clickButton = new EventEmitter<any>();
    @Input() data!: string;

    currentClasses: Record<string, boolean> = {};

    constructor(library: FaIconLibrary) {
        library.addIconPacks(fas);
    }

    setCurrentClasses() {
        return this.currentClasses = {
            "app-button": this.btnDefault,
            "app-button__btn": this.btnMod,
            "app-button__icon": this.btnIcon,
            "app-button__icon-plus": this.btnIconPlus,
        };
    }

    buttonClick() {
        this.clickButton.emit(this.data);
    }

    // Use the names for the inputs `buttonText` and `iconName`.
}

