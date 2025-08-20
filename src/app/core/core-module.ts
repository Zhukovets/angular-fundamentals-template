import {NgModule} from '@angular/core';
import {HeaderContainerComponent} from "@app/core/header-container/header-container.component";
import {SharedModule} from "@shared/shared.module";
import {CommonModule} from "@angular/common";

@NgModule({
    declarations: [HeaderContainerComponent],
    imports: [SharedModule, CommonModule],
    exports: [HeaderContainerComponent]
})

export class CoreModule {}