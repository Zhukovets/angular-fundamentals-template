import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
    name: 'customDate'
})

export class CustomDatePipe  implements PipeTransform {
    transform(value: string): string {
        let day: string = '';
        let month: string = '';
        let year: number = 0;
        if (value) {
            const [ dayStr,monthStr, yearStr] = value.split('/');
            const date = new Date(+yearStr, +monthStr - 1, +dayStr);
            day = String(date.getDate()).padStart(2, '0');
            month = String(date.getMonth() + 1).padStart(2, '0');
            year = date.getFullYear();
        }
        return `${day}.${month}.${year}`;
    }
}