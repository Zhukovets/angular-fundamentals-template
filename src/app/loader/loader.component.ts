import { Component, Input } from '@angular/core';

@Component({
    selector: 'loader',
    templateUrl: './loader.component.html',
    styleUrls: ['./loader.component.scss'],
})
export class AppLoader {
    @Input() public isLoading: boolean = false;
}
