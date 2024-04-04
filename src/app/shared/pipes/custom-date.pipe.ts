import { DatePipe } from '@angular/common';
import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
    name: 'customDate'
})
export class CustomDatePipe implements PipeTransform {
    // Add your code here
    transform(value: string, format: string = 'dd.MM.yyyy'): string | null {
        if (value) {
            return new DatePipe('en-US').transform(value, format);
        }
        return '';
    }
}
