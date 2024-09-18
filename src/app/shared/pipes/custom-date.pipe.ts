import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
    name: 'customDate'
})
export class CustomDatePipe implements PipeTransform {
    transform(value: Date | string): string {
        if (!value) return '';

        const date = new Date(value);

        const day = date.getDate().toString().padStart(2, '0');
        //+1 as getMonth indexes from 0
        const month = (date.getMonth() + 1).toString().padStart(2, '0');
        const year = date.getFullYear();

        return `${day}.${month}.${year}`;
    }
}