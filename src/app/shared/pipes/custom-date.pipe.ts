import {Pipe} from '@angular/core';
import {formatDate} from "@angular/common";

@Pipe({
    name: 'customDate'
})
export class CustomDatePipe {
    // Add your code here
    transform(value: Date): string {
        return formatDate(value, 'dd.MM.yyyy','en-US');
    }
}
